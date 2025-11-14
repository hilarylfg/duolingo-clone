import type { Metadata } from 'next'
import { Fredoka, Nunito_Sans } from 'next/font/google'

import './globals.css'

const fredoka = Fredoka({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-fredoka'
})

const nunito = Nunito_Sans({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700', '800'],
	variable: '--font-nunito'
})

export const metadata: Metadata = {
	title: 'Duolingo Clone',
	description: 'Игровая платформа для изучения языков в стиле Duolingo'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body
				className={`${fredoka.variable} ${nunito.variable} antialiased bg-duo-body text-duo-ink`}
			>
				<div className='duo-noise min-h-screen'>{children}</div>
			</body>
		</html>
	)
}
