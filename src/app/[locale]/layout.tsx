import { AppProvider } from '@/components/app-provider'
import { cn, fonts } from '@/lib'
import { type Metadata } from 'next'
import { type PropsWithChildren } from 'react'
import './globals.css'

const fontVariables = fonts.map((f) => f.variable)

export const metadata: Metadata = {
	title: 'Eagle',
	description: 'Generated by create next app'
}

export default function Layout(props: PropsWithChildren) {
	return (
		<html lang='en'>
			<AppProvider>
				<body className={cn(fontVariables, 'bg-gray-950')}>{props.children}</body>
			</AppProvider>
		</html>
	)
}
