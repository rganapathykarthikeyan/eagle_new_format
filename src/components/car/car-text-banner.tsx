'use client'

import { assets } from '@/assets'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function CarTextBanner() {
	const path = usePathname()

	useGSAP(() => {
		if (path === '/car-insurance/1') {
			gsap.from('.photoAnimation', { x: -80, opacity: 0, duration: 0.5 })
			gsap.to('.bannerTitle', {
				duration: 0.5,
				text: 'Hi! I’m Zada,Get your Quote within 1 minutes'
			})
			gsap.to('.bannerSubTitle', {
				duration: 0.5,
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
				delay: 0.5
			})
		} else if (path === '/car-insurance/details/customer-details') {
			gsap.from('.photoAnimation', { x: -80, opacity: 0, duration: 0.5 })
			gsap.to('.bannerTitle', {
				duration: 0.5,
				text: 'Please update your customer details within 2 min'
			})
			gsap.to('.bannerSubTitle', {
				duration: 0.5,
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
				delay: 0.5
			})
		} else if (path === '/car-insurance/details/vehicle-details') {
			gsap.from('.photoAnimation', { x: -80, opacity: 0, duration: 0.5 })
			gsap.to('.bannerTitle', {
				duration: 0.5,
				text: 'Please update your vehicle details within 3 min'
			})
			gsap.to('.bannerSubTitle', {
				duration: 0.5,
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
				delay: 0.5
			})
		} else if (path === '/car-insurance/premium') {
			gsap.from('.photoAnimation', { x: -80, opacity: 0, duration: 0.5 })
			gsap.to('.bannerTitle', {
				duration: 0.5,
				text: 'Select the Premium that fits your needs'
			})
			gsap.to('.bannerSubTitle', {
				duration: 0.5,
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
				delay: 0.5
			})
		}
	})

	return (
		<div className='photoAnimation flex w-full flex-row items-center justify-center gap-4 pt-10'>
			<div className='flex h-16 w-16 overflow-hidden rounded-full'>
				<Image
					alt='person'
					className='h-full w-full object-cover object-center'
					height={300}
					src={assets.images.person}
					width={300}
				/>
			</div>
			<div className='flex flex-col gap-2 rounded-t-3xl rounded-ee-3xl bg-white p-3 py-6 shadow-inputShadowDrop'>
				<h1 className='bannerTitle font-inter text-2xl font-bold text-blue-625'></h1>
				<h4 className='bannerSubTitle font-inter text-sm opacity-50'></h4>
			</div>
		</div>
	)
}
