import { create } from 'zustand'

import { learningService } from '@/shared/services'
import {
	Course,
	Exercise,
	Language,
	Lesson,
	LessonProgress,
	UserAnswer,
	UserProgress
} from '@/shared/types'

interface LearningStore {
	languages: Language[]
	courses: Course[]
	currentCourse: Course | null
	currentLesson: Lesson | null
	exercises: Exercise[]
	currentExerciseIndex: number
	userProgress: UserProgress | null
	lessonProgress: LessonProgress | null
	answers: UserAnswer[]
	score: number
	isLoading: boolean

	// Actions
	fetchLanguages: () => Promise<void>
	fetchCourses: (languageId?: string) => Promise<void>
	selectCourse: (courseId: string) => Promise<void>
	startLesson: (lessonId: string) => Promise<void>
	submitAnswer: (exerciseId: string, answer: unknown) => Promise<boolean>
	nextExercise: () => void
	completeLesson: () => Promise<void>
	resetLesson: () => void
}

export const useLearningStore = create<LearningStore>((set, get) => ({
	// Initial state
	languages: [],
	courses: [],
	currentCourse: null,
	currentLesson: null,
	exercises: [],
	currentExerciseIndex: 0,
	userProgress: null,
	lessonProgress: null,
	answers: [],
	score: 0,
	isLoading: false,

	fetchLanguages: async () => {
		set({ isLoading: true })
		try {
			const languages = await learningService.getLanguages()
			set({ languages })
		} catch (error) {
			console.error('Failed to fetch languages:', error)
		} finally {
			set({ isLoading: false })
		}
	},

	fetchCourses: async languageId => {
		set({ isLoading: true })
		try {
			const courses = await learningService.getCourses(languageId)
			set({ courses })
		} catch (error) {
			console.error('Failed to fetch courses:', error)
		} finally {
			set({ isLoading: false })
		}
	},

	selectCourse: async courseId => {
		set({ isLoading: true })
		try {
			const [course, userProgress] = await Promise.all([
				learningService.getCourse(courseId),
				learningService.getUserProgress(courseId)
			])
			set({ currentCourse: course, userProgress })
		} catch (error) {
			console.error('Failed to select course:', error)
		} finally {
			set({ isLoading: false })
		}
	},

	startLesson: async lessonId => {
		set({ isLoading: true })
		try {
			const [lesson, exercises, lessonProgress] = await Promise.all([
				learningService.getLesson(lessonId),
				learningService.getExercises(lessonId),
				learningService.getLessonProgress(lessonId).catch(() => null)
			])

			set({
				currentLesson: lesson,
				exercises,
				lessonProgress,
				currentExerciseIndex: 0,
				answers: [],
				score: 0
			})
		} catch (error) {
			console.error('Failed to start lesson:', error)
		} finally {
			set({ isLoading: false })
		}
	},

	submitAnswer: async (exerciseId, answer) => {
		try {
			const result = await learningService.submitAnswer({
				exerciseId,
				answer
			})
			const state = get()

			set({
				answers: [...state.answers, result],
				score: result.isCorrect ? state.score + 1 : state.score
			})

			return result.isCorrect
		} catch (error) {
			console.error('Failed to submit answer:', error)
			return false
		}
	},

	nextExercise: () => {
		const state = get()
		if (state.currentExerciseIndex < state.exercises.length - 1) {
			set({ currentExerciseIndex: state.currentExerciseIndex + 1 })
		}
	},

	completeLesson: async () => {
		const state = get()
		if (!state.currentLesson) return

		try {
			const finalScore = Math.round(
				(state.score / state.exercises.length) * 100
			)
			const lessonProgress = await learningService.completeLesson(
				state.currentLesson.id,
				finalScore
			)

			set({ lessonProgress })
		} catch (error) {
			console.error('Failed to complete lesson:', error)
		}
	},

	resetLesson: () => {
		set({
			currentLesson: null,
			exercises: [],
			currentExerciseIndex: 0,
			answers: [],
			score: 0
		})
	}
}))
