import { type EachHomeDetails, type SectionDetails } from '@/redux/slices'
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import Image from 'next/image'
import { assets } from '@/assets'
import { useAppSelector } from '@/redux/hooks'
import { useGetItemValueMutation } from '@/redux/api/homeApi'
import { useEffect, useState } from 'react'
import { type getItemValueRequest } from '@/services/models/home.models'

type PersonalAccidentCoverProps = {
	curDetails: EachHomeDetails
	updateSectionDetails: (
		fieldName: keyof SectionDetails,
		value: string,
		sectionId: string
	) => void
}

export function PersonalAccidentCover(props: PersonalAccidentCoverProps) {
	const appData = useAppSelector((state) => state.apps)

	const [getItemValue] = useGetItemValueMutation()
	const [relationType, setRelationType] = useState<{ value: string; label: string }[]>([])

	useEffect(() => {
		if (appData.token !== '') {
			const req: getItemValueRequest = {
				InsuranceId: appData.insuranceID,
				ItemType: 'RELATION_TYPE_HOME'
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
					setRelationType(tempArr)
				}
			})
		}
	}, [appData.insuranceID, getItemValue])

	return (
		<div className='relative flex flex-col gap-4 rounded-lg bg-[#FFE9F3] p-10'>
			<h1 className='font-dmsan text-3xl font-bold'>Personal Accident</h1>
			<p>We are committed to providing our customers with exceptional service.</p>
			<Select
				value={props.curDetails.RelationType}
				onValueChange={(value) => {
					props.updateSectionDetails('RelationType', value, '138')
				}}>
				<SelectTrigger className='w-full border border-gray-375 bg-gray-975 lg:w-1/2'>
					<SelectValue placeholder='Relation Type' />
				</SelectTrigger>
				<SelectContent>
					{relationType.map((type, index) => {
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
				placeholder='Sum Insured'
				value={props.curDetails.PersonalAccidentSi}
				onChange={(e) => {
					props.updateSectionDetails('PersonalAccidentSi', e.target.value, '138')
				}}
			/>

			<Image
				alt='cover1'
				className='absolute bottom-3 right-6'
				height={100}
				src={assets.images.coverPlan3}
				width={100}
			/>
		</div>
	)
}
