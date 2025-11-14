import {
	Course,
	CourseLevel,
	Exercise,
	ExerciseType,
	Language,
	Lesson,
	LessonProgress,
	UserProgress
} from '@/shared/types'

export const mockLanguages: Language[] = [
	{
		id: '1',
		name: 'Английский',
		code: 'en',
		flag: '🇬🇧',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '2',
		name: 'Испанский',
		code: 'es',
		flag: '🇪🇸',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '3',
		name: 'Французский',
		code: 'fr',
		flag: '🇫🇷',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	}
]

export const mockCourses: Course[] = [
	{
		id: 'course-1',
		title: 'Английский для начинающих',
		description: 'Изучите основы английского языка с нуля',
		languageId: '1',
		isPublished: true,
		level: CourseLevel.BEGINNER,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: 'course-2',
		title: 'Английский средний уровень',
		description: 'Продолжайте изучение английского языка',
		languageId: '1',
		isPublished: true,
		level: CourseLevel.INTERMEDIATE,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: 'course-3',
		title: 'Испанский для начинающих',
		description: 'Начните изучать испанский язык',
		languageId: '2',
		isPublished: true,
		level: CourseLevel.BEGINNER,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	}
]

export const mockLessons: Lesson[] = [
	// Уроки для курса 1 (Английский для начинающих)
	{
		id: 'lesson-1',
		title: 'Приветствия',
		description: 'Научитесь здороваться на английском',
		order: 1,
		courseId: 'course-1',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: 'lesson-2',
		title: 'Числа 1-10',
		description: 'Выучите числа от 1 до 10',
		order: 2,
		courseId: 'course-1',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: 'lesson-3',
		title: 'Цвета',
		description: 'Изучите основные цвета',
		order: 3,
		courseId: 'course-1',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	// Уроки для курса 2 (Английский средний)
	{
		id: 'lesson-4',
		title: 'Прошедшее время',
		description: 'Изучите Past Simple',
		order: 1,
		courseId: 'course-2',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	// Уроки для курса 3 (Испанский)
	{
		id: 'lesson-5',
		title: 'Hola! Приветствия',
		description: 'Научитесь здороваться на испанском',
		order: 1,
		courseId: 'course-3',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	}
]

// Упражнения
export const mockExercises: Exercise[] = [
	// Упражнения для урока 1 (Приветствия)
	{
		id: 'ex-1',
		question: 'Hello',
		type: ExerciseType.TRANSLATION,
		order: 1,
		correctAnswer: 'Привет',
		hint: 'Самое распространенное приветствие',
		lessonId: 'lesson-1',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: 'ex-2',
		question: 'Как будет "Доброе утро" на английском?',
		type: ExerciseType.MULTIPLE_CHOICE,
		order: 2,
		options: [
			'Good morning',
			'Good night',
			'Good evening',
			'Good afternoon'
		],
		correctAnswer: 'Good morning',
		hint: 'Morning означает утро',
		lessonId: 'lesson-1',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: 'ex-3',
		question: 'Good ___!',
		type: ExerciseType.FILL_BLANK,
		order: 3,
		options: ['bye', 'night', 'morning', 'afternoon'],
		correctAnswer: 'bye',
		hint: 'Прощание на английском',
		lessonId: 'lesson-1',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: 'ex-4',
		question: 'How are you?',
		type: ExerciseType.TRANSLATION,
		order: 4,
		correctAnswer: 'Как дела?',
		hint: 'Вопрос о состоянии',
		lessonId: 'lesson-1',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: 'ex-5',
		question: 'Nice to ___ you!',
		type: ExerciseType.FILL_BLANK,
		order: 5,
		options: ['meet', 'see', 'know', 'watch'],
		correctAnswer: 'meet',
		hint: 'Приятно познакомиться',
		lessonId: 'lesson-1',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},

	// Упражнения для урока 2 (Числа)
	{
		id: 'ex-6',
		question: 'Как будет "один" на английском?',
		type: ExerciseType.MULTIPLE_CHOICE,
		order: 1,
		options: ['one', 'two', 'three', 'four'],
		correctAnswer: 'one',
		lessonId: 'lesson-2',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: 'ex-7',
		question: 'five',
		type: ExerciseType.TRANSLATION,
		order: 2,
		correctAnswer: 'пять',
		hint: 'Число после four',
		lessonId: 'lesson-2',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: 'ex-8',
		question: 'Сколько будет seven + three?',
		type: ExerciseType.MULTIPLE_CHOICE,
		order: 3,
		options: ['nine', 'ten', 'eight', 'eleven'],
		correctAnswer: 'ten',
		hint: '7 + 3 = ?',
		lessonId: 'lesson-2',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},

	// Упражнения для урока 3 (Цвета)
	{
		id: 'ex-9',
		question: 'red',
		type: ExerciseType.TRANSLATION,
		order: 1,
		correctAnswer: 'красный',
		hint: 'Цвет крови',
		lessonId: 'lesson-3',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: 'ex-10',
		question: 'Как будет "синий" на английском?',
		type: ExerciseType.MULTIPLE_CHOICE,
		order: 2,
		options: ['blue', 'green', 'yellow', 'black'],
		correctAnswer: 'blue',
		hint: 'Цвет неба',
		lessonId: 'lesson-3',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: 'ex-11',
		question: 'The grass is ___.',
		type: ExerciseType.FILL_BLANK,
		order: 3,
		options: ['green', 'red', 'blue', 'white'],
		correctAnswer: 'green',
		hint: 'Трава какого цвета?',
		lessonId: 'lesson-3',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},

	// Упражнения для урока 4 (Прошедшее время)
	{
		id: 'ex-12',
		question: 'I ___ to the store yesterday.',
		type: ExerciseType.FILL_BLANK,
		order: 1,
		options: ['went', 'go', 'goes', 'going'],
		correctAnswer: 'went',
		hint: 'Прошедшая форма глагола go',
		lessonId: 'lesson-4',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},

	// Упражнения для урока 5 (Испанский)
	{
		id: 'ex-13',
		question: 'Hola',
		type: ExerciseType.TRANSLATION,
		order: 1,
		correctAnswer: 'Привет',
		hint: 'Испанское приветствие',
		lessonId: 'lesson-5',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: 'ex-14',
		question: 'Как будет "До свидания" на испанском?',
		type: ExerciseType.MULTIPLE_CHOICE,
		order: 2,
		options: ['Adiós', 'Hola', 'Gracias', 'Por favor'],
		correctAnswer: 'Adiós',
		lessonId: 'lesson-5',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	}
]

const STORAGE_KEYS = {
	USER_PROGRESS: 'duolingo_user_progress',
	LESSON_PROGRESS: 'duolingo_lesson_progress',
	USER_ANSWERS: 'duolingo_user_answers'
}

export function getUserProgress(
	userId: string,
	courseId: string
): UserProgress | null {
	if (typeof window === 'undefined') return null

	const data = localStorage.getItem(
		`${STORAGE_KEYS.USER_PROGRESS}_${userId}_${courseId}`
	)
	return data ? JSON.parse(data) : null
}

export function saveUserProgress(userId: string, progress: UserProgress): void {
	if (typeof window === 'undefined') return

	localStorage.setItem(
		`${STORAGE_KEYS.USER_PROGRESS}_${userId}_${progress.courseId}`,
		JSON.stringify(progress)
	)
}

export function getLessonProgress(
	userId: string,
	lessonId: string
): LessonProgress | null {
	if (typeof window === 'undefined') return null

	const data = localStorage.getItem(
		`${STORAGE_KEYS.LESSON_PROGRESS}_${userId}_${lessonId}`
	)
	return data ? JSON.parse(data) : null
}

export function saveLessonProgress(
	userId: string,
	progress: LessonProgress
): void {
	if (typeof window === 'undefined') return

	localStorage.setItem(
		`${STORAGE_KEYS.LESSON_PROGRESS}_${userId}_${progress.lessonId}`,
		JSON.stringify(progress)
	)
}

export function initializeUserProgress(
	userId: string,
	courseId: string
): UserProgress {
	const existing = getUserProgress(userId, courseId)
	if (existing) return existing

	const newProgress: UserProgress = {
		id: `progress_${userId}_${courseId}`,
		userId,
		courseId,
		xp: 0,
		streak: 0,
		lastStudyDate: new Date().toISOString()
	}

	saveUserProgress(userId, newProgress)
	return newProgress
}
