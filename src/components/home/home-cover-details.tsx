import { cn } from '@/lib'
import { type EachHomeDetails } from '@/redux/slices'
import { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Button, Input } from '../ui'
import Image from 'next/image'
import { assets } from '@/assets'
import { ArrowRight, Check } from 'lucide-react'

type HomeCoverDetailsProps = {
	homeCover: EachHomeDetails[]
}

export function HomeCoverDetails(props: HomeCoverDetailsProps) {
	const [current, setCurrent] = useState<number>(0)

	const [curDetails, setCurrentDetails] = useState({
		homeAddress: props.homeCover[current].homeAddress,
		addressId: props.homeCover[current].addressId,
		ownerOrTenet: props.homeCover[current].ownerOrTenet,
		sumInsured: props.homeCover[current].sumInsured,
		constents: props.homeCover[current].constents,
		electricEquipement: props.homeCover[current].electricEquipement,
		personalAccident: props.homeCover[current].personalAccident
	})

	return (
		<section className='flex w-full flex-col gap-5'>
			<div className='flex w-full flex-row gap-2 overflow-x-auto'>
				{props.homeCover.map((cover, index) => {
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
							{cover.homeAddress}
						</div>
					)
				})}
			</div>
			<div className='flex flex-col gap-5'>
				<div className='flex w-full flex-row items-center justify-around gap-3'>
					<div className='flex flex-row items-center gap-2'>
						<Checkbox
							checked={curDetails.ownerOrTenet === 'Owner'}
							id='owner'
							onCheckedChange={() => {
								setCurrentDetails({ ...curDetails, ownerOrTenet: 'Owner' })
							}}
						/>
						<label htmlFor='owner'>Yes, I&apos;m Owner</label>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<Checkbox
							checked={curDetails.ownerOrTenet === 'Tenant'}
							id='tenant'
							onCheckedChange={() => {
								setCurrentDetails({ ...curDetails, ownerOrTenet: 'Tenant' })
							}}
						/>
						<label htmlFor='tenant'>No, I&apos;m Tenant</label>
					</div>
				</div>
				{curDetails.ownerOrTenet === 'Owner' && (
					<div className='flex w-full flex-row items-center justify-center'>
						<div className='flex w-full flex-row items-center gap-2 lg:w-1/2'>
							<div className='text-xs lg:w-48 lg:text-base'>
								Sum Insured<span className='text-red-500'>*</span>
							</div>
							<Input
								placeholder='Sum Insured'
								value={curDetails.sumInsured}
							/>
						</div>
					</div>
				)}
				<div className='flex h-full w-full flex-col items-stretch justify-between gap-6 lg:flex-row'>
					<div className='relative flex w-full flex-col items-center justify-between gap-3 overflow-hidden rounded-lg border border-green-600 bg-green-700 py-3'>
						<Image
							alt='home'
							height={54}
							src={assets.icons.home}
							width={54}
						/>
						<div className='flex flex-col items-center justify-between gap-1'>
							<span className='font-inter text-sm text-gray-325'>I want</span>
							<span className='font-inter text-lg font-medium'>Building</span>
						</div>
						<div className='flex flex-row items-start justify-start self-start px-2'>
							<span className='text-xs font-bold'>100000 ZMW</span>
						</div>
						<div className='absolute -bottom-6 -right-6 flex h-16 w-16 rounded-full bg-green-800'>
							<Check
								className='p-3'
								color='white'
								size={50}
							/>
						</div>
					</div>
					<div className='relative flex w-full flex-col items-center justify-between gap-3 overflow-hidden rounded-lg border border-green-600 bg-green-700 py-3'>
						<Image
							alt='home'
							height={54}
							src={assets.icons.insuranceCar}
							width={54}
						/>
						<div className='flex flex-col items-center justify-between gap-1'>
							<span className='font-inter text-sm text-gray-325'>I want</span>
							<span className='font-inter text-lg font-medium'>Contents</span>
						</div>
						<div className='flex flex-row items-start justify-start self-start px-2'>
							<span className='text-xs font-bold'>5000 ZMW</span>
						</div>
						<div className='absolute -bottom-6 -right-6 flex h-16 w-16 rounded-full bg-green-800'>
							<Check
								className='p-3'
								color='white'
								size={50}
							/>
						</div>
					</div>
					<div className='relative flex w-full flex-col items-center justify-between gap-3 overflow-hidden rounded-lg border border-green-600 bg-green-700 py-3'>
						<Image
							alt='home'
							height={54}
							src={assets.icons.travelInsurance}
							width={54}
						/>
						<div className='flex flex-col items-center justify-between gap-1'>
							<span className='font-inter text-sm text-gray-325'>I want</span>
							<span className='font-inter text-lg font-medium'>
								Electronic Equipment
							</span>
						</div>
						<div></div>
						<div className='absolute -bottom-6 -right-6 flex h-16 w-16 rounded-full bg-blue-825'>
							<ArrowRight
								className='p-3'
								color='white'
								size={50}
							/>
						</div>
					</div>
					<div className='relative flex w-full flex-col items-center justify-between gap-3 overflow-hidden rounded-lg border border-green-600 bg-green-700 py-3'>
						<Image
							alt='home'
							height={54}
							src={assets.icons.home}
							width={54}
						/>
						<div className='flex flex-col items-center justify-between gap-1'>
							<span className='font-inter text-sm text-gray-325'>I want</span>
							<span className='font-inter text-lg font-medium'>
								Personal Accident
							</span>
						</div>
						{/* <div className='flex flex-row items-start justify-start self-start px-2'>
							<span className='text-sm font-bold'>100000 ZMW</span>
						</div> */}
						<div></div>
						<div className='absolute -bottom-6 -right-6 flex h-16 w-16 rounded-full bg-blue-825'>
							<ArrowRight
								className='p-3'
								color='white'
								size={50}
							/>
						</div>
					</div>
				</div>
				<div className='flex w-full items-center justify-center'>
					<Button
						className='w-1/2'
						variant='greenbtn'
						onClick={() => {
							if (current < props.homeCover.length - 1) {
								setCurrent((pre) => pre + 1)
							}
						}}>
						Save and Continue
					</Button>
				</div>
			</div>
		</section>
	)
}
