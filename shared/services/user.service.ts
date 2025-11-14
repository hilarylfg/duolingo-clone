import { TypeSettingsSchema } from '@/shared/schemas'
import { User } from '@/shared/types'
import { api } from '@/shared/utils'

class UserService {
	public async findProfile() {
		return await api.get<User>('users/profile')
	}

	public async updateProfile(body: TypeSettingsSchema) {
		return await api.patch<User>('users/profile', body)
	}
}

export const userService = new UserService()
