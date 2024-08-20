'use client'

import { CarTextBanner } from './car-text-banner'
import { usePathname } from 'next/navigation'
import { EditData } from './edit-data'

export function HeaderContent() {
	const path = usePathname()
	return (
		<div>
			{path === '/car-insurance/premium' && <EditData />}
			{path === '/car-insurance/1' && <CarTextBanner />}
		</div>
	)
}
