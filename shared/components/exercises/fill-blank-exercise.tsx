'use client'

import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Exercise } from '@/shared/types'

interface FillBlankExerciseProps {
	exercise: Exercise
	onSubmit: (answer: string) => void
	disabled?: boolean
}

export function FillBlankExercise({
	exercise,
	onSubmit,
	disabled
}: FillBlankExerciseProps) {
	const [answer, setAnswer] = useState('')

	const parts = exercise.question.split('___')

	const handleSubmit = () => {
		if (answer.trim()) {
			onSubmit(answer.trim())
			setAnswer('')
		}
	}

	return (
		<Card className='border-none bg-white/90 p-10 shadow-[0_35px_80px_rgba(20,84,50,0.08)]'>
			<div className='space-y-8'>
				<div className='space-y-3'>
					<p className='text-sm font-semibold uppercase tracking-[0.4em] text-duo-ink/50'>
						Заполните пропуск
					</p>
					<div className='flex flex-wrap items-center gap-3 text-3xl font-black text-duo-ink md:text-4xl'>
						<span>{parts[0]}</span>
						<Input
							value={answer}
							onChange={e => setAnswer(e.target.value)}
							placeholder='...'
							disabled={disabled}
							onKeyDown={e => e.key === 'Enter' && handleSubmit()}
							className='inline-flex w-56 text-2xl py-6'
						/>
						<span>{parts[1]}</span>
					</div>
				</div>

				{exercise.hint && (
					<div className='rounded-3xl bg-duo-blue/10 p-5 text-base font-semibold text-duo-blue'>
						💡 Подсказка: {exercise.hint}
					</div>
				)}

				{Array.isArray(exercise.options) &&
					(exercise.options as string[]).length > 0 && (
						<div className='space-y-4'>
							<p className='text-sm font-semibold text-duo-ink/60'>
								Варианты ответов:
							</p>
							<div className='flex flex-wrap gap-3'>
								{(exercise.options as string[]).map(
									(option, index) => (
										<Button
											key={index}
											variant='outline'
											onClick={() =>
												!disabled && setAnswer(option)
											}
											disabled={disabled}
											size='sm'
											className='rounded-full px-5 py-2'
										>
											{option}
										</Button>
									)
								)}
							</div>
						</div>
					)}

				<Button
					onClick={handleSubmit}
					disabled={disabled || !answer.trim()}
					className='w-full'
					size='lg'
					variant='duo'
				>
					Проверить
				</Button>
			</div>
		</Card>
	)
}
