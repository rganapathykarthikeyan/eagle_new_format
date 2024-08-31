'use client'

import { useAppSelector } from '@/redux/hooks'
import { Button, Input } from '../ui'
import { AllBuildingDetails } from './all-building-details'
import { useState } from 'react'
import { cn } from '@/lib'
import { Label } from '../ui/label'

type ContentDetailsProps = {
	goNext: () => void
}

export function ContentDetails(props: ContentDetailsProps) {
	const homeData = useAppSelector((state) => state.homeInsurance)

	const [current, setCurrent] = useState<number>(0)

	return (
		<section className='flex h-full w-full flex-row gap-2'>
			<div className='flex h-full w-1/2 flex-col items-end gap-2 px-4 py-3'>
				<AllBuildingDetails
					fieldName='contents'
					title='Content'
				/>
			</div>
			<div className='flex h-full w-full flex-col items-center justify-center px-4 py-3'>
				<div className='flex flex-row gap-3'>
					{homeData.homeDetailsList.map((house, index) => {
						return (
							<div
								key={index}
								className={cn(
									'cursor-pointer rounded-2xl border px-6 py-1 text-lg text-blue-875',
									{
										'bg-green-600 text-white': current === index
									}
								)}
								onClick={() => {
									if (current > index) {
										setCurrent(index)
									}
								}}>
								{house.homeAddress}
							</div>
						)
					})}
				</div>
				<div className='flex w-3/4 flex-col gap-10 py-5'>
					{homeData.homeDetailsList[current].ownerOrTenet === 'Owner' && (
						<div className='flex flex-col gap-1'>
							<Label>Sum Insured</Label>
							<Input
								placeholder='Content Sum Insured'
								value={homeData.homeDetailsList[current].contents}
							/>
						</div>
					)}
					<div className='flex w-full flex-row gap-5'>
						<div className='flex w-full flex-col gap-1'>
							<Label>Dwelling Type</Label>
							<Input placeholder='Content Dwelling Type' />
						</div>
						<div className='flex w-full flex-col gap-1'>
							<Label>Construction Type</Label>
							<Input placeholder='Content Construction Type' />
						</div>
					</div>
					<div className='flex w-full flex-row justify-center'>
						<Button
							className='w-1/2'
							variant='greenbtn'
							onClick={() => {
								if (current + 1 === homeData.homeDetailsList.length) {
									props.goNext()
								} else {
									setCurrent((prev) => prev + 1)
								}
							}}>
							Save
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
