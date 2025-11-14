import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Подтверждение Email | Duolingo Clone',
	description: 'Подтверждение адреса электронной почты'
}

export default function NewVerificationLayout({
	children
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
