import { addNewCoverSectionTypes, type SectionDetails } from '@/redux/slices'
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import Image from 'next/image'
import { assets } from '@/assets'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGetItemValueMutation } from '@/redux/api/homeApi'
import { useEffect, useState } from 'react'
import { type getItemValueRequest } from '@/services/models/home.models'

type PersonalAccidentCoverType = {
	current: number
}

export function PersonalAccidentCover(props: PersonalAccidentCoverType) {
	const appData = useAppSelector((state) => state.apps)
	const homeData = useAppSelector((state) => state.homeInsurance)

	const [getItemValue] = useGetItemValueMutation()
	const [relationType, setRelationType] = useState<{ value: string; label: string }[]>([])

	const dispatch = useAppDispatch()

	const [paList, setPAList] = useState<SectionDetails[]>([])

	useEffect(() => {
		if (
			homeData.homeDetailsList[props.current].sectionType.some(
				(item) => item.SectionId === '138'
			)
		) {
			setPAList([
				...homeData.homeDetailsList[props.current].sectionType.filter(
					(item) => item.SectionId === '138'
				)
			])
		} else {
			setPAList([
				{
					SectionId: '138',
					RiskId: null,
					RelationType: '',
					PersonalAccidentSi: '',
					sumInsured: ''
				}
			])
		}
	}, [props.current])

	const [isEmpty, setIsEmpty] = useState<boolean>(true)

	useEffect(() => {
		if (paList.length !== 1) {
			const isEmpty = paList.some(
				(item) => item.sumInsured === '' || item.RelationType === ''
			)
			setIsEmpty(isEmpty)
		} else {
			setIsEmpty(
				paList.length === 1 &&
					(paList[0].sumInsured === '' || paList[0].RelationType === '')
			)
		}
	}, [paList])

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
			<div className='flex flex-row justify-between'>
				<h1 className='font-dmsan text-3xl font-bold'>Personal Accident</h1>
				<Button
					variant='bluebtn'
					onClick={() => {
						setPAList((pre) => {
							return [
								...pre,
								{
									SectionId: '138',
									RiskId: null,
									RelationType: '',
									PersonalAccidentSi: '',
									sumInsured: ''
								}
							]
						})
					}}>
					Add New
				</Button>
			</div>
			<p>We are committed to providing our customers with exceptional service.</p>

			{paList.map((pa, index) => {
				return (
					<div
						key={index}
						className='w--full flex flex-row gap-2 lg:w-3/4'>
						<Select
							value={pa.RelationType}
							onValueChange={(value) => {
								setPAList((pre) => {
									const newData = [...pre]
									newData[index] = {
										...newData[index],
										RelationType: value
									}
									return newData
								})
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
							value={pa.PersonalAccidentSi}
							onChange={(e) => {
								setPAList((pre) => {
									const newData = [...pre]
									newData[index] = {
										...newData[index],
										PersonalAccidentSi: e.target.value,
										sumInsured: e.target.value
									}
									return newData
								})
							}}
						/>
					</div>
				)
			})}

			<Button
				className='w-1/2'
				disabled={isEmpty}
				variant='bluebtn'
				onClick={() => {
					dispatch(
						addNewCoverSectionTypes({
							index: props.current,
							NewList: paList,
							sectionId: '138'
						})
					)
					setIsEmpty(true)
				}}>
				Save
			</Button>
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
