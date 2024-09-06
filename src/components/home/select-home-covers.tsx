'use client'

import { assets } from '@/assets'
import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateSingleAddressDetails } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button, Input } from '../ui'

export function SelectHomeCovers() {
	const homeData = useAppSelector((state) => state.homeInsurance)
	const [current, setCurrent] = useState<number>(0)
	const [detailsPart, setDetailsPart] = useState<number>(1)

	const dispatch = useAppDispatch()

	const [curDetails, setCurrentDetails] = useState({
		homeAddress: '',
		addressId: '',
		ownerOrTenet: '',
		sumInsured: '',
		contents: '',
		electricEquipement: '',
		personalAccident: ''
	})

	useEffect(() => {
		if (homeData.homeDetailsList.length !== 0) {
			setCurrentDetails({
				homeAddress: homeData.homeDetailsList[current].homeAddress,
				addressId: homeData.homeDetailsList[current].addressId,
				ownerOrTenet: homeData.homeDetailsList[current].ownerOrTenet,
				sumInsured: homeData.homeDetailsList[current].sumInsured,
				contents: homeData.homeDetailsList[current].contents,
				electricEquipement: homeData.homeDetailsList[current].electricEquipement,
				personalAccident: homeData.homeDetailsList[current].personalAccident
			})
		}
	}, [homeData, current])

	const detailsMenu = ['Buildings Details', 'Content Details']

	useGSAP(() => {
		gsap.from('.homeCovers', { y: 80, opacity: 0, duration: 0.8 })
	})

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
		<>
			{homeData.homeDetailsList.length !== 0 ? (
				<section className='flex w-full flex-col gap-10 px-4 py-10 font-roboto lg:px-32 lg:py-12'>
					<div className='homeCovers flex w-full flex-col items-center gap-4'>
						<h3 className='text-center text-3xl font-semibold text-gray-750'>
							Choose your Coverage Type
						</h3>
						<h5 className='text-center text-sm'>
							Aliquam lacinia diam quis lacus euismod
						</h5>
					</div>
					{/* <HomeCoverDetails homeCover={homeData.homeDetailsList} /> */}
					<div className='flex flex-row items-center justify-center gap-2'>
						<Image
							alt='cover'
							className='hidden lg:flex'
							height={200}
							src={assets.images.coverPlan}
							width={380}
						/>
						<div className='flex w-full flex-col gap-2'>
							<div className='flex flex-row gap-4'>
								{homeData.homeDetailsList[current].ownerOrTenet === 'Owner' ? (
									<>
										{detailsMenu.map((details, index) => {
											return (
												<div
													key={index}
													className={cn(
														'flex flex-row items-center gap-2 pb-4 text-sm font-medium text-gray-325',
														{
															'border-b border-gray-750 text-black':
																index + 1 === detailsPart
														}
													)}
													onClick={() => {
														if (detailsPart < index + 1) {
															setDetailsPart(index + 1)
														}
													}}>
													<h4 className='cursor-pointer'>{details}</h4>
												</div>
											)
										})}
									</>
								) : (
									<>
										{detailsMenu.slice(1).map((details, index) => {
											return (
												<div
													key={index}
													className={cn(
														'flex flex-row items-center gap-2 pb-4 text-sm font-medium text-gray-325',
														{
															'border-b border-gray-750 text-black':
																index + 1 === detailsPart
														}
													)}
													onClick={() => {
														if (detailsPart < index + 1) {
															setDetailsPart(index + 1)
														}
													}}>
													<h4 className='cursor-pointer'>{details}</h4>
												</div>
											)
										})}
									</>
								)}
							</div>
							<div className='flex w-full flex-row gap-4'>
								<Input
									className='w-full'
									placeholder='Sum Insured'
									value={curDetails.sumInsured}
									onChange={(e) => {
										updateDetails('sumInsured', e.target.value)
									}}
								/>
								<Input
									className='w-full'
									placeholder='Sum Insured'
									value={curDetails.contents}
									onChange={(e) => {
										updateDetails('contents', e.target.value)
									}}
								/>
							</div>
						</div>
					</div>
					<div className='grid w-full grid-cols-none gap-4 lg:grid-cols-2'>
						<div className='flex w-full flex-col gap-4'>
							<div className='relative flex flex-col gap-4 rounded-lg bg-[#E9F2FF] p-10'>
								<h1 className='font-dmsan text-3xl font-bold'>All Risk</h1>
								<p>
									We are committed to providing our customers with exceptional
									service.
								</p>
								<Input
									className='w-full lg:w-1/2'
									placeholder='Sum Insured'
									value={curDetails.sumInsured}
									onChange={(e) => {
										updateDetails('sumInsured', e.target.value)
									}}
								/>
								<Image
									alt='cover1'
									className='absolute -right-7 bottom-3'
									height={150}
									src={assets.images.coverPlan1}
									width={230}
								/>
							</div>
							<div className='relative flex flex-col gap-4 rounded-lg bg-[#FFE9F3] p-10'>
								<h1 className='font-dmsan text-3xl font-bold'>Personal Accident</h1>
								<p>
									We are committed to providing our customers with exceptional
									service.
								</p>
								<Input
									className='w-full lg:w-1/2'
									placeholder='Sum Insured'
									value={curDetails.sumInsured}
									onChange={(e) => {
										updateDetails('sumInsured', e.target.value)
									}}
								/>
								<Input
									className='w-full lg:w-1/2'
									placeholder='Sum Insured'
									value={curDetails.sumInsured}
									onChange={(e) => {
										updateDetails('sumInsured', e.target.value)
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
						</div>
						<div className='flex flex-col gap-4'>
							<div className='relative flex flex-col gap-4 rounded-lg bg-[#F3FFD2] p-10'>
								<h1 className='font-dmsan text-3xl font-bold'>Domestic Servant</h1>
								<p>
									We are committed to providing our customers with exceptional
									service.
								</p>
								<Input
									className='w-full lg:w-1/2'
									placeholder='Sum Insured'
									value={curDetails.sumInsured}
									onChange={(e) => {
										updateDetails('sumInsured', e.target.value)
									}}
								/>
								<Input
									className='w-full lg:w-1/2'
									placeholder='Sum Insured'
									value={curDetails.sumInsured}
									onChange={(e) => {
										updateDetails('sumInsured', e.target.value)
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
							<div className='relative flex flex-col gap-4 rounded-lg bg-[#DFDCFF] p-10'>
								<h1 className='font-dmsan text-3xl font-bold'>
									Personal Liability
								</h1>
								<p>
									We are committed to providing our customers with exceptional
									service.
								</p>
								<Input
									className='w-full lg:w-1/2'
									placeholder='Sum Insured'
									value={curDetails.sumInsured}
									onChange={(e) => {
										updateDetails('sumInsured', e.target.value)
									}}
								/>
								<Input
									className='w-full lg:w-1/2'
									placeholder='Sum Insured'
									value={curDetails.sumInsured}
									onChange={(e) => {
										updateDetails('sumInsured', e.target.value)
									}}
								/>
								<Image
									alt='cover1'
									className='absolute -right-6 bottom-3'
									height={150}
									src={assets.images.coverPlan4}
									width={200}
								/>
							</div>
						</div>
					</div>
					<div className='flex w-full flex-row flex-wrap justify-center gap-5'>
						<Button
							className='rounded-3xl lg:w-56'
							variant='outline'>
							Reset
						</Button>
						<Button
							className='rounded-3xl lg:w-56'
							variant='brightBlueBtn'>
							View Premium
						</Button>
						<Button
							className='rounded-3xl lg:w-56'
							variant='lightGreenBtn'
							onClick={() => {
								setCurrent((pre) => pre + 1)
							}}>
							Add Another Address
						</Button>
					</div>
				</section>
			) : (
				<></>
			)}
		</>
	)
}
