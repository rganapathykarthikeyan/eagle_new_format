'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Logo } from './logo'
import { Button } from '@/components/ui'
import LanguageChanger from '../common/language_changer'

export function Header() {
	const route = useRouter()
	const path = usePathname()
	const beforeLogin =
		path === '/' ||
		path === '/car-insurance/1' ||
		path === '/car-insurance/2' ||
		path === '/car-insurance/confirm/otp-verify'
	return (
		<section className='sticky top-0 z-20 flex h-full max-h-20 w-full flex-row items-center justify-between bg-white shadow'>
			<div className='text-blue-525 flex h-full flex-row items-center gap-8 p-3 font-jakarta text-xs font-medium md:text-sm'>
				<Logo />
				<div className='font-monts hidden h-full flex-row items-center gap-8 font-medium md:flex'>
					<span>Overview</span>
					<span>Features</span>
					<span>Pricing</span>
					<span>About</span>
				</div>
			</div>
			<div className='flex h-full flex-row items-center gap-4 p-3 font-jakarta text-gray-500'>
				<LanguageChanger />
				<Button
					className='from-blue-725 via-blue-750 to-blue-775 rounded-3xl bg-gradient-to-b px-6 py-2 text-blue-375'
					onClick={() => {
						route.push('/login')
					}}>
					{beforeLogin ? <span>Sign In</span> : <span>Log out</span>}
				</Button>
			</div>
		</section>
	)
}
