import * as React from 'react'

import { cn } from '@/shared/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-14 w-full rounded-2xl border-2 border-duo-ink/5 bg-white px-5 text-base shadow-inner shadow-white focus-visible:border-duo-green focus-visible:ring-4 focus-visible:ring-duo-green/20 transition-all',
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Input.displayName = 'Input'

export { Input }
