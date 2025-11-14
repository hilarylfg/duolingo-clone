import {
	getLessonProgress as getLessonProgressMock,
	getUserProgress as getUserProgressMock,
	initializeUserProgress as initializeUserProgressMock,
	mockCourses,
	mockExercises,
	mockLanguages,
	mockLessons,
	saveLessonProgress as saveLessonProgressMock,
	saveUserProgress as saveUserProgressMock
} from '@/shared/data/mockData'
import { Exercise, LessonProgress } from '@/shared/types'

const delay = (ms: number = 200) => new Promise(res => setTimeout(res, ms))

class LearningService {
	private userId: string | null = null

	public setUserId(userId: string | null) {
		this.userId = userId
	}

	private getUserId(): string {
		if (!this.userId) {
			throw new Error(
				'User ID не установлен. Пользователь не авторизован.'
			)
		}
		return this.userId
	}
	public async getLanguages() {
		await delay()
		return mockLanguages
	}

	public async getCourses(languageId?: string) {
		await delay()
		if (languageId) {
			return mockCourses.filter(c => c.languageId === languageId)
		}
		return mockCourses
	}

	public async getCourse(id: string) {
		await delay()
		const course = mockCourses.find(c => c.id === id)
		if (!course) throw new Error('Курс не найден')
		return course
	}

	public async getLessons(courseId: string) {
		await delay()
		return mockLessons
			.filter(l => l.courseId === courseId)
			.sort((a, b) => a.order - b.order)
	}

	public async getLesson(id: string) {
		await delay()
		const lesson = mockLessons.find(l => l.id === id)
		if (!lesson) throw new Error('Урок не найден')
		return lesson
	}

	public async getExercises(lessonId: string) {
		await delay()
		return mockExercises
			.filter(e => e.lessonId === lessonId)
			.sort((a, b) => a.order - b.order)
	}

	public async getUserProgress(courseId: string) {
		await delay()
		const userId = this.getUserId()
		let progress = getUserProgressMock(userId, courseId)
		if (!progress) {
			progress = initializeUserProgressMock(userId, courseId)
		}
		return progress
	}

	public async getLessonProgress(lessonId: string) {
		await delay()
		const userId = this.getUserId()
		const progress = getLessonProgressMock(userId, lessonId)
		if (!progress) throw new Error('Прогресс урока не найден')
		return progress
	}

	public async submitAnswer(body: { exerciseId: string; answer: unknown }) {
		await delay()
		const userId = this.getUserId()
		const exercise = mockExercises.find(e => e.id === body.exerciseId)
		if (!exercise) throw new Error('Упражнение не найдено')
		const isCorrect = this.checkAnswer(exercise, body.answer)
		return {
			id: `answer_${Date.now()}`,
			userId,
			exerciseId: body.exerciseId,
			answer: body.answer,
			isCorrect,
			answeredAt: new Date().toISOString()
		}
	}

	public async completeLesson(lessonId: string, score: number) {
		await delay()
		const userId = this.getUserId()
		const lessonProgress: LessonProgress = {
			id: `progress_${userId}_${lessonId}`,
			userId,
			lessonId,
			isCompleted: true,
			score,
			completedAt: new Date().toISOString()
		}
		saveLessonProgressMock(userId, lessonProgress)

		const lesson = mockLessons.find(l => l.id === lessonId)
		if (lesson) {
			let userProgress = getUserProgressMock(userId, lesson.courseId)
			if (!userProgress) {
				userProgress = initializeUserProgressMock(
					userId,
					lesson.courseId
				)
			}
			const xpGained = Math.floor(score / 10)
			userProgress.xp += xpGained

			const today = new Date().toDateString()
			const lastStudy = new Date(
				userProgress.lastStudyDate
			).toDateString()
			if (today !== lastStudy) {
				const yesterday = new Date()
				yesterday.setDate(yesterday.getDate() - 1)
				if (lastStudy === yesterday.toDateString()) {
					userProgress.streak += 1
				} else {
					userProgress.streak = 1
				}
			}
			userProgress.lastStudyDate = new Date().toISOString()
			saveUserProgressMock(userId, userProgress)
		}
		return lessonProgress
	}

	private checkAnswer(exercise: Exercise, userAnswer: unknown): boolean {
		const correct = String(exercise.correctAnswer).toLowerCase().trim()
		const user = String(userAnswer).toLowerCase().trim()
		return correct === user
	}
}

export const learningService = new LearningService()
