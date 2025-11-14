import { TypeLoginSchema, TypeRegisterSchema } from '@/shared/schemas'
import { User } from '@/shared/types'
import { api } from '@/shared/utils/instance.api'

class AuthService {
	public async register(body: TypeRegisterSchema) {
		return await api.post<User>('auth/register', body)
	}

	public async login(body: TypeLoginSchema) {
		return await api.post<{ user: User } | { message: string }>(
			'auth/login',
			body
		)
	}

	public async logout() {
		return await api.post('auth/logout')
	}
}

export const authService = new AuthService()
