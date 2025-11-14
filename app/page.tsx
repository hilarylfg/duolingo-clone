import { BookOpen, Trophy, Users, Zap } from 'lucide-react'
import Link from 'next/link'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Header
} from '@/shared/components'

export default function Home() {
	return (
		<div className='min-h-screen duo-hero'>
			<Header />

			<main className='mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-24 pt-16'>
				<section className='grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
					<div className='space-y-8'>
						<div className='inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-duo-ink/70 shadow'>
							<span className='text-duo-green'>★</span> Выбор №1
							для изучения языков
						</div>
						<div className='space-y-4'>
							<h1 className='text-5xl font-black text-duo-ink md:text-6xl'>
								Учись так, будто играешь.
							</h1>
							<p className='text-xl text-duo-ink/70'>
								Короткие уроки, яркие герои и реальные
								результаты. Занимайся каждый день и наблюдай,
								как растёт твой XP, стаж и уверенность.
							</p>
						</div>
						<div className='flex flex-wrap gap-4'>
							<Link href='/register'>
								<Button variant='duo' size='lg'>
									Начать бесплатно
								</Button>
							</Link>
							<Link href='/learn'>
								<Button variant='outline' size='lg'>
									Смотреть курсы
								</Button>
							</Link>
						</div>
						<div className='flex flex-wrap gap-6 text-sm text-duо-ink/60'>
							<div>
								95% пользователей отмечают прогресс за 2 недели
							</div>
							<div>+35 языков и сотни уроков</div>
						</div>
					</div>

					<Card className='relative overflow-hidden bg-gradient-to-br from-white to-duo-cloud'>
						<CardContent className='space-y-6 py-10'>
							<div className='flex items-center justify-between'>
								<p className='text-sm font-semibold uppercase tracking-[0.3em] text-duo-ink/50'>
									Твой прогресс
								</p>
								<span className='text-sm text-duo-green'>
									+140 XP
								</span>
							</div>
							<div className='space-y-2'>
								<p className='text-3xl font-black text-duo-ink'>
									Стрик 12 дней 🔥
								</p>
								<p className='text-duo-ink/60'>
									Не останавливайся — до сундука осталось 3
									урока!
								</p>
							</div>
							<div className='grid gap-4 rounded-3xl bg-white/80 p-6 shadow-inner'>
								<div className='flex justify-between text-sm font-semibold text-duo-ink/70'>
									<span>Сегодня</span>
									<span>35 XP</span>
								</div>
								<div className='h-3 rounded-full bg-duo-ink/10'>
									<div className='h-full w-2/3 rounded-full bg-gradient-to-r from-duo-green to-duo-blue'></div>
								</div>
								<div className='flex justify-between text-sm font-semibold text-duo-ink/70'>
									<span>Цель</span>
									<span>50 XP</span>
								</div>
							</div>
							<div className='flex items-center justify-between rounded-2xl bg-white/90 p-4 text-sm font-semibold'>
								<span>Следующий урок: Путешествия ✈️</span>
								<Button size='sm' variant='duo'>
									Продолжить
								</Button>
							</div>
						</CardContent>
					</Card>
				</section>

				<section className='grid gap-6 rounded-[40px] bg-white/80 p-8 shadow-[0_40px_80px_rgba(20,84,50,0.08)]'>
					<div className='flex flex-wrap items-center justify-between gap-4'>
						<div>
							<p className='text-sm font-semibold uppercase tracking-[0.4em] text-duo-ink/50'>
								Нам доверяют
							</p>
							<p className='text-3xl font-black'>
								140+ млн учеников
							</p>
						</div>
						<div className='flex flex-wrap gap-4 text-sm font-semibold text-duo-ink/60'>
							<span className='duo-pill bg-duo-cloud'>
								Лучшее приложение 2024
							</span>
							<span className='duo-pill bg-duo-cloud'>
								Apple & Google Editors
							</span>
							<span className='duo-pill bg-duo-cloud'>
								5.0 ⭐️ отзывов
							</span>
						</div>
					</div>
				</section>

				<section>
					<div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
						<div>
							<p className='text-sm font-semibold uppercase tracking-[0.4em] text-duo-ink/50'>
								Почему Duolingo Clone
							</p>
							<h2 className='text-4xl font-black'>
								Геймификация, мотивация, результат
							</h2>
						</div>
						<Link href='/learn'>
							<Button variant='outline'>Перейти к курсам</Button>
						</Link>
					</div>
					<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
						{[
							{
								title: 'Уроки по 5 минут',
								desc: 'Проходи где угодно: в метро, очереди или перед сном.',
								icon: (
									<BookOpen className='h-8 w-8 text-duo-blue' />
								)
							},
							{
								title: 'Игровые механики',
								desc: 'XP, сундуки, стрики и уровни держат мотивацию на максимум.',
								icon: <Zap className='h-8 w-8 text-duo-green' />
							},
							{
								title: 'Настоящая мотивация',
								desc: 'Ленты достижений, напоминания и поддержка друзей.',
								icon: (
									<Trophy className='h-8 w-8 text-duo-yellow' />
								)
							},
							{
								title: 'Сообщество',
								desc: 'Соревнуйся с друзьями и знакомься с новыми.',
								icon: (
									<Users className='h-8 w-8 text-duo-orange' />
								)
							}
						].map((feature, index) => (
							<Card
								key={index}
								className='border-none bg-white/90'
							>
								<CardHeader className='space-y-4'>
									<div className='inline-flex rounded-2xl bg-duo-cloud p-4'>
										{feature.icon}
									</div>
									<CardTitle>{feature.title}</CardTitle>
									<CardDescription>
										{feature.desc}
									</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>
				</section>

				<section className='rounded-[40px] bg-duo-green text-white shadow-[0_35px_80px_rgba(88,204,2,0.5)]'>
					<Card className='bg-transparent shadow-none'>
						<CardContent className='space-y-8 py-12 text-center'>
							<p className='text-sm font-semibold uppercase tracking-[0.4em] text-white/80'>
								Настало время
							</p>
							<h2 className='text-5xl font-black'>
								Начни говорить на новом языке сегодня
							</h2>
							<p className='text-lg text-white/85'>
								Регистрация займёт меньше минуты. Первые уроки
								бесплатны, а мотивация вырастет мгновенно.
							</p>
							<div className='flex flex-wrap justify-center gap-4'>
								<Link href='/register'>
									<Button
										size='lg'
										variant='secondary'
										className='bg-white text-duo-green'
									>
										Создать аккаунт
									</Button>
								</Link>
								<Link href='/login'>
									<Button
										size='lg'
										variant='ghost'
										className='text-white'
									>
										Уже с нами
									</Button>
								</Link>
							</div>
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
