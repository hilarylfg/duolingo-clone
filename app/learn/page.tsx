'use client'

import { Award, Flame, Globe, Trophy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Header
} from '@/shared/components'
import { useLearningStore } from '@/shared/store'

export default function LearnPage() {
	const router = useRouter()
	const {
		languages,
		courses,
		currentCourse,
		userProgress,
		fetchLanguages,
		fetchCourses,
		selectCourse,
		isLoading
	} = useLearningStore()

	useEffect(() => {
		fetchLanguages()
		fetchCourses()
	}, [fetchLanguages, fetchCourses])

	const handleCourseSelect = async (courseId: string) => {
		await selectCourse(courseId)
	}

	return (
		<div className='min-h-screen duo-hero'>
			<Header />

			<main className='mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-24 pt-16'>
				{currentCourse && userProgress ? (
					<section className='grid gap-10 lg:grid-cols-[1.4fr_0.6fr]'>
						<Card className='relative overflow-hidden bg-gradient-to-br from-white to-duo-cloud shadow-[0_40px_80px_rgba(20,84,50,0.08)]'>
							<CardContent className='space-y-6 py-10'>
								<div className='flex flex-wrap items-center justify-between gap-4'>
									<div className='space-y-2'>
										<p className='text-sm font-semibold uppercase tracking-[0.4em] text-duo-ink/50'>
											Текущий курс
										</p>
										<h1 className='text-4xl font-black text-duo-ink md:text-5xl'>
											{currentCourse.title}
										</h1>
										<p className='text-lg text-duo-ink/70'>
											{currentCourse.description}
										</p>
									</div>
									<Button
										size='lg'
										variant='duo'
										onClick={() =>
											router.push(
												`/learn/courses/${currentCourse.id}`
											)
										}
									>
										К урокам
									</Button>
								</div>

								<div className='grid gap-6 md:grid-cols-3'>
									<div className='rounded-3xl bg-white/90 p-6 shadow-inner'>
										<div className='flex items-center gap-2 text-sm font-semibold text-duo-ink/60'>
											<Trophy className='h-5 w-5 text-duo-yellow' />{' '}
											XP
										</div>
										<p className='mt-2 text-3xl font-black text-duo-ink'>
											{userProgress.xp}
										</p>
										<p className='mt-1 text-sm text-duo-ink/50'>
											+30 XP за последнюю сессию
										</p>
									</div>
									<div className='rounded-3xl bg-white/90 p-6 shadow-inner'>
										<div className='flex items-center gap-2 text-sm font-semibold text-duo-ink/60'>
											<Flame className='h-5 w-5 text-duo-orange' />{' '}
											Серия
										</div>
										<p className='mt-2 text-3xl font-black text-duo-ink'>
											{userProgress.streak} дней
										</p>
										<p className='mt-1 text-sm text-duo-ink/50'>
											Следующий сундук через 3 дня
										</p>
									</div>
									<div className='rounded-3xl bg-white/90 p-6 shadow-inner'>
										<div className='flex items-center gap-2 text-sm font-semibold text-duo-ink/60'>
											<Award className='h-5 w-5 text-duo-green' />{' '}
											Последний урок
										</div>
										<p className='mt-2 text-lg font-bold text-duo-ink'>
											{new Date(
												userProgress.lastStudyDate
											).toLocaleDateString('ru-RU')}
										</p>
										<p className='mt-1 text-sm text-duo-ink/50'>
											Поддерживай ритм!
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className='border-none bg-white/90 shadow-[0_35px_80px_rgba(20,84,50,0.08)]'>
							<CardContent className='space-y-6 py-10'>
								<h2 className='text-2xl font-black text-duo-ink'>
									Твой трек
								</h2>
								<div className='space-y-4'>
									<div className='rounded-3xl bg-duo-green/10 p-5'>
										<p className='text-sm font-semibold text-duo-ink/60'>
											Цель XP
										</p>
										<p className='mt-1 text-3xl font-black text-duo-ink'>
											50 XP
										</p>
										<p className='mt-1 text-sm text-duo-ink/50'>
											Сегодня набрано: 35 XP
										</p>
									</div>
									<div className='rounded-3xl bg-duo-blue/10 p-5'>
										<p className='text-sm font-semibold text-duo-ink/60'>
											Следующий урок
										</p>
										<p className='mt-1 text-lg font-bold text-duo-ink'>
											Грамматика путешествий
										</p>
										<Button
											className='mt-4 w-full'
											variant='duo'
											onClick={() =>
												router.push(
													`/learn/courses/${currentCourse.id}`
												)
											}
										>
											Продолжить
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>
				) : (
					<Card className='glass-card'>
						<CardContent className='space-y-4 py-14 text-center'>
							<p className='text-xl font-semibold text-duo-ink'>
								Выберите курс и начните приключение ✨
							</p>
							<p className='text-duo-ink/60'>
								У нас есть курсы для всех уровней. Найдите свой
								язык и откройте новые горизонты.
							</p>
						</CardContent>
					</Card>
				)}

				<section>
					<div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
						<div>
							<p className='text-sm font-semibold uppercase tracking-[0.4em] text-duo-ink/50'>
								Выберите язык
							</p>
							<h2 className='text-4xl font-black text-duo-ink'>
								Каталог курсов
							</h2>
						</div>
						<span className='duo-pill text-sm font-semibold text-duo-ink/70'>
							{languages.length} языков • {courses.length} курсов
						</span>
					</div>

					{isLoading ? (
						<div className='flex flex-col items-center gap-4 rounded-[40px] bg-white/80 p-14 text-duo-ink/70 shadow-[0_40px_80px_rgba(20,84,50,0.08)]'>
							<div className='h-14 w-14 animate-spin rounded-full border-4 border-duo-green border-t-transparent'></div>
							<p className='text-lg font-semibold'>
								Загружаем лучшие курсы из Академии Дю!
							</p>
						</div>
					) : courses.length === 0 ? (
						<Card className='glass-card'>
							<CardContent className='py-14 text-center'>
								<p className='text-xl font-semibold text-duo-ink/70'>
									Курсы пока не добавлены. Обратитесь к
									администратору, чтобы стартовать обучение.
								</p>
							</CardContent>
						</Card>
					) : (
						<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
							{courses.map(course => (
								<Card
									key={course.id}
									className='group cursor-pointer border-none bg-white/90 shadow-[0_35px_80px_rgba(20,84,50,0.08)] transition hover:-translate-y-1'
									onClick={() =>
										handleCourseSelect(course.id)
									}
								>
									<CardHeader className='space-y-4'>
										<div className='flex items-center gap-3'>
											<div className='inline-flex rounded-2xl bg-duo-cloud p-4'>
												<Globe className='h-8 w-8 text-duo-blue' />
											</div>
											<div>
												<CardTitle className='text-xl'>
													{course.title}
												</CardTitle>
												<CardDescription>
													{course.description}
												</CardDescription>
											</div>
										</div>
										<div className='flex items-center gap-2 text-sm font-semibold text-duo-ink/60'>
											Курс {course.level}
										</div>
									</CardHeader>
									<CardContent className='flex items-center justify-between'>
										<span className='text-sm text-duo-ink/60'>
											{course.level}
										</span>
										<Button
											size='sm'
											variant='duo'
											onClick={e => {
												e.stopPropagation()
												router.push(
													`/learn/courses/${course.id}`
												)
											}}
										>
											Открыть
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</section>

				{currentCourse && (
					<section>
						<div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
							<div>
								<p className='text-sm font-semibold uppercase tracking-[0.4em] text-duo-ink/50'>
									Прогресс курса
								</p>
								<h2 className='text-4xl font-black text-duo-ink'>
									Уроки курса «{currentCourse.title}»
								</h2>
							</div>
							<Button
								variant='outline'
								onClick={() =>
									router.push(
										`/learn/courses/${currentCourse.id}`
									)
								}
							>
								Смотреть всё
							</Button>
						</div>
						<Card className='border-none bg-white/90 shadow-[0_40px_80px_rgba(20,84,50,0.08)]'>
							<CardContent className='grid gap-6 py-10 md:grid-cols-3'>
								<div className='flex flex-col gap-2 rounded-3xl bg-duo-green/10 p-6'>
									<p className='text-sm font-semibold text-duo-ink/60'>
										Пройдено уроков
									</p>
									<p className='text-3xl font-black text-duo-ink'>
										—
									</p>
								</div>
								<div className='flex flex-col gap-2 rounded-3xl bg-duo-blue/10 p-6'>
									<p className='text-sm font-semibold text-duo-ink/60'>
										Осталось
									</p>
									<p className='text-3xl font-black text-duo-ink'>
										—
									</p>
								</div>
								<div className='flex flex-col gap-2 rounded-3xl bg-duo-yellow/10 p-6'>
									<p className='text-sm font-semibold text-duo-ink/60'>
										Награда
									</p>
									<p className='text-3xl font-black text-duo-ink'>
										+150 XP
									</p>
								</div>
							</CardContent>
						</Card>
					</section>
				)}
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
