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
	type getItemValueRequest,
	type locationListHome,
	type SaveNonMotorDetailRequest
} from '@/services/models/home.models'
import {
	useGetItemValueMutation,
	usePremiumHomeCalcMutation,
	useSaveNonMotorDetailsMutation,
	useViewPremiumHomeCalcMutation
} from '@/redux/api/homeApi'
import { useToast } from '../ui/use-toast'
import ClipLoader from 'react-spinners/ClipLoader'
import { AllRiskCover } from './all-risk-cover'
import { PersonalAccidentCover } from './personal-accident-cover'
import { DomesticServantDetails } from './domestic-servant-details'
import { PersonalLiabilityCover } from './personal-liability-cover'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { FilledDetails } from './filled-details'
import { BuildingSumInsured } from './building-suminsured'
import { updateHomeCoversList, updateHomeDetails } from '@/redux/slices/non-motor-details.slice'
import { useRouter } from 'next/navigation'

export function SelectHomeCovers() {
	const homeData = useAppSelector((state) => state.homeInsurance)
	const nonMotorData = useAppSelector((state) => state.nonmotor)
	const [current, setCurrent] = useState<number>(0)
	const [detailsPart, setDetailsPart] = useState<number>(1)

	const customerReferenceNo = useAppSelector((state) => state.nonmotor.CustomerReferenceNo)
	const customerData = useAppSelector((state) => state.customerDetails)
	const appData = useAppSelector((state) => state.apps)

	const [showTabType, setShowTabType] = useState<number>(0)

	const [coverType, selectCoverType] = useState<number>(0)

	const [openCustomerDialog, setOpenCustomerDialog] = useState<boolean>(false)

	const [cvType, setCVType] = useState<string>('')

	const route = useRouter()

	useEffect(() => {
		if (homeData.homeDetailsList[current]) {
			setCVType(homeData.homeDetailsList[current].coverType)
		}
	}, [homeData.homeDetailsList[current], current])

	const [premiumCalculator] = usePremiumHomeCalcMutation()

	const [viewPremiumCalc] = useViewPremiumHomeCalcMutation()

	// const route = useRouter()

	const { toast } = useToast()

	const [IsNonMotorLoading, setIsNonMotorLoading] = useState<boolean>(false)

	const insuranceId = useAppSelector((state) => state.apps.insuranceID)

	const [getItemValue] = useGetItemValueMutation()
	const [constructionTypeList, setConstructionTypeList] = useState<
		{ value: string; label: string }[]
	>([])

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
		OutbuildConstructType: '',
		DomesticServantType: '',
		RelationType: '',
		ServantCount: '',
		sectionType: []
	})

	useEffect(() => {
		setCurrent(0)
	}, [homeData.homeDetailsList.length])

	useEffect(() => {
		if (appData.token !== '') {
			const req: getItemValueRequest = {
				InsuranceId: insuranceId,
				ItemType: 'wall_type'
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
					setConstructionTypeList(tempArr)
				}
			})
		}
	}, [insuranceId, getItemValue])

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
				OutbuildConstructType: homeData.homeDetailsList[current].OutbuildConstructType,
				PersonalLiabilitySi: homeData.homeDetailsList[current].PersonalLiabilitySi,
				DomesticServantType: homeData.homeDetailsList[current].DomesticServantType,
				RelationType: homeData.homeDetailsList[current].RelationType,
				ServantCount: homeData.homeDetailsList[current].ServantCount
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
				if (value.data.data.Result.length === 1) {
					dispatch(updateHomeDetails(value.data.data.Result[0]))
				} else {
					dispatch(updateHomeCoversList(value.data.data.Result))
				}

				setIsNonMotorLoading(false)
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

	useEffect(() => {
		if (nonMotorData.RequestReferenceNo !== '' || nonMotorData.AllCoverList.length !== 0) {
			if (nonMotorData.AllCoverList.length === 0) {
				const req = {
					InsuranceId: appData.insuranceID,
					BranchCode: appData.branchCode,
					AgencyCode: appData.agencyCode,
					ProductId: appData.productId,
					SectionId: nonMotorData.SectionId,
					MSRefNo: nonMotorData.MSRefNo,
					CdRefNo: nonMotorData.CdRefNo,
					VdRefNo: nonMotorData.VdRefNo,
					CreatedBy: nonMotorData.CreatedBy,
					productId: nonMotorData.ProductId,
					RequestReferenceNo: nonMotorData.RequestReferenceNo,
					EffectiveDate: formatDateDDMMYYYYNextYear(new Date()),
					PolicyEndDate: formatDateDDMMYYYY(new Date()),
					CoverModification: 'N',
					VehicleId: '1',
					LocationId: '1'
				}
				setIsNonMotorLoading(true)
				const res = premiumCalculator(req)
				res.then(() => {
					ViewPremiumData()
				})
			} else {
				const promises = nonMotorData.AllCoverList.map((cover) => {
					const req = {
						InsuranceId: appData.insuranceID,
						BranchCode: appData.branchCode,
						AgencyCode: appData.agencyCode,
						SectionId: '104',
						ProductId: appData.productId,
						MSRefNo: cover.MSRefNo,
						CdRefNo: cover.CdRefNo,
						VdRefNo: cover.VdRefNo,
						CreatedBy: cover.CreatedBy,
						productId: cover.ProductId,
						RequestReferenceNo: cover.RequestReferenceNo,
						EffectiveDate: formatDateDDMMYYYYNextYear(new Date()),
						PolicyEndDate: formatDateDDMMYYYY(new Date()),
						CoverModification: 'N',
						VehicleId: '1',
						LocationId: '1'
					}
					setIsNonMotorLoading(true)
					return premiumCalculator(req)
				})
				Promise.all(promises).then(() => {
					ViewPremiumData()
				})
			}
		}
	}, [nonMotorData])

	function ViewPremiumData() {
		const req = {
			ProductId: appData.productId,
			RequestReferenceNo: nonMotorData.RequestReferenceNo
		}
		const res = viewPremiumCalc(req)
		res.then((value) => {
			if (
				value.data &&
				value.data.type === 'success' &&
				value.data.data &&
				value.data.data.Message === 'Success'
			) {
				route.push('/home-insurance/premium')
			}
		})
	}

	function viewPremium() {
		if (
			cvType === '1' &&
			homeData.homeDetailsList[current].BuildingSumInsured !== '' &&
			homeData.homeDetailsList[current].ContentSuminsured !== ''
		) {
			saveNonMotor()
		} else if (cvType === '2' && homeData.homeDetailsList[current].BuildingSumInsured !== '') {
			saveNonMotor()
		} else if (cvType === '3' && homeData.homeDetailsList[current].ContentSuminsured !== '') {
			saveNonMotor()
		} else {
			if (cvType === '1') {
				alert('Fill Both Building and Content Sum Insured')
			} else if (cvType === '2') {
				alert('Fill Building Sum Insured')
			} else {
				alert('Fill Content Sum Insured')
			}
		}
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

			const isSumInsured =
				fieldName !== 'DomesticServantType' &&
				fieldName !== 'OutbuildConstructType' &&
				fieldName !== 'RelationType' &&
				fieldName !== 'ServantCount' &&
				fieldName !== 'SectionId' &&
				fieldName !== 'RiskId'

			if (isSumInsured) {
				newData[pos] = { ...newData[pos], [fieldName]: value, sumInsured: value }
			} else {
				newData[pos] = { ...newData[pos], [fieldName]: value }
			}

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

			const isSumInsured =
				fieldName !== 'DomesticServantType' &&
				fieldName !== 'OutbuildConstructType' &&
				fieldName !== 'RelationType' &&
				fieldName !== 'ServantCount' &&
				fieldName !== 'SectionId' &&
				fieldName !== 'RiskId'

			if (isSumInsured) {
				newDetails['sumInsured'] = value
			} else {
				newDetails[fieldName] = value
			}

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

	useEffect(() => {
		setDetailsPart(1)
	}, [cvType])

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
				<section className='relative flex w-full flex-col gap-10 px-4 py-10 font-roboto lg:px-32 lg:py-12'>
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
					<Dialog>
						<DialogTrigger className='absolute right-0 -mr-14 rounded-s-xl bg-blue-400 px-8 text-white hover:px-16 hover:duration-300'>
							View Filled Data
						</DialogTrigger>
						<DialogContent>
							<FilledDetails />
						</DialogContent>
					</Dialog>
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
								{detailsPart === 1 && cvType !== '3' && (
									<BuildingSumInsured
										constructionTypeList={constructionTypeList}
										curDetails={curDetails}
										updateSectionDetails={updateSectionDetails}
									/>
								)}
								{((cvType === '3' && detailsPart === 1) || detailsPart === 2) && (
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
							<AllRiskCover
								curDetails={curDetails}
								updateSectionDetails={updateSectionDetails}
							/>
							<PersonalAccidentCover current={current} />
						</div>
						<div className='flex flex-col gap-4'>
							<DomesticServantDetails current={current} />
							<PersonalLiabilityCover
								curDetails={curDetails}
								updateSectionDetails={updateSectionDetails}
							/>
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
								onClick={viewPremium}>
								{IsNonMotorLoading ? (
									<ClipLoader
										color='white'
										size={16}
									/>
								) : (
									<p>View Premium</p>
								)}
							</Button>
						)}

						<Button
							className='rounded-3xl lg:w-56'
							disabled={current + 1 >= homeData.homeDetailsList.length}
							variant='lightGreenBtn'
							onClick={() => {
								if (
									cvType === '1' &&
									homeData.homeDetailsList[current].BuildingSumInsured !== '' &&
									homeData.homeDetailsList[current].ContentSuminsured !== ''
								) {
									setCurrent((pre) => pre + 1)
									selectCoverType(0)
								} else if (
									cvType === '2' &&
									homeData.homeDetailsList[current].BuildingSumInsured !== ''
								) {
									setCurrent((pre) => pre + 1)
									selectCoverType(0)
								} else if (
									cvType === '3' &&
									homeData.homeDetailsList[current].ContentSuminsured !== ''
								) {
									setCurrent((pre) => pre + 1)
									selectCoverType(0)
								} else {
									if (cvType === '1') {
										alert('Fill Both Building and Content Sum Insured')
									} else if (cvType === '2') {
										alert('Fill Building Sum Insured')
									} else {
										alert('Fill Content Sum Insured')
									}
								}
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
