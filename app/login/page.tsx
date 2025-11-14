'use client'

import { ArrowLeft, Loader2, Shield } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { useAuthStore } from '@/shared/store/use-auth-store'

export default function LoginPage() {
	const router = useRouter()
	const { login, isLoading } = useAuthStore()

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		code: ''
	})
	const [showTwoFactor, setShowTwoFactor] = useState(false)
	const [error, setError] = useState('')
	const [resendCooldown, setResendCooldown] = useState(0)
	const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', ''])
	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	useEffect(() => {
		// Объединяем цифры в код
		setFormData(prev => ({ ...prev, code: codeDigits.join('') }))
	}, [codeDigits])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		try {
			await login(
				formData.email,
				formData.password,
				formData.code || undefined
			)
			router.push('/learn')
		} catch (err: unknown) {
			const error = err as {
				message?: string
				response?: { data?: { message?: string } }
			}
			const errorMessage =
				error.message || error.response?.data?.message || ''

			console.log('Login error:', errorMessage)

			if (
				errorMessage.includes('2FA') ||
				errorMessage.includes('двухфакторной') ||
				errorMessage.includes('Требуется код') ||
				errorMessage.includes('Проверьте вашу почту')
			) {
				setShowTwoFactor(true)
				setError(errorMessage)
				startResendCooldown()
			} else {
				setError(errorMessage || 'Ошибка входа')
			}
		}
	}

	const handleResendCode = async () => {
		if (resendCooldown > 0) return

		try {
			// Повторно отправляем запрос на логин без кода для получения нового кода
			await login(formData.email, formData.password, undefined)
			startResendCooldown()
		} catch (err: unknown) {
			// Игнорируем ошибку, так как она ожидаема
		}
	}

	const startResendCooldown = () => {
		setResendCooldown(60)
		const interval = setInterval(() => {
			setResendCooldown(prev => {
				if (prev <= 1) {
					clearInterval(interval)
					return 0
				}
				return prev - 1
			})
		}, 1000)
	}

	const handleCodeDigitChange = (index: number, value: string) => {
		// Разрешаем только цифры
		const digit = value.replace(/\D/g, '').slice(-1)

		const newDigits = [...codeDigits]
		newDigits[index] = digit
		setCodeDigits(newDigits)

		// Автоматический переход на следующее поле
		if (digit && index < 5) {
			inputRefs.current[index + 1]?.focus()
		}
	}

	const handleCodeDigitKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		// Backspace - переход на предыдущее поле
		if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
			inputRefs.current[index - 1]?.focus()
		}
		// ArrowLeft
		if (e.key === 'ArrowLeft' && index > 0) {
			inputRefs.current[index - 1]?.focus()
		}
		// ArrowRight
		if (e.key === 'ArrowRight' && index < 5) {
			inputRefs.current[index + 1]?.focus()
		}
	}

	const handleCodeDigitPaste = (e: React.ClipboardEvent) => {
		e.preventDefault()
		const pastedData = e.clipboardData.getData('text').replace(/\D/g, '')
		const digits = pastedData.slice(0, 6).split('')
		const newDigits = [...codeDigits]

		digits.forEach((digit, i) => {
			if (i < 6) newDigits[i] = digit
		})

		setCodeDigits(newDigits)

		// Фокус на последнее заполненное поле
		const lastFilledIndex = Math.min(digits.length - 1, 5)
		inputRefs.current[lastFilledIndex]?.focus()
	}

	const handleBackToLogin = () => {
		setShowTwoFactor(false)
		setCodeDigits(['', '', '', '', '', ''])
		setError('')
		setResendCooldown(0)
	}

	return (
		<div className='flex min-h-screen items-center justify-center duo-hero p-4'>
			<div className='w-full max-w-md space-y-6'>
				<Link
					href='/'
					className='flex items-center justify-center gap-3'
				>
					<div className='rounded-[24px] bg-duo-green px-4 py-2 text-2xl font-black text-white'>
						Duo
					</div>
					<div>
						<p className='text-sm font-bold uppercase tracking-[0.3em] text-duo-ink/60'>
							Language Lab
						</p>
						<p className='text-2xl font-black text-duo-ink'>Вход</p>
					</div>
				</Link>

				<Card className='border-none bg-white/90 shadow-[0_35px_80px_rgba(20,84,50,0.12)]'>
					<CardHeader className='space-y-2'>
						{!showTwoFactor ? (
							<>
								<CardTitle className='text-center text-3xl font-black'>
									С возвращением!
								</CardTitle>
								<CardDescription className='text-center text-base'>
									Войдите, чтобы продолжить обучение
								</CardDescription>
							</>
						) : (
							<>
								<div className='flex items-center justify-center'>
									<div className='rounded-full bg-duo-blue/10 p-4'>
										<Shield className='h-8 w-8 text-duo-blue' />
									</div>
								</div>
								<CardTitle className='text-center text-3xl font-black'>
									Двухфакторная аутентификация
								</CardTitle>
								<CardDescription className='text-center text-base'>
									Введите код из письма для завершения входа
								</CardDescription>
							</>
						)}
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className='space-y-5'>
							{!showTwoFactor ? (
								<>
									<div className='space-y-2'>
										<label className='text-sm font-semibold text-duo-ink/70'>
											Email
										</label>
										<Input
											type='email'
											placeholder='your@email.com'
											value={formData.email}
											onChange={e =>
												setFormData({
													...formData,
													email: e.target.value
												})
											}
											required
											disabled={isLoading}
										/>
									</div>

									<div className='space-y-2'>
										<label className='text-sm font-semibold text-duo-ink/70'>
											Пароль
										</label>
										<Input
											type='password'
											placeholder='••••••••'
											value={formData.password}
											onChange={e =>
												setFormData({
													...formData,
													password: e.target.value
												})
											}
											required
											disabled={isLoading}
										/>
									</div>
								</>
							) : (
								<div className='space-y-6 animate-in fade-in slide-in-from-top-2 duration-300'>
									<button
										type='button'
										onClick={handleBackToLogin}
										className='flex items-center gap-2 text-sm font-semibold text-duo-ink/60 hover:text-duo-ink transition-colors'
										disabled={isLoading}
									>
										<ArrowLeft className='h-4 w-4' />
										Назад к входу
									</button>

									<div className='rounded-2xl bg-duo-blue/10 border-2 border-duo-blue/20 p-4'>
										<div className='flex items-start gap-3'>
											<span className='text-2xl'>📧</span>
											<div className='flex-1'>
												<p className='text-sm font-bold text-duo-blue mb-1'>
													Код отправлен на вашу почту
												</p>
												<p className='text-xs text-duo-ink/60'>
													Проверьте почту{' '}
													{formData.email}
												</p>
											</div>
										</div>
									</div>

									<div className='space-y-3'>
										<label className='block text-center text-sm font-semibold text-duo-ink/70'>
											Введите 6-значный код
										</label>
										<div className='flex justify-center gap-2'>
											{codeDigits.map((digit, index) => (
												<input
													key={index}
													ref={el => {
														inputRefs.current[
															index
														] = el
													}}
													type='text'
													inputMode='numeric'
													maxLength={1}
													value={digit}
													onChange={e =>
														handleCodeDigitChange(
															index,
															e.target.value
														)
													}
													onKeyDown={e =>
														handleCodeDigitKeyDown(
															index,
															e
														)
													}
													onPaste={
														handleCodeDigitPaste
													}
													disabled={isLoading}
													className='h-14 w-12 rounded-lg border-2 border-duo-ink/20 bg-white text-center text-2xl font-bold text-duo-ink transition-all focus:border-duo-blue focus:outline-none focus:ring-2 focus:ring-duo-blue/20 disabled:opacity-50'
													autoFocus={index === 0}
												/>
											))}
										</div>
										<div className='flex items-center justify-center gap-2'>
											<button
												type='button'
												onClick={handleResendCode}
												disabled={
													resendCooldown > 0 ||
													isLoading
												}
												className='text-xs font-semibold text-duo-blue hover:underline disabled:cursor-not-allowed disabled:text-duo-ink/40 transition-colors'
											>
												{resendCooldown > 0
													? `Отправить снова (${resendCooldown}с)`
													: 'Отправить код повторно'}
											</button>
										</div>
									</div>
								</div>
							)}

							{error && (
								<div className='rounded-2xl bg-duo-error/10 border-2 border-duo-error/20 px-4 py-3 text-sm font-semibold text-duo-error'>
									{error}
								</div>
							)}

							<Button
								type='submit'
								variant='duo'
								className='w-full'
								size='lg'
								disabled={
									isLoading ||
									(showTwoFactor && codeDigits.some(d => !d))
								}
							>
								{isLoading ? (
									<>
										<Loader2 className='mr-2 h-5 w-5 animate-spin' />
										{showTwoFactor
											? 'Проверяем код...'
											: 'Входим...'}
									</>
								) : showTwoFactor ? (
									<>
										<Shield className='mr-2 h-5 w-5' />
										Подтвердить код
									</>
								) : (
									'Войти'
								)}
							</Button>

							<div className='text-center text-sm text-duo-ink/60'>
								<span>
									Забыли пароль? Обратитесь к администратору.
								</span>
							</div>
						</form>

						<div className='mt-6 text-center text-sm text-duo-ink/60'>
							Нет аккаунта?{' '}
							<Link
								href='/register'
								className='font-bold text-duo-green hover:underline'
							>
								Зарегистрироваться
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
