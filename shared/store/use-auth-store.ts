import { create } from 'zustand'

import { TypeSettingsSchema } from '@/shared/schemas'
import { authService, learningService, userService } from '@/shared/services'
import { User } from '@/shared/types'

interface AuthStore {
	user: User | null
	isLoading: boolean
	isAuthenticated: boolean
	isFetched: boolean

	setUser: (user: User | null) => void
	login: (email: string, password: string, code?: string) => Promise<void>
	logout: () => Promise<void>
	fetchUser: () => Promise<void>
	updateProfile: (data: TypeSettingsSchema) => Promise<void>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
	user: null,
	isLoading: false,
	isAuthenticated: false,
	isFetched: false,

	setUser: user => {
		set({ user, isAuthenticated: !!user })
		learningService.setUserId(user?.id || null)
	},

	login: async (email, password, code) => {
		set({ isLoading: true })
		try {
			const response = await authService.login({ email, password, code })

			// Проверяем, вернулся ли пользователь или сообщение о необходимости 2FA
			if ('user' in response) {
				learningService.setUserId(response.user.id)
				set({
					user: response.user,
					isAuthenticated: true,
					isFetched: true
				})
			} else {
				// Это сообщение о необходимости ввода 2FA кода
				throw new Error(response.message)
			}
		} finally {
			set({ isLoading: false })
		}
	},

	logout: async () => {
		set({ isLoading: true })
		try {
			await authService.logout()
			learningService.setUserId(null)
			set({ user: null, isAuthenticated: false, isFetched: false })
		} finally {
			set({ isLoading: false })
		}
	},

	fetchUser: async () => {
		const state = get()

		console.log('[fetchUser] Called with state:', {
			isLoading: state.isLoading,
			isFetched: state.isFetched,
			hasUser: !!state.user
		})

		// Не делаем запрос, если уже загружаем
		if (state.isLoading) {
			console.log('[fetchUser] Already loading, skipping...')
			return
		}

		// Если уже есть пользователь и мы уже делали запрос, не делаем повторный
		if (state.user && state.isFetched) {
			console.log('[fetchUser] User already fetched, skipping...')
			return
		}

		console.log('[fetchUser] Fetching user from API...')
		set({ isLoading: true })
		try {
			const user = await userService.findProfile()
			console.log('[fetchUser] User fetched successfully:', user)
			learningService.setUserId(user.id)
			set({ user, isAuthenticated: true, isFetched: true })
		} catch (error) {
			console.error('[fetchUser] Failed to fetch user:', error)
			learningService.setUserId(null)
			set({ user: null, isAuthenticated: false, isFetched: true })
		} finally {
			set({ isLoading: false })
		}
	},

	updateProfile: async data => {
		set({ isLoading: true })
		try {
			const user = await userService.updateProfile(data)
			set({ user })
		} finally {
			set({ isLoading: false })
		}
	}
}))

export const selectUser = (state: AuthStore) => state.user
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated
export const selectIsLoading = (state: AuthStore) => state.isLoading
