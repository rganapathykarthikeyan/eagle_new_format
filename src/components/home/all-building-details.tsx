'use client'

import { assets } from '@/assets'
// import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image'

export function AllBuildingDetails() {
	// const homeData = useAppSelector((state) => state.homeInsurance)

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex flex-row gap-2'>
				<Image
					alt='homeImage'
					height={85}
					src={assets.images.homeImage}
					width={80}
				/>
				<h2>Premium Details</h2>
			</div>
			<div className='flex flex-col gap-3 shadow-detailsContainerShadow'></div>
		</div>
	)
}
