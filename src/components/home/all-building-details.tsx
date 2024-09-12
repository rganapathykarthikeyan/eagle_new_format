'use client'

import { assets } from '@/assets'
import { cn } from '@/lib'
import { useAppSelector } from '@/redux/hooks'
import { type EachHomeDetails } from '@/redux/slices'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type AllBuildingDetailsProps = {
	fieldName: keyof EachHomeDetails
	title: string
}

export function AllBuildingDetails(props: AllBuildingDetailsProps) {
	const homeData = useAppSelector((state) => state.homeInsurance)

	const [total, setTotal] = useState<number>(0)

	useEffect(() => {
		let fieldtotal = 0
		homeData.homeDetailsList.forEach((home) => {
			fieldtotal += +home[props.fieldName]
		})
		setTotal(fieldtotal)
	}, [])

	return (
		<div className='flex w-3/4 flex-col gap-2 rounded-xl bg-gray-925 px-4 shadow-homeDetailsContainerShadow'>
			<div className='flex w-full flex-row items-center justify-center gap-2 border-b border-gray-325'>
				<Image
					alt='homeImage'
					height={85}
					src={assets.images.homeImage}
					width={80}
				/>
				<h2 className='font-roboto text-2xl font-bold text-blue-300'>Premium Details</h2>
			</div>
			<div className='flex flex-col gap-2'>
				{homeData.homeDetailsList.map((home, index) => {
					return (
						<div
							key={index}
							className={cn('flex w-full flex-row justify-between p-2', {
								'border-b border-gray-450':
									index + 1 === homeData.homeDetailsList.length
							})}>
							<h4>
								{props.title} - {home.homeAddress}
							</h4>
							{/* <h4>{home[props.fieldName] === '' ? 0 : home[props.fieldName]}</h4> */}
						</div>
					)
				})}
				<div className='flex w-full flex-row justify-between p-2 font-bold'>
					<h4>Total</h4>
					<h4>{total}</h4>
				</div>
			</div>
		</div>
	)
}
