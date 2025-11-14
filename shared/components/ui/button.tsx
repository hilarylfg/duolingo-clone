import * as React from 'react'

import { cn } from '@/shared/utils'

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
		| 'duo'
	size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = 'default', size = 'default', ...props }, ref) => {
		return (
			<button
				className={cn(
					'inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-duo-green/30 disabled:pointer-events-none disabled:opacity-50',
					{
						'bg-duo-green text-white shadow-lg shadow-duo-green/30 hover:-translate-y-0.5 hover:bg-duo-green-dark active:translate-y-0':
							variant === 'duo',
						'bg-duo-blue text-white hover:bg-duo-blue/90':
							variant === 'default',
						'bg-duo-ink text-white hover:bg-duo-ink/90':
							variant === 'destructive',
						'bg-white border-2 border-duo-ink/10 text-duo-ink hover:border-duo-ink/20':
							variant === 'outline',
						'bg-white/80 text-duo-ink hover:bg-white':
							variant === 'secondary',
						'text-duo-ink/70 hover:text-duo-ink':
							variant === 'ghost',
						'text-duo-blue underline-offset-4 hover:underline':
							variant === 'link'
					},
					{
						'px-6 py-3 text-base': size === 'default',
						'px-4 py-2 text-sm': size === 'sm',
						'px-8 py-4 text-lg': size === 'lg',
						'h-12 w-12 p-0': size === 'icon'
					},
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export { Button }
