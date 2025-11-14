'use client'

import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/shared/components'
import { verificationService } from '@/shared/services'
import { useAuthStore } from '@/shared/store'

export default function NewVerificationPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const fetchUser = useAuthStore(state => state.fetchUser)
	const token = searchParams.get('token')

	const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
		'loading'
	)
	const [message, setMessage] = useState('Подтверждаем ваш email...')

	useEffect(() => {
		const verify = async () => {
			if (!token) {
				setStatus('error')
				setMessage('Токен подтверждения не найден')
				return
			}

			try {
				await verificationService.newVerification(token)
				setStatus('success')
				setMessage('Email успешно подтвержден! 🎉')

				// Автоматически загружаем профиль пользователя (автологин)
				await fetchUser()

				// Перенаправляем на страницу обучения через 2 секунды
				setTimeout(() => {
					router.push('/learn')
				}, 2000)
			} catch (error: any) {
				setStatus('error')
				setMessage(
					error?.message ||
						'Ошибка подтверждения email. Токен может быть недействительным или устаревшим.'
				)
			}
		}

		verify()
	}, [token, fetchUser, router])

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
						<p className='text-2xl font-black text-duo-ink'>
							Подтверждение
						</p>
					</div>
				</Link>

				<div className='glass-card duo-shadow p-12'>
					<div className='flex flex-col items-center space-y-6 text-center'>
						{status === 'loading' && (
							<>
								<div className='relative'>
									<div className='h-20 w-20 animate-spin rounded-full border-4 border-duo-green border-t-transparent'></div>
									<Loader2 className='absolute inset-0 m-auto h-10 w-10 animate-pulse text-duo-green' />
								</div>
								<div className='space-y-2'>
									<h1 className='text-2xl font-black text-duo-ink'>
										{message}
									</h1>
									<p className='text-sm text-duo-ink/60'>
										Пожалуйста, подождите
									</p>
								</div>
							</>
						)}

						{status === 'success' && (
							<>
								<div className='relative'>
									<div className='absolute inset-0 animate-ping rounded-full bg-duo-green/20'></div>
									<CheckCircle2 className='relative h-20 w-20 text-duo-green' />
								</div>
								<div className='space-y-3'>
									<h1 className='text-2xl font-black text-duo-ink'>
										{message}
									</h1>
									<p className='text-sm text-duo-ink/60'>
										Вы будете перенаправлены на страницу
										обучения...
									</p>
									<div className='flex items-center justify-center gap-2 pt-2'>
										<div className='h-2 w-2 animate-bounce rounded-full bg-duo-green [animation-delay:-0.3s]'></div>
										<div className='h-2 w-2 animate-bounce rounded-full bg-duo-green [animation-delay:-0.15s]'></div>
										<div className='h-2 w-2 animate-bounce rounded-full bg-duo-green'></div>
									</div>
								</div>
							</>
						)}

						{status === 'error' && (
							<>
								<div className='relative'>
									<div className='absolute inset-0 animate-pulse rounded-full bg-duo-error/10'></div>
									<XCircle className='relative h-20 w-20 text-duo-error' />
								</div>
								<div className='space-y-3'>
									<h1 className='text-2xl font-black text-duo-ink'>
										Ошибка подтверждения
									</h1>
									<p className='text-sm text-duo-ink/60'>
										{message}
									</p>
								</div>
								<div className='flex w-full flex-col gap-3 pt-4'>
									<Link href='/login' className='w-full'>
										<Button
											variant='duo'
											size='lg'
											className='w-full'
										>
											Перейти к входу
										</Button>
									</Link>
									<Link href='/' className='w-full'>
										<Button
											variant='outline'
											size='lg'
											className='w-full'
										>
											На главную
										</Button>
									</Link>
								</div>
							</>
						)}
					</div>
				</div>

				<p className='text-center text-sm text-duo-ink/60'>
					Нужна помощь?{' '}
					<Link
						href='/'
						className='font-bold text-duo-green hover:underline'
					>
						Свяжитесь с нами
					</Link>
				</p>
			</div>
		</div>
	)
}
