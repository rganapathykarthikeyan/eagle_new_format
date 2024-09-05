import { cn } from '@/lib'
import { updateSingleAddressDetails, type EachHomeDetails } from '@/redux/slices'
import { useEffect, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Button, Input } from '../ui'
import { assets } from '@/assets'
import { CoverContents } from './cover-contents'
import { useAppDispatch } from '@/redux/hooks'
import { useRouter } from 'next/navigation'

type HomeCoverDetailsProps = {
	homeCover: EachHomeDetails[]
}

type CoversListDisplay = {
	icon: string
	title: string
	suminsured: string
	fieldName: string
}

export function HomeCoverDetails(props: HomeCoverDetailsProps) {
	const [current, setCurrent] = useState<number>(0)

	const [curDetails, setCurrentDetails] = useState({
		homeAddress: props.homeCover[current].homeAddress,
		addressId: props.homeCover[current].addressId,
		ownerOrTenet: props.homeCover[current].ownerOrTenet,
		sumInsured: props.homeCover[current].sumInsured,
		contents: props.homeCover[current].contents,
		electricEquipement: props.homeCover[current].electricEquipement,
		personalAccident: props.homeCover[current].personalAccident
	})

	const [covers, setCovers] = useState<CoversListDisplay[]>([
		{
			icon: assets.icons.home,
			title: 'Building',
			suminsured: curDetails.sumInsured,
			fieldName: 'sumInsured'
		},
		{
			icon: assets.icons.insuranceCar,
			title: 'Contents',
			suminsured: curDetails.contents,
			fieldName: 'contents'
		},
		{
			icon: assets.icons.travelInsurance,
			title: 'Electronic Equipment',
			suminsured: curDetails.electricEquipement,
			fieldName: 'electricEquipement'
		},
		{
			icon: assets.icons.home,
			title: 'Personal Accident',
			suminsured: curDetails.personalAccident,
			fieldName: 'personalAccident'
		},
		{
			icon: assets.icons.home,
			title: 'Family Personal Accident',
			suminsured: curDetails.sumInsured,
			fieldName: 'sumInsured'
		},
		{
			icon: assets.icons.home,
			title: 'Family Personal Accident',
			suminsured: curDetails.sumInsured,
			fieldName: 'sumInsured'
		},
		{
			icon: assets.icons.home,
			title: 'Family Public liability',
			suminsured: curDetails.sumInsured,
			fieldName: 'sumInsured'
		}
	])

	const route = useRouter()

	const dispatch = useAppDispatch()

	useEffect(() => {
		setCurrentDetails({
			homeAddress: props.homeCover[current].homeAddress,
			addressId: props.homeCover[current].addressId,
			ownerOrTenet: props.homeCover[current].ownerOrTenet,
			sumInsured: props.homeCover[current].sumInsured,
			contents: props.homeCover[current].contents,
			electricEquipement: props.homeCover[current].electricEquipement,
			personalAccident: props.homeCover[current].personalAccident
		})
	}, [current])

	useEffect(() => {
		const newCovers = [
			{
				icon: assets.icons.home,
				title: 'Building',
				suminsured: curDetails.sumInsured,
				fieldName: 'sumInsured'
			},
			{
				icon: assets.icons.insuranceCar,
				title: 'Contents',
				suminsured: curDetails.contents,
				fieldName: 'contents'
			},
			{
				icon: assets.icons.travelInsurance,
				title: 'Electronic Equipment',
				suminsured: curDetails.electricEquipement,
				fieldName: 'electricEquipement'
			},
			{
				icon: assets.icons.home,
				title: 'Personal Accident',
				suminsured: curDetails.personalAccident,
				fieldName: 'personalAccident'
			},
			{
				icon: assets.icons.home,
				title: 'Family Personal Accident',
				suminsured: curDetails.sumInsured,
				fieldName: 'sumInsured'
			},
			{
				icon: assets.icons.home,
				title: 'Family Personal Accident',
				suminsured: curDetails.sumInsured,
				fieldName: 'sumInsured'
			},
			{
				icon: assets.icons.home,
				title: 'Family Public liability',
				suminsured: curDetails.sumInsured,
				fieldName: 'sumInsured'
			}
		]
		setCovers(newCovers)
	}, [curDetails])

	function updateDetails(fieldName: string, value: string) {
		setCurrentDetails({ ...curDetails, [fieldName]: value })
		dispatch(
			updateSingleAddressDetails({
				homeList: { ...curDetails, [fieldName]: value },
				index: current
			})
		)
	}

	return (
		<section
			className={cn('flex w-full flex-col gap-5', {
				'min-h-[50svh]': curDetails.ownerOrTenet === ''
			})}>
			<div className='flex w-full flex-row items-center justify-center gap-2 overflow-x-auto lg:w-3/4'>
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
			<div className='flex flex-col items-center gap-5'>
				<div className='flex w-full flex-col items-center justify-around gap-3 lg:flex-row'>
					<div className='flex flex-grow flex-col gap-2'>
						<h3 className='font-jakarta text-xl font-bold lg:text-3xl'>
							Are you Owner of the house?
						</h3>
						<h5 className='font-manrope text-sm font-medium text-gray-325 lg:text-lg'>
							Please select the owner or tenant and provide the details for the same.
						</h5>
					</div>
					<div className='flex flex-row items-center gap-2 text-lg font-medium lg:text-2xl'>
						<Checkbox
							checked={curDetails.ownerOrTenet === 'Owner'}
							id='owner'
							onCheckedChange={() => {
								updateDetails('ownerOrTenet', 'Owner')
							}}
						/>
						<label htmlFor='owner'>Yes, I&apos;m Owner</label>
					</div>
					<div className='flex flex-row items-center gap-2 text-lg font-medium lg:text-2xl'>
						<Checkbox
							checked={curDetails.ownerOrTenet === 'Tenant'}
							id='tenant'
							onCheckedChange={() => {
								updateDetails('ownerOrTenet', 'Tenant')
							}}
						/>
						<label htmlFor='tenant'>No, I&apos;m Tenant</label>
					</div>
				</div>
				{curDetails.ownerOrTenet === 'Owner' && (
					<div className='flex w-full flex-col items-center justify-center gap-3 lg:w-3/4 lg:flex-row'>
						<div className='flex w-full flex-row items-center justify-center gap-2 lg:w-1/2'>
							<div className='w-full text-xs lg:text-base'>
								Building Sum Insured<span className='text-red-500'>*</span>
							</div>
							<Input
								placeholder='Sum Insured'
								value={curDetails.sumInsured}
								onChange={(e) => {
									updateDetails('sumInsured', e.target.value)
								}}
							/>
						</div>
						<div className='flex w-full flex-row items-center justify-center gap-2 lg:w-1/2'>
							<div className='w-full text-xs lg:text-base'>
								Contents Sum Insured<span className='text-red-500'>*</span>
							</div>
							<Input
								placeholder='Contents Insured'
								value={curDetails.contents}
								onChange={(e) => {
									updateDetails('contents', e.target.value)
								}}
							/>
						</div>
					</div>
				)}
				{curDetails.ownerOrTenet === 'Tenant' && (
					<div className='flex w-full flex-row items-center justify-center gap-3 lg:w-3/4'>
						<div className='flex w-full flex-row items-center justify-center gap-2 lg:w-1/2'>
							<div className='w-full text-xs lg:text-base'>
								Contents Sum Insured<span className='text-red-500'>*</span>
							</div>
							<Input
								placeholder='Sum Insured'
								value={curDetails.contents}
								onChange={(e) => {
									updateDetails('contents', e.target.value)
								}}
							/>
						</div>
					</div>
				)}
				{curDetails.ownerOrTenet !== '' && (
					<>
						<div className='grid h-full w-full grid-cols-2 gap-6 lg:grid-cols-4'>
							{curDetails.ownerOrTenet === 'Tenant' ? (
								<>
									{covers.slice(1).map((cover, index) => {
										return (
											<CoverContents
												key={index}
												fieldName={cover.fieldName}
												icon={cover.icon}
												title={cover.title}
												updateDetails={updateDetails}
												value={cover.suminsured}
											/>
										)
									})}
								</>
							) : (
								covers.map((cover, index) => {
									return (
										<CoverContents
											key={index}
											fieldName={cover.fieldName}
											icon={cover.icon}
											title={cover.title}
											updateDetails={updateDetails}
											value={cover.suminsured}
										/>
									)
								})
							)}
						</div>

						<div className='flex w-full items-center justify-center'>
							<Button
								className='w-1/2'
								variant='greenbtn'
								onClick={() => {
									if (current < props.homeCover.length - 1) {
										setCurrent((pre) => pre + 1)
									} else {
										route.push('/home-insurance/details')
									}
								}}>
								Save and Continue
							</Button>
						</div>
					</>
				)}
			</div>
		</section>
	)
}
