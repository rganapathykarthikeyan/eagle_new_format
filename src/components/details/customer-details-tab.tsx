'use client'

import { cn } from '@/lib'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function CustomerDetailsTab() {
	const path = usePathname()
	// const total = useAppSelector((state) => state.premiummotor.TotalPremium)
	// const vehicleData = useAppSelector((state) => state.carInsurance)
	// const Reference = useAppSelector((state) => state.motor.RequestReferenceNo)

	const route = useRouter()

	const [current, setCurrent] = useState<number>(1)

	useEffect(() => {
		if (path === '/car-insurance/details/customer-details') {
			setCurrent(1)
		} else if (path === '/car-insurance/details/vehicle-details') {
			setCurrent(2)
		} else if (path === '/car-insurance/details/driver-details') {
			setCurrent(3)
		} else if (path === '/car-insurance/details/upload-details') {
			setCurrent(4)
		} else if (path === '/car-insurance/payment') {
			setCurrent(5)
		}
	}, [path])

	return (
		<div className='flex w-full flex-col rounded-3xl bg-gradient-to-r from-blue-950 to-blue-975 px-1 font-sans font-semibold lg:w-3/4 lg:px-8'>
			<div className='flex w-full items-center justify-center p-4 text-center font-inter text-base font-bold text-white lg:text-3xl'>
				<span>
					{path === '/car-insurance/details/customer-details' &&
						'Please provide your customer details within 3 min'}
					{path === '/car-insurance/details/vehicle-details' &&
						'Please provide your Vehicle details within 3 min'}
					{path === '/car-insurance/details/driver-details' &&
						'Please provide your Driver details within 3 min'}
					{path === '/car-insurance/details/upload-details' &&
						'Please upload your Documents within 3 min'}
					{path === '/car-insurance/payment' &&
						'Please confirm your details and proceed with payment'}
				</span>
			</div>
			<div className='flex flex-row flex-wrap justify-around gap-4 rounded-xl border border-gray-900 p-1 lg:gap-10'>
				<span className='flex flex-col font-jakarta text-sm text-white lg:text-lg'>
					<span className='text-xs font-medium lg:text-sm'>Ref.No : </span>EAG-MOT-06063
					{/* {Reference} */}
				</span>
				<span className='flex flex-col font-jakarta text-sm text-white lg:text-lg'>
					<span className='text-xs font-medium lg:text-sm'>Make :</span> AUDI
					{/* {vehicleData.mark} */}
				</span>
				<span className='flex flex-col font-jakarta text-sm text-white lg:text-lg'>
					<span className='text-xs font-medium lg:text-sm'>Model : </span>A3 AUTO
					{/* {vehicleData.model} */}
				</span>
				<span className='flex flex-col font-jakarta text-sm text-white lg:text-lg'>
					<span className='text-xs font-medium lg:text-sm'>Policy Days Count :</span> 365
					days
				</span>
				<span className='flex flex-col font-jakarta text-sm text-white lg:text-lg'>
					<span className='text-xs font-medium lg:text-sm'>Total Premium : </span>10801
					MUR
					{/* {total} */}
				</span>
			</div>
			<div className='flex w-full flex-row items-end justify-around gap-2 overflow-x-auto lg:gap-4'>
				<div className='flex h-full flex-col items-center justify-end p-1 pb-0 lg:p-6 lg:pb-0'>
					{/* <p className='rounded-3xl bg-white p-2 text-xs text-red-500'>3 min</p> */}
					<h4
						className={cn('cursor-pointer p-1 text-xs text-white lg:p-2 lg:text-sm', {
							'rounded-t-2xl bg-white text-black':
								path === '/car-insurance/details/customer-details'
						})}
						onClick={() => {
							if (current > 1) {
								route.push('/car-insurance/details/customer-details')
							}
						}}>
						Customer Info
					</h4>
				</div>
				<div className='flex h-full flex-col items-center justify-end p-1 pb-0 lg:p-6 lg:pb-0'>
					{/* <p className='rounded-3xl bg-white p-2 text-xs text-red-500'>3 min</p> */}
					<h4
						className={cn('cursor-pointer p-1 text-xs text-white lg:p-2 lg:text-sm', {
							'rounded-t-2xl bg-white text-black':
								path === '/car-insurance/details/vehicle-details'
						})}
						onClick={() => {
							if (current > 2) {
								route.push('/car-insurance/details/vehicle-details')
							}
						}}>
						Vehicle Details
					</h4>
				</div>
				<div className='flex h-full flex-col items-center justify-end p-1 pb-0 lg:p-6 lg:pb-0'>
					{/* <p className='rounded-3xl bg-white p-2 text-xs text-red-500'>3 min</p> */}
					<h4
						className={cn('cursor-pointer p-1 text-xs text-white lg:p-2 lg:text-sm', {
							'rounded-t-2xl bg-white text-black':
								path === '/car-insurance/details/driver-details'
						})}
						onClick={() => {
							if (current > 3) {
								route.push('/car-insurance/details/driver-details')
							}
						}}>
						Driver Details
					</h4>
				</div>
				<div className='flex h-full flex-col items-center justify-end p-1 pb-0 lg:p-6 lg:pb-0'>
					{/* <p className='rounded-3xl bg-white p-2 text-xs text-red-500'>3 min</p> */}
					<h4
						className={cn('cursor-pointer p-1 text-xs text-white lg:p-2 lg:text-sm', {
							'rounded-t-2xl bg-white text-black':
								path === '/car-insurance/details/upload-details'
						})}
						onClick={() => {
							if (current > 4) {
								route.push('/car-insurance/details/upload-details')
							}
						}}>
						Upload Documents
					</h4>
				</div>
				<div className='flex h-full flex-col items-center justify-end p-1 pb-0 lg:p-6 lg:pb-0'>
					{/* <p className='rounded-3xl bg-white p-2 text-xs text-red-500'>3 min</p> */}
					<h4
						className={cn('cursor-pointer p-1 text-xs text-white lg:p-2 lg:text-sm', {
							'rounded-t-2xl bg-white text-black': path === '/car-insurance/payment'
						})}>
						Payment Method
					</h4>
				</div>
			</div>
		</div>
	)
}
