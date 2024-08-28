'use client'

import { useAppSelector } from '@/redux/hooks'
import { useEffect, useRef } from 'react'

export function MoveDownRef() {
	const homeData = useAppSelector((state) => state.homeInsurance)
	const pageEnd = useRef<HTMLDivElement>(null)

	function scrollToBottom() {
		pageEnd.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [homeData])

	return <div ref={pageEnd}></div>
}
