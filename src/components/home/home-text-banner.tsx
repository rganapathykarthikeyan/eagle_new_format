'use client'

import { assets } from '@/assets'
import Image from 'next/image'

type HomeTextBannerProps = {
	title: string
	subtitle: string
}

export function HomeTextBanner(props: HomeTextBannerProps) {
	return (
		<div className='photoAnimation flex w-full flex-row items-center justify-center gap-4 pt-10'>
			<div className='flex h-12 w-20 overflow-hidden rounded-full md:h-16 md:w-16'>
				<Image
					alt='person'
					className='h-full w-full object-cover object-center'
					height={300}
					src={assets.images.person}
					width={300}
				/>
			</div>
			<div className='flex flex-col gap-2 rounded-t-3xl rounded-ee-3xl bg-white p-3 py-6 shadow-inputShadowDrop'>
				<h1 className='font-inter text-base font-bold text-blue-625 lg:text-2xl'>
					{props.title}
				</h1>
				<h4 className='font-inter text-xs opacity-50 lg:text-sm'>{props.subtitle}</h4>
			</div>
		</div>
	)
}
