'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { type Cover, type CoverList } from './premium-page'
import { HelpCircle } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'

type PremiumDetailsDisplayProps = {
	benefitCoverList: CoverList
	optionalCoverList: CoverList
	addCover: (cover: Cover) => void
	removeCover: (cover: Cover) => void
	selectedCoverList: CoverList
}

export function AddonDetailsDisplay(props: PremiumDetailsDisplayProps) {
	const [type, setType] = useState<string>('Addon')

	return (
		<section className='flex w-full flex-col gap-4'>
			<div className='flex flex-col items-center justify-between gap-2'>
				<div className='font-dmserif text-xl'>Add on</div>
				<div className='w-3/4 border-2 border-blue-875'></div>
			</div>
			<div className='flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-825 p-5 shadow-premiumContainerShadow'>
				<Select
					value={type}
					onValueChange={(e) => {
						setType(e)
					}}>
					<SelectTrigger className='flex w-fit items-center gap-3 border-none font-sans text-lg font-semibold text-blue-875'>
						<SelectValue placeholder='Select Body Type' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Benefit'>Benefit Covers</SelectItem>
						<SelectItem value='Addon'>Addon Covers</SelectItem>
					</SelectContent>
				</Select>
				{type === 'Benefit' ? (
					<div className='flex w-full flex-col gap-4'>
						{props.benefitCoverList.map((benefit) => {
							return (
								<div
									key={benefit.CoverID}
									className='flex w-full flex-row items-center justify-between gap-4 font-dmsan'>
									{/* <Checkbox
										checked={props.selectedCoverList.includes(benefit)}
										id={benefit.CoverID}
										onCheckedChange={(checked) => {
											return checked
												? props.addCover(benefit)
												: props.removeCover(benefit)
										}}
									/> */}
									<div className='flex flex-grow items-start'>
										<span className='text-left font-semibold'>
											{benefit.CoverName}
										</span>
									</div>
									<HelpCircle
										color='black'
										size={24}
										strokeWidth={1}
									/>
								</div>
							)
						})}
					</div>
				) : (
					<div className='flex flex-col gap-4'>
						{props.optionalCoverList.map((optional) => {
							return (
								<div
									key={optional.CoverID}
									className='flex w-full flex-row items-center justify-between gap-4 font-dmsan'>
									<Checkbox
										checked={props.selectedCoverList.includes(optional)}
										id={optional.CoverID}
										onCheckedChange={(checked) => {
											return checked
												? props.addCover(optional)
												: props.removeCover(optional)
										}}
									/>
									<div className='flex flex-grow items-start'>
										<span className='text-left font-semibold'>
											{optional.CoverName}
										</span>
									</div>
									<h3 className='text-lg font-semibold text-blue-875'>
										{optional.PremiumAfterTax} MUR
									</h3>
								</div>
							)
						})}
					</div>
				)}
			</div>
		</section>
	)
}
