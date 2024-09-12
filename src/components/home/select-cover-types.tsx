'use client'

import { cn, coverTypesHome } from '@/lib'
import { useAppSelector } from '@/redux/hooks'
import { Check, MoveUpRight, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui'

type SelectCoverTypesProps = {
	current: number
	updateDetails: (fieldName: string, value: string) => void
	coverType: number
	selectCoverType: (index: number) => void
	ownerOrTenant: string
}

export function SelectCoverTypes(props: SelectCoverTypesProps) {
	const homeData = useAppSelector((state) => state.homeInsurance)

	return (
		<>
			{homeData.homeDetailsList.length !== 0 && (
				<>
					<section className='flex w-full flex-col items-center justify-center gap-2'>
						<h3 className='text-center text-3xl font-semibold text-gray-750'>
							Choose your Cover Type
						</h3>
						<h5 className='text-sm'>Aliquam lacinia diam quis lacus euismod</h5>
						<h5 className='text-blue-425 text-sm'>
							Address: {homeData.homeDetailsList[props.current].homeAddress}
						</h5>
						{props.ownerOrTenant === 'Owner' && (
							<div className='grid w-3/4 grid-cols-none grid-rows-3 gap-2 lg:w-3/4 lg:grid-cols-3 lg:grid-rows-none'>
								{coverTypesHome.map((cover, index) => {
									return (
										<div
											key={index}
											className={cn(
												'flex w-full flex-col items-center justify-center gap-5 py-10',
												{
													'shadow-homeCoverTypeShadow':
														props.coverType === index + 1
												}
											)}>
											<Image
												alt={cover.title}
												height={150}
												src={cover.image}
												width={150}
											/>
											<h2 className='text-xl font-semibold'>{cover.title}</h2>
											<div className='grid w-full grid-cols-2 items-center justify-between'>
												<div className='flex flex-row justify-center gap-2'>
													{cover.Building1 ? <Check /> : <X />}
													Building
												</div>
												<div className='flex flex-row justify-center gap-2'>
													{cover.Building2 ? <Check /> : <X />}
													Building
												</div>
												<div className='flex flex-row justify-center gap-2'>
													{cover.Content ? <Check /> : <X />}
													Content
												</div>
												<div className='flex flex-row justify-center gap-2'>
													{cover.Building ? <Check /> : <X />}
													Building
												</div>
												<div className='flex flex-row justify-center gap-2'>
													{cover.Content1 ? <Check /> : <X />}
													Content
												</div>
												<div className='flex flex-row justify-center gap-2'>
													{cover.Content2 ? <Check /> : <X />}
													Content
												</div>
											</div>
											<Button
												className='w-36'
												variant={
													props.coverType === index + 1
														? 'lightGreenBtn'
														: 'whiteBlackOutlined'
												}
												onClick={() => {
													props.selectCoverType(index + 1)
													props.updateDetails(
														'coverType',
														cover.coverType
													)
												}}>
												<div className='flex w-full flex-row items-center justify-center gap-2'>
													<span className='flex-grow'>
														{props.coverType === index + 1
															? 'Selected'
															: 'Add'}
													</span>
													<MoveUpRight
														className=''
														size={16}
													/>
												</div>
											</Button>
										</div>
									)
								})}
							</div>
						)}
						{props.ownerOrTenant === 'Tenant' && (
							<div className='grid w-3/4 grid-cols-none grid-rows-3 gap-2 lg:w-3/4 lg:grid-cols-3 lg:grid-rows-none'>
								{coverTypesHome.slice(2).map((cover, index) => {
									return (
										<div
											key={index}
											className={cn(
												'flex w-full flex-col items-center justify-center gap-5 py-10',
												{
													'shadow-homeCoverTypeShadow':
														props.coverType === 3
												}
											)}>
											<Image
												alt={cover.title}
												height={150}
												src={cover.image}
												width={150}
											/>
											<h2 className='text-xl font-semibold'>{cover.title}</h2>
											<div className='grid w-full grid-cols-2 items-center justify-between'>
												<div className='flex flex-row justify-center gap-2'>
													{cover.Building1 ? <Check /> : <X />}
													Building
												</div>
												<div className='flex flex-row justify-center gap-2'>
													{cover.Building2 ? <Check /> : <X />}
													Building
												</div>
												<div className='flex flex-row justify-center gap-2'>
													{cover.Content ? <Check /> : <X />}
													Content
												</div>
												<div className='flex flex-row justify-center gap-2'>
													{cover.Building ? <Check /> : <X />}
													Building
												</div>
												<div className='flex flex-row justify-center gap-2'>
													{cover.Content1 ? <Check /> : <X />}
													Content
												</div>
												<div className='flex flex-row justify-center gap-2'>
													{cover.Content2 ? <Check /> : <X />}
													Content
												</div>
											</div>
											<Button
												className='w-36'
												variant={
													props.coverType === 3
														? 'lightGreenBtn'
														: 'whiteBlackOutlined'
												}
												onClick={() => {
													props.selectCoverType(3)
													props.updateDetails(
														'coverType',
														cover.coverType
													)
												}}>
												<div className='flex w-full flex-row items-center justify-center gap-2'>
													<span className='flex-grow'>
														{props.coverType === 3 ? 'Selected' : 'Add'}
													</span>
													<MoveUpRight
														className=''
														size={16}
													/>
												</div>
											</Button>
										</div>
									)
								})}
							</div>
						)}
					</section>
				</>
			)}
		</>
	)
}
