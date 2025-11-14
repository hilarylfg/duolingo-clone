'use client'

import { ArrowLeft, CheckCircle, Sparkles, Trophy, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
	Button,
	Card,
	CardContent,
	ExerciseRenderer,
	Header,
	Progress
} from '@/shared/components'
import { useLearningStore } from '@/shared/store'

export default function LessonPage() {
	const router = useRouter()
	const params = useParams()
	const lessonId = params.id as string

	const {
		currentLesson,
		exercises,
		currentExerciseIndex,
		score,
		startLesson,
		submitAnswer,
		nextExercise,
		completeLesson,
		resetLesson,
		isLoading
	} = useLearningStore()

	const [isChecking, setIsChecking] = useState(false)
	const [feedback, setFeedback] = useState<{
		isCorrect: boolean
		message: string
	} | null>(null)
	const [isCompleted, setIsCompleted] = useState(false)

	useEffect(() => {
		if (lessonId) {
			startLesson(lessonId)
		}

		return () => {
			resetLesson()
		}
	}, [lessonId, startLesson, resetLesson])

	const handleSubmit = async (answer: unknown) => {
		if (!exercises[currentExerciseIndex]) return

		setIsChecking(true)
		const isCorrect = await submitAnswer(
			exercises[currentExerciseIndex].id,
			answer
		)

		setFeedback({
			isCorrect,
			message: isCorrect
				? 'Отлично! 🎉'
				: 'Не совсем так. Попробуй ещё раз!'
		})

		setIsChecking(false)
	}

	const handleNext = () => {
		setFeedback(null)

		if (currentExerciseIndex < exercises.length - 1) {
			nextExercise()
		} else {
			handleComplete()
		}
	}

	const handleComplete = async () => {
		await completeLesson()
		setIsCompleted(true)
	}

	if (isLoading) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center duo-hero text-duo-ink/70'>
				<div className='h-14 w-14 animate-spin rounded-full border-4 border-duo-green border-t-transparent'></div>
				<p className='mt-6 text-lg font-semibold'>
					Готовим упражнения...
				</p>
			</div>
		)
	}

	if (!currentLesson || exercises.length === 0) {
		return (
			<div className='flex min-h-screen items-center justify-center duo-hero'>
				<Card className='max-w-md glass-card'>
					<CardContent className='space-y-4 py-14 text-center'>
						<Sparkles className='mx-auto h-10 w-10 text-duo-blue' />
						<p className='text-xl font-semibold text-duo-ink'>
							Урок не найден
						</p>
						<Button
							variant='duo'
							onClick={() => router.push('/learn')}
						>
							Вернуться к обучению
						</Button>
					</CardContent>
				</Card>
			</div>
		)
	}

	const currentExercise = exercises[currentExerciseIndex]
	const progressPercentage =
		((currentExerciseIndex + 1) / exercises.length) * 100

	if (isCompleted) {
		const finalScore = Math.round((score / exercises.length) * 100)

		return (
			<div className='flex min-h-screen items-center justify-center duo-hero p-4'>
				<Card className='w-full max-w-lg border-none bg-white/90 shadow-[0_35px_80px_rgba(88,204,2,0.3)]'>
					<CardContent className='space-y-8 py-14 text-center'>
						<div className='mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-duo-yellow/20'>
							<Trophy className='h-16 w-16 text-duo-yellow' />
						</div>
						<div>
							<h2 className='mb-3 text-5xl font-black text-duo-ink'>
								Урок завершён!
							</h2>
							<p className='text-xl text-duo-ink/70'>
								Ваш результат:{' '}
								<span className='font-black text-duo-green'>
									{finalScore}%
								</span>
							</p>
						</div>
						<div className='rounded-3xl bg-duo-cloud p-6'>
							<p className='text-duo-ink/70'>
								Правильных ответов:{' '}
								<span className='font-bold text-duo-ink'>
									{score}
								</span>{' '}
								из {exercises.length}
							</p>
						</div>
						<div className='space-y-3'>
							<Button
								variant='duo'
								size='lg'
								className='w-full'
								onClick={() => router.push('/learn')}
							>
								Продолжить обучение
							</Button>
							<Button
								variant='outline'
								size='lg'
								className='w-full'
								onClick={() => {
									setIsCompleted(false)
									startLesson(lessonId)
								}}
							>
								Пройти урок снова
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className='min-h-screen duo-hero'>
			<Header />

			<div className='border-b border-white/40 bg-white/60'>
				<div className='mx-auto flex w-full max-w-5xl items-center gap-4 px-6 py-4'>
					<Link href='/learn'>
						<Button variant='ghost' size='sm'>
							<ArrowLeft className='mr-2 h-4 w-4' /> Выйти
						</Button>
					</Link>
					<div className='flex-1'>
						<Progress value={progressPercentage} className='h-4' />
					</div>
					<div className='text-sm font-bold text-duo-ink/60'>
						{currentExerciseIndex + 1} / {exercises.length}
					</div>
				</div>
			</div>

			<main className='mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16'>
				<div className='text-center'>
					<p className='text-sm font-semibold uppercase tracking-[0.4em] text-duo-ink/50'>
						{currentLesson.title}
					</p>
				</div>

				{!feedback ? (
					<ExerciseRenderer
						exercise={currentExercise}
						onSubmit={handleSubmit}
						disabled={isChecking}
					/>
				) : (
					<Card
						className={
							feedback.isCorrect
								? 'border-duo-green bg-duo-green/5 shadow-[0_35px_80px_rgba(88,204,2,0.15)]'
								: 'border-duo-error bg-duo-error/5 shadow-[0_35px_80px_rgba(255,111,111,0.15)]'
						}
					>
						<CardContent className='space-y-8 py-12'>
							<div className='text-center'>
								{feedback.isCorrect ? (
									<div className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-duo-green/10'>
										<CheckCircle className='h-14 w-14 text-duo-green' />
									</div>
								) : (
									<div className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-duo-error/10'>
										<XCircle className='h-14 w-14 text-duo-error' />
									</div>
								)}
								<h3
									className={`mb-4 text-4xl font-black ${
										feedback.isCorrect
											? 'text-duo-green'
											: 'text-duo-error'
									}`}
								>
									{feedback.message}
								</h3>
								{!feedback.isCorrect &&
									currentExercise.hint && (
										<p className='rounded-3xl bg-duo-blue/10 p-6 text-lg text-duo-blue'>
											💡 Подсказка: {currentExercise.hint}
										</p>
									)}
							</div>
							<div className='flex gap-4'>
								{!feedback.isCorrect && (
									<Button
										variant='outline'
										size='lg'
										className='flex-1'
										onClick={() => setFeedback(null)}
									>
										Попробовать снова
									</Button>
								)}
								<Button
									variant='duo'
									size='lg'
									className='flex-1'
									onClick={handleNext}
								>
									{currentExerciseIndex < exercises.length - 1
										? 'Продолжить'
										: 'Завершить урок'}
								</Button>
							</div>
						</CardContent>
					</Card>
				)}

				<div className='rounded-3xl bg-white/90 p-5 text-center text-sm text-duo-ink/70 shadow-[0_20px_50px_rgba(20,84,50,0.08)]'>
					Правильных ответов:{' '}
					<span className='font-bold text-duo-green'>{score}</span> из{' '}
					{currentExerciseIndex + (feedback?.isCorrect ? 1 : 0)}
				</div>
			</main>
		</div>
	)
}
