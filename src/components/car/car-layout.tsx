'use client'

import { type PropsWithChildren } from 'react'
import { Header } from '../header'
import { ChatBot } from '../support'
import { HeaderContent } from './header-content'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib'

export function CarLayout(props: PropsWithChildren) {
	const path = usePathname()
	return (
		<section className='relative flex h-full w-full flex-col'>
			<Header />
			<HeaderContent />
			<section
				className={cn('grid h-full flex-grow grid-cols-4', {
					'px-4 lg:px-12': path !== '/car-insurance/premium'
				})}>
				<div className='col-span-4 lg:col-span-4'>{props.children}</div>
			</section>
			<div className='fixed bottom-10 right-10'>
				<ChatBot />
			</div>
		</section>
	)
}
