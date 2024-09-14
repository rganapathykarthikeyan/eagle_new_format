'use client'

import { type EachHomeDetails, type SectionDetails } from '@/redux/slices'
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import Image from 'next/image'
import { assets } from '@/assets'
import { useAppSelector } from '@/redux/hooks'
import { useGetItemValueMutation } from '@/redux/api/homeApi'
import { useEffect, useState } from 'react'
import { type getItemValueRequest } from '@/services/models/home.models'

type DomesticServantDetailsProps = {
	curDetails: EachHomeDetails
	updateSectionDetails: (
		fieldName: keyof SectionDetails,
		value: string,
		sectionId: string
	) => void
}

export function DomesticServantDetails(props: DomesticServantDetailsProps) {
	const appData = useAppSelector((state) => state.apps)

	const [getItemValue] = useGetItemValueMutation()
	const [domesticServantType, setDomesticServantType] = useState<
		{ value: string; label: string }[]
	>([])

	useEffect(() => {
		if (appData.token !== '') {
			const req: getItemValueRequest = {
				InsuranceId: appData.insuranceID,
				ItemType: 'Servant TYPE'
			}
			const tempArr: { value: string; label: string }[] = []
			const res = getItemValue(req)
			res.then((value) => {
				if (value.data?.type === 'success' && value.data.data) {
					value.data.data!.Result.map((value) => {
						tempArr.push({
							value: value.Code,
							label: value.CodeDesc
						})
					})
					setDomesticServantType(tempArr)
				}
			})
		}
	}, [appData.insuranceID, getItemValue])

	return (
		<div className='relative flex flex-col gap-4 rounded-lg bg-[#F3FFD2] p-10'>
			<h1 className='font-dmsan text-3xl font-bold'>Domestic Servant</h1>
			<p>We are committed to providing our customers with exceptional service.</p>
			<Input
				className='w-full lg:w-1/2'
				placeholder='Sum Insured'
				value={props.curDetails.DomesticServentSi}
				onChange={(e) => {
					props.updateSectionDetails('DomesticServentSi', e.target.value, '106')
				}}
			/>
			<Select
				value={props.curDetails.DomesticServantType}
				onValueChange={(value) => {
					props.updateSectionDetails('DomesticServantType', value, '106')
				}}>
				<SelectTrigger className='w-full border border-gray-375 bg-gray-975 lg:w-1/2'>
					<SelectValue placeholder='Servant Type' />
				</SelectTrigger>
				<SelectContent>
					{domesticServantType.map((type, index) => {
						return (
							<SelectItem
								key={index}
								value={type.value}>
								{type.label}
							</SelectItem>
						)
					})}
				</SelectContent>
			</Select>
			<Input
				className='w-full lg:w-1/2'
				placeholder='Servant Count'
				value={props.curDetails.ServantCount}
				onChange={(e) => {
					props.updateSectionDetails('ServantCount', e.target.value, '106')
				}}
			/>
			<Image
				alt='cover1'
				className='absolute bottom-3 right-6'
				height={100}
				src={assets.images.coverPlan2}
				width={100}
			/>
		</div>
	)
}
