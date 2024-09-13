'use client'

import { assets } from '@/assets'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
	type EachHomeDetails,
	type SectionDetails,
	updateSingleAddressDetails
} from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button, Input } from '../ui'
// import { useRouter } from 'next/navigation'
import { SelectCoverTypes } from './select-cover-types'
import { DetailsTab } from './details-tab'
import { formatDateDDMMYYYY, formatDateDDMMYYYYNextYear, isKeyOfEachHomeDetails } from '@/lib'
import { HomeCustomerPopUp } from './home-customer-popup'
import {
	type locationListHome,
	type SaveNonMotorDetailRequest
} from '@/services/models/home.models'
import { useSaveNonMotorDetailsMutation } from '@/redux/api/homeApi'
import { useToast } from '../ui/use-toast'
import ClipLoader from 'react-spinners/ClipLoader'

export function SelectHomeCovers() {
	const homeData = useAppSelector((state) => state.homeInsurance)
	const [current, setCurrent] = useState<number>(0)
	const [detailsPart, setDetailsPart] = useState<number>(1)

	const customerReferenceNo = useAppSelector((state) => state.nonmotor.CustomerReferenceNo)
	const customerData = useAppSelector((state) => state.customerDetails)
	const appData = useAppSelector((state) => state.apps)

	const [showTabType, setShowTabType] = useState<number>(0)

	const [coverType, selectCoverType] = useState<number>(0)

	const [openCustomerDialog, setOpenCustomerDialog] = useState<boolean>(false)

	// const route = useRouter()

	const { toast } = useToast()

	const [IsNonMotorLoading, setIsNonMotorLoading] = useState<boolean>(false)

	function setCustomerDialog() {
		setOpenCustomerDialog((pre) => !pre)
	}

	const [saveNonMotorDetails] = useSaveNonMotorDetailsMutation()

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (homeData.homeDetailsList.length !== 0) {
			if (homeData.homeDetailsList[current].coverType !== '') {
				selectCoverType(+homeData.homeDetailsList[current].coverType)
			} else {
				selectCoverType(0)
			}
		}
	}, [current])

	const [curDetails, setCurrentDetails] = useState<EachHomeDetails>({
		homeAddress: '',
		addressId: '',
		ownerOrTenet: '',
		BuildingSumInsured: '',
		ContentSuminsured: '',
		DomesticServentSi: '',
		PersonalLiabilitySi: '',
		allRiskSumInsured: '',
		electricEquipement: '',
		PersonalAccidentSi: '',
		coverType: '',
		sectionType: []
	})

	useEffect(() => {
		if (homeData.homeDetailsList.length !== 0) {
			setCurrentDetails({
				homeAddress: homeData.homeDetailsList[current].homeAddress,
				addressId: homeData.homeDetailsList[current].addressId,
				ownerOrTenet: homeData.homeDetailsList[current].ownerOrTenet,
				BuildingSumInsured: homeData.homeDetailsList[current].BuildingSumInsured,
				ContentSuminsured: homeData.homeDetailsList[current].ContentSuminsured,
				electricEquipement: homeData.homeDetailsList[current].electricEquipement,
				allRiskSumInsured: homeData.homeDetailsList[current].allRiskSumInsured,
				PersonalAccidentSi: homeData.homeDetailsList[current].PersonalAccidentSi,
				coverType: homeData.homeDetailsList[current].coverType,
				sectionType: homeData.homeDetailsList[current].sectionType,
				DomesticServentSi: homeData.homeDetailsList[current].DomesticServentSi,
				PersonalLiabilitySi: homeData.homeDetailsList[current].PersonalLiabilitySi
			})
		}
	}, [homeData, current])

	useEffect(() => {
		if (customerReferenceNo !== '') {
			setOpenCustomerDialog(false)
		}
	}, [customerReferenceNo])

	function saveNonMotor() {
		setIsNonMotorLoading(true)
		const locationList: locationListHome = []
		homeData.homeDetailsList.map((address, index) => {
			locationList.push({
				LocationId: String(index + 1),
				LocationName: address.homeAddress,
				SectionList: address.sectionType,
				CommonError: false
			})
		})
		const request: SaveNonMotorDetailRequest = {
			PolicyDetails: {
				SaveOrSubmit: 'Submit',
				AcexecutiveId: '',
				ProductType: null,
				TiraCoverNoteNo: null,
				CustomerReferenceNo: customerReferenceNo,
				RequestReferenceNo: null,
				BuildingOwnerYn: 'N',
				Createdby: appData.loginId,
				Currency: 'MUR',
				ExchangeRate: '1.0',
				Havepromocode: 'N',
				PolicyEndDate: formatDateDDMMYYYYNextYear(new Date()),
				PolicyStartDate: formatDateDDMMYYYY(new Date()),
				IndustryId: '99999',
				InsuranceId: appData.insuranceID,
				ProductId: '63',
				BranchCode: appData.branchCode
			},
			BrokerDetails: {
				CustomerCode: appData.CustomerCode,
				CustomerName: customerData.name,
				BdmCode: appData.CustomerCode,
				BrokerCode: null,
				LoginId: appData.loginId,
				ApplicationId: '1',
				AgencyCode: appData.agencyCode,
				BrokerBranchCode: '1',
				SourceTypeId: null,
				UserType: 'Broker'
			},
			EndorsementDetails: {
				EndorsementDate: null,
				EndorsementEffectiveDate: null,
				EndorsementRemarks: null,
				EndorsementType: null,
				EndorsementTypeDesc: null,
				EndtCategoryDesc: null,
				EndtCount: null,
				EndtPrevPolicyNo: null,
				EndtPrevQuoteNo: null,
				EndtStatus: null,
				IsFinanceEndt: null,
				OrginalPolicyNo: null,
				PolicyNo: null
			},
			LocationList: locationList
		}
		const res = saveNonMotorDetails(request)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError !== true &&
				value.data.data.Result !== null
			) {
				// dispatch(updatePremium(true))
				// if (value.data.data.Result.length === 1) {
				// 	dispatch(updateDetails(value.data.data.Result[0]))
				// } else {
				// 	dispatch(updateCoversList(value.data.data.Result))
				// }
				// setIsNonMotorLoading(false)
			} else if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError === true &&
				value.data.data.ErrorMessage !== null &&
				value.data.data.ErrorMessage.length !== 0
			) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: value.data.data.ErrorMessage[0].Message
				})
			} else {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'There was a problem with your request.'
				})
			}

			setIsNonMotorLoading(false)
		})
	}

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

	function updateSectionDetails(
		fieldName: keyof SectionDetails,
		value: string,
		sectionId: string
	) {
		const curSection = curDetails.sectionType

		const pos = curSection.findIndex((item) => {
			return item.SectionId === sectionId
		})

		// console.log(
		// 	fieldName,
		// 	pos,
		// 	sectionId,
		// 	isKeyOfEachHomeDetails(fieldName),
		// 	curSection,
		// 	curDetails
		// )

		if (pos !== -1) {
			const newData = [...curSection]
			newData[pos] = { ...newData[pos], [fieldName]: value }

			if (isKeyOfEachHomeDetails(fieldName)) {
				const updatedDetails = {
					...curDetails,
					[fieldName]: value,
					sectionType: newData
				}
				setCurrentDetails(updatedDetails)
				dispatch(
					updateSingleAddressDetails({
						homeList: updatedDetails,
						index: current
					})
				)
			} else {
				const updatedDetails = { ...curDetails, sectionType: curSection }
				setCurrentDetails(updatedDetails)
				dispatch(
					updateSingleAddressDetails({
						homeList: updatedDetails,
						index: current
					})
				)
			}
		} else {
			const newDetails: SectionDetails = { SectionId: sectionId, RiskId: null }

			newDetails[fieldName] = value

			if (isKeyOfEachHomeDetails(fieldName)) {
				setCurrentDetails({
					...curDetails,
					[fieldName]: value,
					sectionType: [...curSection, newDetails]
				})
				dispatch(
					updateSingleAddressDetails({
						homeList: {
							...curDetails,
							[fieldName]: value,
							sectionType: [...curSection, newDetails]
						},
						index: current
					})
				)
			} else {
				setCurrentDetails({ ...curDetails, sectionType: [...curSection, newDetails] })
				dispatch(
					updateSingleAddressDetails({
						homeList: { ...curDetails, sectionType: [...curSection, newDetails] },
						index: current
					})
				)
			}
		}
	}

	function updateDetailsPart(index: number) {
		setDetailsPart(index + 1)
	}

	useEffect(() => {
		if (
			homeData.homeDetailsList.length !== 0 &&
			current + 1 <= homeData.homeDetailsList.length
		) {
			if (
				homeData.homeDetailsList[current].ownerOrTenet === 'Owner' &&
				homeData.homeDetailsList[current].coverType === '1'
			) {
				setShowTabType(1)
			} else if (
				homeData.homeDetailsList[current].ownerOrTenet === 'Owner' &&
				homeData.homeDetailsList[current].coverType === '2'
			) {
				setShowTabType(2)
			} else if (homeData.homeDetailsList[current].coverType !== '') {
				setShowTabType(3)
			} else {
				setShowTabType(0)
			}
		}
	}, [current, homeData])

	function changeCoverType(index: number) {
		selectCoverType(index)
	}

	return (
		<>
			{homeData.homeDetailsList.length !== 0 && (
				<SelectCoverTypes
					coverType={coverType}
					current={current}
					ownerOrTenant={homeData.homeDetailsList[current].ownerOrTenet}
					selectCoverType={changeCoverType}
					updateDetails={updateDetails}
				/>
			)}
			{homeData.homeDetailsList.length !== 0 && showTabType !== 0 && coverType !== 0 ? (
				<section className='flex w-full flex-col gap-10 px-4 py-10 font-roboto lg:px-32 lg:py-12'>
					<div className='homeCovers flex w-full flex-col items-center gap-4'>
						<h3 className='text-center text-3xl font-semibold text-gray-750'>
							Choose your Coverage Type
						</h3>
						<h5 className='text-center text-sm'>
							Aliquam lacinia diam quis lacus euismod
						</h5>
						<h5 className='text-sm text-blue-425'>
							Address: {homeData.homeDetailsList[current].homeAddress}
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
								{showTabType === 1 ? (
									<DetailsTab
										details={['Buildings Details', 'Content Details']}
										detailsPart={detailsPart}
										updateDetailsPart={updateDetailsPart}
									/>
								) : showTabType === 2 ? (
									<DetailsTab
										details={['Buildings Details']}
										detailsPart={detailsPart}
										updateDetailsPart={updateDetailsPart}
									/>
								) : (
									<DetailsTab
										details={['Content Details']}
										detailsPart={detailsPart}
										updateDetailsPart={updateDetailsPart}
									/>
								)}
							</div>
							<div className='flex w-full flex-row gap-4'>
								{detailsPart === 1 && (
									<>
										<Input
											className='w-full'
											placeholder='Building Sum Insured'
											value={curDetails.BuildingSumInsured}
											onChange={(e) => {
												updateSectionDetails(
													'BuildingSumInsured',
													e.target.value,
													'1'
												)
											}}
										/>
										<Input
											className='w-full'
											placeholder='Construction Type'
											value={curDetails.ContentSuminsured}
											onChange={(e) => {
												updateDetails('construct', e.target.value)
											}}
										/>
									</>
								)}
								{detailsPart === 2 && (
									<>
										<Input
											className='w-full'
											placeholder='Content Sum Insured'
											value={curDetails.ContentSuminsured}
											onChange={(e) => {
												updateSectionDetails(
													'ContentSuminsured',
													e.target.value,
													'47'
												)
											}}
										/>
									</>
								)}
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
									value={curDetails.allRiskSumInsured}
									onChange={(e) => {
										// updateDetails('allRiskSumInsured', e.target.value)
										updateSectionDetails(
											'allRiskSumInsured',
											e.target.value,
											'3'
										)
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
									value={curDetails.PersonalAccidentSi}
									onChange={(e) => {
										updateSectionDetails(
											'PersonalAccidentSi',
											e.target.value,
											'138'
										)
									}}
								/>
								{/* <Input
									className='w-full lg:w-1/2'
									placeholder='Sum Insured'
									value={curDetails.sumInsured}
									onChange={(e) => {
										updateDetails('sumInsured', e.target.value)
									}}
								/> */}
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
									value={curDetails.DomesticServentSi}
									onChange={(e) => {
										updateSectionDetails(
											'DomesticServentSi',
											e.target.value,
											'106'
										)
									}}
								/>
								{/* <Input
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
								/> */}
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
									value={curDetails.PersonalLiabilitySi}
									onChange={(e) => {
										updateSectionDetails(
											'PersonalLiabilitySi',
											e.target.value,
											'139'
										)
									}}
								/>
								{/* <Input
									className='w-full lg:w-1/2'
									placeholder='Sum Insured'
									value={curDetails.sumInsured}
									onChange={(e) => {
										updateDetails('sumInsured', e.target.value)
									}}
								/> */}
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
							disabled={current === 0}
							variant='outline'
							onClick={() => {
								setCurrent((pre) => pre - 1)
								selectCoverType(0)
							}}>
							Go Back to Prev Address
						</Button>
						{customerReferenceNo === '' ? (
							<Button
								className='rounded-3xl lg:w-56'
								disabled={current + 1 < homeData.homeDetailsList.length}
								variant='brightBlueBtn'
								onClick={() => {
									setOpenCustomerDialog(true)
									// route.push('/home-insurance/premium')
								}}>
								Add Customer Details
							</Button>
						) : (
							<Button
								className='rounded-3xl lg:w-56'
								disabled={current + 1 < homeData.homeDetailsList.length}
								variant='brightBlueBtn'
								onClick={() => {
									// route.push('/home-insurance/premium')
									saveNonMotor()
								}}>
								{IsNonMotorLoading ? <ClipLoader /> : <p>View Premium</p>}
							</Button>
						)}

						<Button
							className='rounded-3xl lg:w-56'
							disabled={current + 1 >= homeData.homeDetailsList.length}
							variant='lightGreenBtn'
							onClick={() => {
								setCurrent((pre) => pre + 1)
								selectCoverType(0)
							}}>
							Add Another Address
						</Button>
					</div>
					<HomeCustomerPopUp
						open={openCustomerDialog}
						openChange={setCustomerDialog}
					/>
				</section>
			) : (
				<></>
			)}
		</>
	)
}
