'use client'

import { addNewCoverSectionTypes, type SectionDetails } from '@/redux/slices'
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import Image from 'next/image'
import { assets } from '@/assets'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGetItemValueMutation } from '@/redux/api/homeApi'
import { useEffect, useState } from 'react'
import { type getItemValueRequest } from '@/services/models/home.models'

type DomesticServantDetailsProps = {
	current: number
}

export function DomesticServantDetails(props: DomesticServantDetailsProps) {
	const appData = useAppSelector((state) => state.apps)
	const homeData = useAppSelector((state) => state.homeInsurance)

	const [getItemValue] = useGetItemValueMutation()
	const [domesticServantType, setDomesticServantType] = useState<
		{ value: string; label: string }[]
	>([])

	const dispatch = useAppDispatch()

	const [dsList, setDSList] = useState<SectionDetails[]>([])

	useEffect(() => {
		if (
			homeData.homeDetailsList[props.current].sectionType.some(
				(item) => item.SectionId === '106'
			)
		) {
			setDSList([
				...homeData.homeDetailsList[props.current].sectionType.filter(
					(item) => item.SectionId === '106'
				)
			])
		} else {
			setDSList([
				{
					SectionId: '106',
					RiskId: null,
					ServantCount: '',
					DomesticServantType: '',
					DomesticServentSi: '',
					sumInsured: ''
				}
			])
		}
	}, [props.current])

	const [isEmpty, setIsEmpty] = useState<boolean>(true)

	useEffect(() => {
		if (dsList.length !== 1) {
			const isEmpty = dsList.some(
				(item) =>
					item.sumInsured === '' ||
					item.DomesticServantType === '' ||
					item.ServantCount === ''
			)
			setIsEmpty(isEmpty)
		} else {
			setIsEmpty(
				dsList.length === 1 &&
					(dsList[0].sumInsured === '' ||
						dsList[0].DomesticServantType === '' ||
						dsList[0].ServantCount === '')
			)
		}
	}, [dsList])

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
			<div className='flex flex-row justify-between'>
				<h1 className='font-dmsan text-3xl font-bold'>Domestic Servant</h1>
				<Button
					variant='bluebtn'
					onClick={() => {
						setDSList((pre) => {
							return [
								...pre,
								{
									SectionId: '106',
									RiskId: null,
									ServantCount: '',
									DomesticServantType: '',
									DomesticServentSi: '',
									sumInsured: ''
								}
							]
						})
					}}>
					Add New
				</Button>
			</div>
			<p>We are committed to providing our customers with exceptional service.</p>

			{dsList.map((item, index) => {
				return (
					<div
						key={index}
						className='grid w-4/5 grid-cols-1 flex-wrap gap-2 rounded-xl border p-2 lg:grid-cols-3'>
						<Input
							placeholder='Sum Insured'
							value={item.DomesticServentSi}
							onChange={(e) => {
								setDSList((pre) => {
									const newData = [...pre]
									newData[index] = {
										...newData[index],
										DomesticServentSi: e.target.value,
										sumInsured: e.target.value
									}
									return newData
								})
							}}
						/>
						<Select
							value={item.DomesticServantType}
							onValueChange={(value) => {
								setDSList((pre) => {
									const newData = [...pre]
									newData[index] = {
										...newData[index],
										DomesticServantType: value
									}
									return newData
								})
							}}>
							<SelectTrigger className='w-full border border-gray-375 bg-gray-975'>
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
							placeholder='Servant Count'
							value={item.ServantCount}
							onChange={(e) => {
								setDSList((pre) => {
									const newData = [...pre]
									newData[index] = {
										...newData[index],
										ServantCount: e.target.value
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
							NewList: dsList,
							sectionId: '106'
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
				src={assets.images.coverPlan2}
				width={100}
			/>
		</div>
	)
}
