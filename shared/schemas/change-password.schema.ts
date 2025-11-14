import { z } from 'zod'

export const ChangePasswordSchema = z
	.object({
		currentPassword: z.string().min(6, {
			message: 'Текущий пароль минимум 6 символов'
		}),
		newPassword: z.string().min(6, {
			message: 'Новый пароль минимум 6 символов'
		}),
		confirmPassword: z.string().min(6, {
			message: 'Подтверждение пароля минимум 6 символов'
		})
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword']
	})

export type TypeChangePasswordSchema = z.infer<typeof ChangePasswordSchema>

