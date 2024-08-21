'use client'

import { CarTextBanner } from './car-text-banner'
import { usePathname } from 'next/navigation'

export function HeaderContent() {
	const path = usePathname()
	return <div>{path === '/car-insurance/1' && <CarTextBanner />}</div>
}
