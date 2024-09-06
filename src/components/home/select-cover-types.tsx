'use client'

import { cn, coverTypesHome } from '@/lib'
import { useAppSelector } from '@/redux/hooks'
import { Check, MoveUpRight, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../ui'

export function SelectCoverTypes() {
	const homeData = useAppSelector((state) => state.homeInsurance)

	const [coverType, selectCoverType] = useState<number>(1)

	return (
		<>
			{homeData.homeDetailsList.length !== 0 && (
				<>
					<section className='flex w-full flex-col items-center justify-center gap-2'>
						<h3 className='text-center text-3xl font-semibold text-gray-750'>
							Choose your Cover Type
						</h3>
						<h5 className='text-sm'>Aliquam lacinia diam quis lacus euismod</h5>
						<div className='grid w-3/4 grid-cols-none grid-rows-3 gap-2 lg:w-3/4 lg:grid-cols-3 lg:grid-rows-none'>
							{coverTypesHome.map((cover, index) => {
								return (
									<div
										key={index}
										className={cn(
											'flex w-full flex-col items-center justify-center gap-5 py-10',
											{
												'shadow-homeCoverTypeShadow':
													coverType === index + 1
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
												coverType === index + 1
													? 'lightGreenBtn'
													: 'whiteBlackOutlined'
											}
											onClick={() => {
												selectCoverType(index + 1)
											}}>
											<div className='flex w-full flex-row items-center justify-center gap-2'>
												<span className='flex-grow'>
													{coverType === index + 1 ? 'Selected' : 'Add'}
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
					</section>
				</>
			)}
		</>
	)
}
