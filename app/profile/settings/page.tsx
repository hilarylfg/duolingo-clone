'use client'

import { ArrowLeft, Loader2, Lock, Save } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Header,
	Input
} from '@/shared/components'
import {
	selectIsAuthenticated,
	selectIsLoading,
	selectUser,
	useAuthStore
} from '@/shared/store'

export default function ProfileSettingsPage() {
	const router = useRouter()
	const user = useAuthStore(selectUser)
	const isAuthenticated = useAuthStore(selectIsAuthenticated)
	const isLoading = useAuthStore(selectIsLoading)
	const updateProfile = useAuthStore(state => state.updateProfile)

	const [profileForm, setProfileForm] = useState({
		name: '',
		email: '',
		isTwoFactorEnabled: false
	})

	const [passwordForm, setPasswordForm] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	})

	const [isUpdating, setIsUpdating] = useState(false)
	const [profileError, setProfileError] = useState('')
	const [profileSuccess, setProfileSuccess] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [passwordSuccess, setPasswordSuccess] = useState('')

	useEffect(() => {
		if (user) {
			setProfileForm({
				name: user.displayName,
				email: user.email,
				isTwoFactorEnabled: user.isTwoFactorEnabled
			})
		}
	}, [user])

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push('/login')
		}
	}, [isAuthenticated, isLoading, router])

	const handleProfileSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setProfileError('')
		setProfileSuccess('')
		setIsUpdating(true)

		try {
			await updateProfile(profileForm)
			setProfileSuccess('Профиль успешно обновлён! ✨')
			setTimeout(() => setProfileSuccess(''), 3000)
		} catch (err: unknown) {
			const error = err as { message?: string }
			setProfileError(error.message || 'Ошибка обновления профиля')
		} finally {
			setIsUpdating(false)
		}
	}

	const handlePasswordSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setPasswordError('')
		setPasswordSuccess('')

		if (passwordForm.newPassword !== passwordForm.confirmPassword) {
			setPasswordError('Пароли не совпадают')
			return
		}

		if (passwordForm.newPassword.length < 6) {
			setPasswordError('Новый пароль должен быть минимум 6 символов')
			return
		}

		setIsUpdating(true)

		try {
			// В mock-режиме просто показываем успех
			await new Promise(resolve => setTimeout(resolve, 500))
			setPasswordSuccess('Пароль успешно изменён! 🔐')
			setPasswordForm({
				currentPassword: '',
				newPassword: '',
				confirmPassword: ''
			})
			setTimeout(() => setPasswordSuccess(''), 3000)
		} catch (err: unknown) {
			const error = err as { message?: string }
			setPasswordError(error.message || 'Ошибка смены пароля')
		} finally {
			setIsUpdating(false)
		}
	}

	if (isLoading || !user) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center duo-hero text-duo-ink/70'>
				<div className='h-14 w-14 animate-spin rounded-full border-4 border-duo-green border-t-transparent'></div>
				<p className='mt-6 text-lg font-semibold'>
					Загружаем настройки...
				</p>
			</div>
		)
	}

	return (
		<div className='min-h-screen duo-hero'>
			<Header />

			<div className='border-b border-white/40 bg-white/60'>
				<div className='mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-6'>
					<Link href='/learn'>
						<Button variant='ghost' size='sm'>
							<ArrowLeft className='mr-2 h-4 w-4' /> Назад
						</Button>
					</Link>
					<p className='text-sm font-semibold uppercase tracking-[0.3em] text-duo-ink/60'>
						Настройки профиля
					</p>
					<div className='w-24'></div>
				</div>
			</div>

			<main className='mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 pb-24 pt-16'>
				<section>
					<div className='mb-6'>
						<h1 className='text-4xl font-black text-duo-ink'>
							Настройки профиля
						</h1>
						<p className='mt-2 text-lg text-duo-ink/70'>
							Управляйте своим профилем и безопасностью аккаунта
						</p>
					</div>

					<Card className='border-none bg-white/90 shadow-[0_35px_80px_rgba(20,84,50,0.08)]'>
						<CardHeader>
							<CardTitle className='text-2xl'>
								Основная информация
							</CardTitle>
							<CardDescription>
								Обновите своё имя, email и настройки
								безопасности
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={handleProfileSubmit}
								className='space-y-5'
							>
								<div className='space-y-2'>
									<label className='text-sm font-semibold text-duo-ink/70'>
										Имя пользователя
									</label>
									<Input
										type='text'
										placeholder='Ваше имя'
										value={profileForm.name}
										onChange={e =>
											setProfileForm({
												...profileForm,
												name: e.target.value
											})
										}
										required
										disabled={isUpdating}
									/>
								</div>

								<div className='space-y-2'>
									<label className='text-sm font-semibold text-duo-ink/70'>
										Email
									</label>
									<Input
										type='email'
										placeholder='your@email.com'
										value={profileForm.email}
										onChange={e =>
											setProfileForm({
												...profileForm,
												email: e.target.value
											})
										}
										required
										disabled={isUpdating}
									/>
								</div>

								<div className='flex items-center gap-3 rounded-2xl bg-duo-cloud p-4'>
									<input
										type='checkbox'
										id='twoFactor'
										checked={profileForm.isTwoFactorEnabled}
										onChange={e =>
											setProfileForm({
												...profileForm,
												isTwoFactorEnabled:
													e.target.checked
											})
										}
										disabled={isUpdating}
										className='h-5 w-5 rounded border-duo-ink/20 text-duo-green focus:ring-2 focus:ring-duo-green'
									/>
									<label
										htmlFor='twoFactor'
										className='text-sm font-semibold text-duo-ink/70'
									>
										Включить двухфакторную аутентификацию
										(2FA)
									</label>
								</div>

								{profileError && (
									<div className='rounded-2xl border-2 border-duo-error/20 bg-duo-error/10 px-4 py-3 text-sm font-semibold text-duo-error'>
										{profileError}
									</div>
								)}

								{profileSuccess && (
									<div className='rounded-2xl border-2 border-duo-green/20 bg-duo-green/10 px-4 py-3 text-sm font-semibold text-duo-green'>
										{profileSuccess}
									</div>
								)}

								<Button
									type='submit'
									variant='duo'
									size='lg'
									className='w-full'
									disabled={isUpdating}
								>
									{isUpdating ? (
										<>
											<Loader2 className='mr-2 h-5 w-5 animate-spin' />
											Сохраняем...
										</>
									) : (
										<>
											<Save className='mr-2 h-5 w-5' />
											Сохранить изменения
										</>
									)}
								</Button>
							</form>
						</CardContent>
					</Card>
				</section>

				<section>
					<Card className='border-none bg-white/90 shadow-[0_35px_80px_rgba(20,84,50,0.08)]'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2 text-2xl'>
								<Lock className='h-6 w-6 text-duo-blue' />
								Смена пароля
							</CardTitle>
							<CardDescription>
								Обновите свой пароль для повышения безопасности
								аккаунта
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={handlePasswordSubmit}
								className='space-y-5'
							>
								<div className='space-y-2'>
									<label className='text-sm font-semibold text-duo-ink/70'>
										Текущий пароль
									</label>
									<Input
										type='password'
										placeholder='••••••••'
										value={passwordForm.currentPassword}
										onChange={e =>
											setPasswordForm({
												...passwordForm,
												currentPassword: e.target.value
											})
										}
										required
										disabled={isUpdating}
									/>
								</div>

								<div className='space-y-2'>
									<label className='text-sm font-semibold text-duo-ink/70'>
										Новый пароль
									</label>
									<Input
										type='password'
										placeholder='••••••••'
										value={passwordForm.newPassword}
										onChange={e =>
											setPasswordForm({
												...passwordForm,
												newPassword: e.target.value
											})
										}
										required
										disabled={isUpdating}
									/>
								</div>

								<div className='space-y-2'>
									<label className='text-sm font-semibold text-duo-ink/70'>
										Подтвердите новый пароль
									</label>
									<Input
										type='password'
										placeholder='••••••••'
										value={passwordForm.confirmPassword}
										onChange={e =>
											setPasswordForm({
												...passwordForm,
												confirmPassword: e.target.value
											})
										}
										required
										disabled={isUpdating}
									/>
								</div>

								{passwordError && (
									<div className='rounded-2xl border-2 border-duo-error/20 bg-duo-error/10 px-4 py-3 text-sm font-semibold text-duo-error'>
										{passwordError}
									</div>
								)}

								{passwordSuccess && (
									<div className='rounded-2xl border-2 border-duo-green/20 bg-duo-green/10 px-4 py-3 text-sm font-semibold text-duo-green'>
										{passwordSuccess}
									</div>
								)}

								<Button
									type='submit'
									variant='outline'
									size='lg'
									className='w-full'
									disabled={isUpdating}
								>
									{isUpdating ? (
										<>
											<Loader2 className='mr-2 h-5 w-5 animate-spin' />
											Обновляем...
										</>
									) : (
										<>
											<Lock className='mr-2 h-5 w-5' />
											Изменить пароль
										</>
									)}
								</Button>
							</form>
						</CardContent>
					</Card>
				</section>
			</main>

			<footer className='border-t border-white/40 bg-white/80 py-10 text-center text-sm text-duo-ink/60'>
				<p>
					© {new Date().getFullYear()} Duolingo Clone. Учебный
					проект.
				</p>
			</footer>
		</div>
	)
}
