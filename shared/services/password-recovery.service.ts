import {
	TypeNewPasswordSchema,
	TypeResetPasswordSchema
} from '@/shared/schemas'
import { User } from '@/shared/types'
import { api } from '@/shared/utils'

class PasswordRecoveryService {
	public async reset(body: TypeResetPasswordSchema) {
		return await api.post<User>('auth/password-recovery/reset', body)
	}

	public async new(body: TypeNewPasswordSchema, token: string | null) {
		return await api.post<User>(`auth/password-recovery/new/${token}`, body)
	}
}

export const passwordRecoveryService = new PasswordRecoveryService()
