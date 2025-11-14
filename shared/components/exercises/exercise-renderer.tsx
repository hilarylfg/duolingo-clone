'use client'

import { Card, CardContent } from '@/shared/components/ui/card'
import { Exercise, ExerciseType } from '@/shared/types'

import { FillBlankExercise } from './fill-blank-exercise'
import { MultipleChoiceExercise } from './multiple-choice-exercise'
import { TranslationExercise } from './translation-exercise'

interface ExerciseRendererProps {
	exercise: Exercise
	onSubmit: (answer: unknown) => void
	disabled?: boolean
}

export function ExerciseRenderer({
	exercise,
	onSubmit,
	disabled
}: ExerciseRendererProps) {
	switch (exercise.type) {
		case ExerciseType.TRANSLATION:
			return (
				<TranslationExercise
					exercise={exercise}
					onSubmit={onSubmit}
					disabled={disabled}
				/>
			)

		case ExerciseType.MULTIPLE_CHOICE:
			return (
				<MultipleChoiceExercise
					exercise={exercise}
					onSubmit={onSubmit}
					disabled={disabled}
				/>
			)

		case ExerciseType.FILL_BLANK:
			return (
				<FillBlankExercise
					exercise={exercise}
					onSubmit={onSubmit}
					disabled={disabled}
				/>
			)

		case ExerciseType.LISTENING:
		case ExerciseType.SPEAKING:
		case ExerciseType.MATCHING:
			return (
				<Card className='border-none bg-white/90 shadow-[0_35px_80px_rgba(20,84,50,0.08)]'>
					<CardContent className='space-y-4 py-14 text-center'>
						<div className='text-6xl'>🚧</div>
						<p className='text-2xl font-black text-duo-ink'>
							Этот тип упражнения пока в разработке
						</p>
						<p className='text-sm font-semibold text-duo-ink/60'>
							Тип: {exercise.type}
						</p>
					</CardContent>
				</Card>
			)

		default:
			return (
				<Card className='border-duo-error bg-duo-error/5 shadow-[0_35px_80px_rgba(255,111,111,0.15)]'>
					<CardContent className='py-14 text-center'>
						<p className='text-2xl font-black text-duo-error'>
							Неизвестный тип упражнения
						</p>
					</CardContent>
				</Card>
			)
	}
}
