export enum UserRole {
	REGULAR = 'REGULAR',
	ADMIN = 'ADMIN'
}

export enum AuthMethod {
	CREDENTIALS = 'CREDENTIALS'
}

export interface User {
	id: string
	email: string
	displayName: string
	picture?: string
	role: UserRole
	isVerified: boolean
	isTwoFactorEnabled: boolean
	method: AuthMethod
	createdAt: string
	updatedAt: string
}

export enum CourseLevel {
	BEGINNER = 'BEGINNER',
	INTERMEDIATE = 'INTERMEDIATE',
	ADVANCED = 'ADVANCED'
}

export interface Language {
	id: string
	name: string
	code: string
	flag?: string
	createdAt: string
	updatedAt: string
}

export interface Course {
	id: string
	title: string
	description?: string
	imageUrl?: string
	languageId: string
	language?: Language
	isPublished: boolean
	level: CourseLevel
	createdAt: string
	updatedAt: string
}

export interface Lesson {
	id: string
	title: string
	description?: string
	order: number
	courseId: string
	course?: Course
	exercises?: Exercise[]
	createdAt: string
	updatedAt: string
}

export enum ExerciseType {
	TRANSLATION = 'TRANSLATION',
	MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
	FILL_BLANK = 'FILL_BLANK',
	LISTENING = 'LISTENING',
	SPEAKING = 'SPEAKING',
	MATCHING = 'MATCHING'
}

export interface Exercise {
	id: string
	question: string
	type: ExerciseType
	order: number
	options?: unknown
	correctAnswer: unknown
	audioUrl?: string
	hint?: string
	lessonId: string
	lesson?: Lesson
	createdAt: string
	updatedAt: string
}

export interface UserProgress {
	id: string
	userId: string
	courseId: string
	xp: number
	streak: number
	lastStudyDate: string
}

export interface LessonProgress {
	id: string
	userId: string
	lessonId: string
	isCompleted: boolean
	score: number
	completedAt?: string
}

export interface UserAnswer {
	id: string
	userId: string
	exerciseId: string
	answer: unknown
	isCorrect: boolean
	answeredAt: string
}
