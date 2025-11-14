'use client'

import { ArrowLeft, Lock, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Header } from '@/shared/components/header'
import { Button } from '@/shared/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/shared/components/ui/card'
import { Progress } from '@/shared/components/ui/progress'
import { learningService } from '@/shared/services'
import { Lesson } from '@/shared/types'

export default function CoursePage() {
	const router = useRouter()
	const params = useParams()
	const courseId = params.id as string

	const [lessons, setLessons] = useState<Lesson[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchLessons = async () => {
			try {
				const data = await learningService.getLessons(courseId)
				setLessons(data)
			} catch (error) {
				console.error('Failed to fetch lessons:', error)
			} finally {
				setIsLoading(false)
			}
		}

		if (courseId) {
			fetchLessons()
		}
	}, [courseId])

	const startLesson = (lessonId: string) => {
		router.push(`/lesson/${lessonId}`)
	}

	if (isLoading) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center duo-hero text-duo-ink/70'>
				<div className='h-14 w-14 animate-spin rounded-full border-4 border-duo-green border-t-transparent'></div>
				<p className='mt-6 text-lg font-semibold'>
					Готовим дерево уроков...
				</p>
			</div>
		)
	}

	return (
		<div className='min-h-screen duo-hero'>
			<Header />

			<div className='border-b border-white/40 bg-white/60'>
				<div className='mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6'>
					<Link href='/learn'>
						<Button variant='ghost' size='sm'>
							<ArrowLeft className='mr-2 h-4 w-4' /> Назад к
							курсам
						</Button>
					</Link>
					<p className='text-sm font-semibold uppercase tracking-[0.3em] text-duo-ink/60'>
						Дерево уроков
					</p>
					<div className='w-32'></div>
				</div>
			</div>

			<main className='mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-16'>
				<section className='rounded-[40px] bg-white/90 p-8 shadow-[0_40px_80px_rgba(20,84,50,0.08)]'>
					<div className='flex flex-wrap items-center justify-between gap-4'>
						<div>
							<p className='text-sm font-semibold uppercase tracking-[0.4em] text-duo-ink/50'>
								Курс
							</p>
							<h1 className='text-4xl font-black text-duo-ink md:text-5xl'>
								Дерево уроков
							</h1>
							<p className='text-lg text-duo-ink/70'>
								Развивай навыки шаг за шагом и открывай сундуки
								XP.
							</p>
						</div>
						<Button
							variant='duo'
							size='lg'
							onClick={() => router.push('/learn')}
						>
							На главную
						</Button>
					</div>
				</section>

				{lessons.length === 0 ? (
					<Card className='glass-card'>
						<CardContent className='py-16 text-center'>
							<Sparkles className='mx-auto mb-4 h-10 w-10 text-duo-blue' />
							<p className='text-xl font-semibold text-duo-ink'>
								Уроки скоро появятся
							</p>
							<p className='text-duo-ink/60'>
								Следите за обновлениями — мы уже готовим новые
								задания!
							</p>
						</CardContent>
					</Card>
				) : (
					<div className='space-y-6'>
						{lessons.map(lesson => {
							const isLocked = false
							const isCompleted = false
							const progress = isCompleted ? 100 : 0

							return (
								<Card
									key={lesson.id}
									className={`border-none bg-white/90 shadow-[0_35px_80px_rgba(20,84,50,0.08)] transition hover:-translate-y-0.5 ${
										isLocked
											? 'opacity-60'
											: 'cursor-pointer'
									}`}
									onClick={() =>
										!isLocked && startLesson(lesson.id)
									}
								>
									<CardHeader className='space-y-4'>
										<div className='flex items-center gap-4'>
											<div
												className={`rounded-[24px] p-4 text-3xl shadow-inner ${
													isCompleted
														? 'bg-duo-green/20'
														: isLocked
															? 'bg-duo-ink/5'
															: 'bg-duo-cloud'
												}`}
											>
												{isCompleted
													? '💎'
													: isLocked
														? '🔒'
														: '📘'}
											</div>
											<div className='flex-1'>
												<CardTitle className='text-2xl'>
													{lesson.title}
												</CardTitle>
												<CardDescription className='text-base'>
													Урок {lesson.order} •{' '}
													{lesson.description ||
														'Практика и новые навыки'}
												</CardDescription>
											</div>
										</div>
										<div className='flex flex-wrap items-center gap-3 text-sm font-semibold text-duo-ink/60'>
											<span className='duo-pill bg-duo-cloud'>
												XP: 20
											</span>
											<span className='duo-pill bg-duo-cloud'>
												Урок {lesson.order}
											</span>
											{isLocked && (
												<span className='inline-flex items-center gap-1 rounded-full bg-duo-ink/10 px-3 py-1'>
													<Lock className='h-4 w-4' />{' '}
													Требуется предыдущий урок
												</span>
											)}
										</div>
									</CardHeader>
									<CardContent>
										<div className='flex flex-wrap items-center gap-4'>
											<div className='flex-1'>
												<Progress value={progress} />
											</div>
											<Button
												size='sm'
												variant={
													isCompleted
														? 'outline'
														: 'duo'
												}
												disabled={isLocked}
												onClick={e => {
													e.stopPropagation()
													if (!isLocked)
														startLesson(lesson.id)
												}}
											>
												{isCompleted
													? 'Повторить'
													: isLocked
														? 'Заблокировано'
														: 'Начать'}
											</Button>
										</div>
									</CardContent>
								</Card>
							)
						})}
					</div>
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
