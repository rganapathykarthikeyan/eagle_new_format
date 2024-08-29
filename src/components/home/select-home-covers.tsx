'use client'

import { useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { HomeCoverDetails } from './home-cover-details'

export function SelectHomeCovers() {
	const homeData = useAppSelector((state) => state.homeInsurance)

	useGSAP(() => {
		gsap.from('.homeCovers', { y: 80, opacity: 0, duration: 0.8 })
	})

	return (
		<>
			{homeData.homeDetailsList.length !== 0 ? (
				<section className='flex w-full flex-col gap-10 px-4 py-10 font-jakarta lg:px-32 lg:py-12'>
					<div className='homeCovers flex w-full flex-col items-center gap-4'>
						<div className='flex flex-row -space-x-7'>
							<div className='h-10 w-10 rounded-full bg-black'></div>
							<div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg font-medium text-white'>
								2
							</div>
						</div>
						<h1 className='text-center font-inter text-2xl font-bold text-blue-825 lg:text-4xl'>
							Select your Cover
						</h1>
						<p className='w-4/5 text-center font-roboto text-xs text-gray-500 lg:text-sm'>
							Please fill the form below to receive a quote for your project. Feel
							free to add as much detail as needed.
						</p>
					</div>
					<HomeCoverDetails homeCover={homeData.homeDetailsList} />
				</section>
			) : (
				<></>
			)}
		</>
	)
}
