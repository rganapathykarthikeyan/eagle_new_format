import { cn } from '@/lib'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				transparent: 'bg-transparent',
				bluebtn: 'bg-blue-300 text-white',
				whiteRounded: 'bg-white text-gray-600',
				whiteBordered: 'bg-white text-blue-600 border-2 border-gray-300 font-medium',
				whiteBlackOutlined: 'bg-white text-black border border-black rounded-md',
				greenbtn: 'bg-green-600 text-white',
				darkBlueBtn: 'bg-blue-825 text-white'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				smRoundedfull: 'h-9 rounded-full px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
				xl: 'h-14 rounded-full px-3'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export type ButtonProps = {
	asChild?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				ref={ref}
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
			/>
		)
	}
)

Button.displayName = 'Button'

export { Button, buttonVariants }
