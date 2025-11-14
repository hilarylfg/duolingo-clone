'use client'

import { ChevronDown, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/shared/components'
import { selectIsAuthenticated, selectUser, useAuthStore } from '@/shared/store'

export function Header() {
	const router = useRouter()
	const user = useAuthStore(selectUser)
	const isAuthenticated = useAuthStore(selectIsAuthenticated)
	const fetchUser = useAuthStore(state => state.fetchUser)
	const logout = useAuthStore(state => state.logout)
	const [showMenu, setShowMenu] = useState(false)

	useEffect(() => {
		fetchUser()
	}, [fetchUser])

	const handleLogout = async () => {
		await logout()
		router.push('/')
	}

	return (
		<header className='sticky top-0 z-40 bg-white/80 backdrop-blur-xl'>
			<div className='mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6'>
				<Link href='/' className='flex items-center gap-3'>
					<div className='rounded-[24px] bg-duo-green px-4 py-2 text-2xl font-black text-white'>
						Duo
					</div>
					<div>
						<p className='text-sm font-bold uppercase tracking-[0.3em] text-duo-ink/60'>
							Language Lab
						</p>
						<p className='text-2xl font-black text-duo-ink'>
							Duolingo Clone
						</p>
					</div>
				</Link>

				<nav className='flex items-center gap-3 text-sm font-semibold text-duo-ink/70'>
					{isAuthenticated && user ? (
						<>
							<Link
								href='/learn'
								className='duo-pill hidden md:inline-flex'
							>
								Курсы
							</Link>
							<div className='relative'>
								<button
									onClick={() => setShowMenu(!showMenu)}
									className='duo-pill flex items-center gap-2'
								>
									<User className='h-4 w-4' />
									<span>{user.displayName}</span>
									<ChevronDown className='h-4 w-4' />
								</button>
								{showMenu && (
									<div className='absolute right-0 top-full mt-2 w-56 rounded-2xl border-none bg-white shadow-[0_20px_50px_rgba(20,84,50,0.15)]'>
										<div className='p-2'>
											<Link
												href='/profile/settings'
												className='flex items-center gap-3 rounded-xl px-4 py-3 text-duo-ink/70 transition hover:bg-duo-cloud'
												onClick={() =>
													setShowMenu(false)
												}
											>
												<Settings className='h-4 w-4' />
												<span>Настройки</span>
											</Link>
											<button
												onClick={() => {
													setShowMenu(false)
													handleLogout()
												}}
												className='flex w-full items-center gap-3 rounded-xl px-4 py-3 text-duo-error transition hover:bg-duo-error/10'
											>
												<LogOut className='h-4 w-4' />
												<span>Выйти</span>
											</button>
										</div>
									</div>
								)}
							</div>
						</>
					) : (
						<>
							<Link
								href='/learn'
								className='duo-pill hidden md:inline-flex'
							>
								Курсы
							</Link>
							<Link href='/login'>
								<Button variant='ghost' size='sm'>
									Войти
								</Button>
							</Link>
							<Link href='/register'>
								<Button variant='duo' size='sm'>
									Начать
								</Button>
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	)
}
