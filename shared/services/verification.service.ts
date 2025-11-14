import { api } from '@/shared/utils'

class VerificationService {
	public async newVerification(token: string | null) {
		return await api.post('email-confirmation', { token })
	}
}

export const verificationService = new VerificationService()
