'use client'

import { assets } from '@/assets'
import Image from 'next/image'
import { Button } from '../ui'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'
import {
	usePremiumCalcMutation,
	useSaveMotorDetailsMutation,
	useViewPremiumCalcMutation
} from '@/redux/api/commonApi'
import ClipLoader from 'react-spinners/ClipLoader'
import { setCoversDetails, storePremiumData, updatePremium } from '@/redux/slices'
import { type SaveMotorDetailRequest } from '@/services/models/common.models'
import { updateCoversList, updateDetails } from '@/redux/slices/motor-detail.slice'
import { useToast } from '../ui/use-toast'
import { Skeleton } from '../ui/skeleton'

// type PremiumSidebarProps = {
// 	getOtp: () => void
// }

export function PremiumSideBar() {
	// const route = useRouter()
	const customerData = useAppSelector((state) => state.customerDetails)
	const motorData = useAppSelector((state) => state.motor)
	const appData = useAppSelector((state) => state.apps)
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const { toast } = useToast()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isMotorLoading, setIsMotorLoading] = useState<boolean>(false)

	const [needUpdatedData, setNeedUpdatedData] = useState<boolean>(false)

	const [premiumCalculator] = usePremiumCalcMutation()
	const [viewPremium] = useViewPremiumCalcMutation()
	const [taxList, setTaxList] = useState<{ name: string; amount: number; rate: number }[]>([])
	const [taxListAccess, setTaxListAccess] = useState<
		{ name: string; amount: number; rate: number }[]
	>([])

	const [basicDetails, setBasicDetails] = useState({
		PremiumExcluedTax: 0,
		PremiumIncludedTax: 0
	})

	const [accessories, setAccessories] = useState({ PremiumExcluedTax: 0, PremiumIncludedTax: 0 })

	const [total, setTotal] = useState<string>('')
	const [saveMotor] = useSaveMotorDetailsMutation()

	const dispatch = useAppDispatch()

	function doSaveMotorDetails() {
		setIsMotorLoading(true)
		const req: SaveMotorDetailRequest = {
			CustomerName: customerData.name,
			LoginId: appData.loginId,
			SubUserType: appData.subUserType,
			UserType: appData.userType,
			ApplicationId: '1', //
			CustomerReferenceNo: '',
			RequestReferenceNo: null,
			VehicleId: '1',
			CreatedBy: appData.loginId,
			InsuranceId: appData.insuranceID,
			BranchCode: appData.branchCode,
			BrokerBranchCode: appData.brokerCode,
			SectionId: ['103'],
			AgencyCode: appData.agencyCode,
			ProductId: '5',
			SavedFrom: 'SQ',
			MobileCode: customerData.code,
			MobileNumber: customerData.mobile,
			Chassisnumber: vehicleData.chassisNumber,
			Insurancetype: '103',
			ClaimType: '0',
			InsuranceClass: '103',
			LocationId: '1',
			Motorusage: vehicleData.vehicleUsage,
			MotorusageId: vehicleData.vehicleUsageID,
			Vehiclemake: vehicleData.mark,
			VehiclemakeId: vehicleData.makeID,
			VehicleModel: vehicleData.model,
			VehcilemodelId: vehicleData.modelID,
			VehicleValueType: null,
			DefenceValue: null,
			SourceType: 'Broker',
			// PurchaseDate: null,
			Deductibles: null,
			Inflation: null,
			ManufactureYear: vehicleData.year + '',
			Gpstrackinginstalled: 'N',
			NcdYn: 'N',
			VehicleType: vehicleData.bodyType,
			VehicleTypeId: vehicleData.bodyTypeID,
			// CarAlarmYn: 'N',
			PolicyStartDate: vehicleData.policyStartDate,
			PolicyEndDate: vehicleData.policyEndDate,
			CustomerCode: appData.CustomerCode,
			BdmCode: appData.CustomerCode,
			SourceTypeId: appData.userType,
			SumInsured: vehicleData.sumInsured !== null ? +vehicleData.sumInsured : 0,
			AcccessoriesSumInsured:
				vehicleData.AcccessoriesSumInsured !== ''
					? vehicleData.AcccessoriesSumInsured
					: null,
			ExchangeRate: vehicleData.exchangeRate,
			Currency: vehicleData.currency,
			HavePromoCode: 'N',
			// SearchFromApi: false,
			SeatingCapacity: vehicleData.seat + '',
			// CustomerStatus: 'Y',
			Status: 'Y',
			Ncb: '0',
			InflationSumInsured: '350000',
			PurchaseDate: null,
			Windscreencoverrequired: null,
			WindScreenSumInsured: null,
			Zone: '1',
			ZoneCirculation: null,
			Tareweight: vehicleData.tareweight,
			TiraCoverNoteNo: null,
			TppdFreeLimit: null,
			TppdIncreaeLimit: null,
			TrailerDetails: null,
			TransportHydro: null,
			VehicleTypeIvr: '',
			UsageId: '',
			Stickerno: null,
			SpotFogLamp: null,
			Scenarios: {
				ExchangeRateScenario: {
					OldAcccessoriesSumInsured: null,
					OldCurrency: 'MUR',
					OldExchangeRate: '1.0',
					OldSumInsured: null,
					OldTppdIncreaeLimit: null,
					OldWindScreenSumInsured: null
				}
			},
			SearchFromApi: false,
			RoofRack: null,
			RadioOrCasseteplayer: null,
			RegistrationDate: null,
			Registrationnumber: vehicleData.registrationNumber,
			RegistrationYear: vehicleData.year + '',
			PromoCode: null,
			PolicyType: '1',
			PreviousInsuranceYN: 'N',
			PreviousLossRatio: null,
			PolicyRenewalYn: vehicleData.isRenewal ? 'Y' : 'N',
			NewValue: null,
			NoOfClaims: null,
			NoOfClaimYears: null,
			NoOfPassengers: null,
			NoOfVehicles: '1',
			NumberOfAxels: '1',
			NumberOfCards: null,
			OrginalPolicyNo: null,
			OwnerCategory: '1',
			PaCoverId: null,
			periodOfInsurance: null,
			MunicipalityTraffic: null,
			// Ncb: '0',
			ModelNumber: null,
			MotorCategory: null,
			MarketValue: null,
			Mileage: null,
			InsurancetypeDesc: 'Comprehensive',
			InsurerSettlement: '',
			InterestedCompanyDetails: '',
			IsFinanceEndt: null,
			LoanAmount: 0,
			LoanEndDate: null,
			LoanStartDate: null,
			InsuranceClassDesc: 'Comprehensive',
			VehicleClass: null,
			// InflationSumInsured: '0',
			HoldInsurancePolicy: 'N',
			HorsePower: '0',
			Idnumber: '',
			Grossweight: vehicleData.grossweight,
			FirstLossPayee: null,
			FleetOwnerYn: 'N',
			FuelType: vehicleData.fuelType,
			DrivenByDesc: 'D',
			DriverDetails: {
				CityId: '1',
				CountryId: appData.countryCode,
				CreatedBy: appData.loginId,
				Deductibles: null,
				DefenceValue: '',
				DriverDob: customerData.dob,
				DriverExperience: +customerData.driverExperience,
				DriverName: customerData.name,
				DriverType: '1',
				EndorsementDate: null,
				EndorsementEffectiveDate: null,
				EndorsementRemarks: null,
				EndorsementType: null,
				EndorsementTypeDesc: null,
				EndorsementYn: 'N',
				EndtCategoryDesc: null,
				EndtCount: null,
				EndtPrevPolicyNo: null,
				EndtPrevQuoteNo: null,
				EndtStatus: null,
				ExcessLimit: null,
				Gender: customerData.gender,
				Inflation: '',
				InsuranceId: appData.insuranceID,
				IsFinanceEndt: null,
				LicenseNo: '99999',
				MaritalStatus: '1',
				Mileage: null,
				Ncb: '0',
				NoOfClaimYears: '2',
				NoOfPassengers: null,
				OrginalPolicyNo: null,
				QuoteNo: null,
				RegistrationDate: null,
				RequestReferenceNo: null,
				RiskId: 1,
				StateId: '1',
				SuburbId: '2',
				VehicleValueType: ''
			},
			EndorsementDate: null,
			EndorsementEffectiveDate: null,
			EndorsementRemarks: null,
			EndorsementType: null,
			EndorsementTypeDesc: null,
			EndorsementYn: 'N',
			EndtCategoryDesc: null,
			EndtCount: null,
			EndtPrevPolicyNo: null,
			EndtPrevQuoteNo: null,
			EndtStatus: null,
			EngineNumber: vehicleData.engineNumber,
			// ExcessLimit: null,
			DateOfCirculation: null,
			CubicCapacity: null,
			CollateralCompanyAddress: null,
			CollateralCompanyName: null,
			CollateralName: null,
			CollateralYn: 'N',
			Color: null,
			CommissionType: null,
			CoverNoteNo: null,
			CityLimit: null,
			BrokerCode: appData.agencyCode,
			BorrowerType: null,
			AxelDistance: '4',
			BankingDelegation: '',
			AggregatedValue: null,
			AccessoriesInformation: null,
			accident: null,
			AcExecutiveId: null,
			AdditionalCircumstances: null,
			ExcessLimit: null,
			ClaimRatio: null,
			Class: null,
			NoOfComprehensives: null
		}
		const res = saveMotor(req)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError !== true &&
				value.data.data.Result !== null
			) {
				dispatch(updatePremium(true))

				if (value.data.data.Result.length === 1) {
					dispatch(updateDetails(value.data.data.Result[0]))
				} else {
					dispatch(updateCoversList(value.data.data.Result))
				}

				setIsLoading(false)
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

			setIsMotorLoading(false)
		})
	}

	useEffect(() => {
		if (motorData.RequestReferenceNo !== '' || motorData.AllCoverList.length !== 0) {
			if (motorData.AllCoverList.length === 0) {
				const req = {
					InsuranceId: appData.insuranceID,
					BranchCode: appData.branchCode,
					AgencyCode: appData.agencyCode,
					SectionId: vehicleData.classID,
					ProductId: appData.productId,
					MSRefNo: motorData.MSRefNo,
					VehicleId: motorData.VehicleId,
					CdRefNo: motorData.CdRefNo,
					DdRefNo: motorData.DdRefNo,
					VdRefNo: motorData.VdRefNo,
					CreatedBy: motorData.CreatedBy,
					productId: motorData.ProductId,
					RequestReferenceNo: motorData.RequestReferenceNo,
					EffectiveDate: vehicleData.policyStartDate,
					PolicyEndDate: vehicleData.policyEndDate,
					CoverModification: 'N'
				}
				setIsLoading(true)
				const res = premiumCalculator(req)
				res.then(() => {
					ViewPremiumData()
				})
			} else {
				const promises = motorData.AllCoverList.map((cover) => {
					const req = {
						InsuranceId: appData.insuranceID,
						BranchCode: appData.branchCode,
						AgencyCode: appData.agencyCode,
						SectionId: '104',
						ProductId: appData.productId,
						MSRefNo: cover.MSRefNo,
						VehicleId: cover.VehicleId,
						CdRefNo: cover.CdRefNo,
						DdRefNo: cover.DdRefNo,
						VdRefNo: cover.VdRefNo,
						CreatedBy: cover.CreatedBy,
						productId: cover.ProductId,
						RequestReferenceNo: cover.RequestReferenceNo,
						EffectiveDate: vehicleData.policyStartDate,
						PolicyEndDate: vehicleData.policyEndDate,
						CoverModification: 'N'
					}
					setIsLoading(true)
					return premiumCalculator(req)
				})
				Promise.all(promises).then(() => {
					ViewPremiumData()
				})
			}
		}
	}, [motorData])

	useEffect(() => {
		setNeedUpdatedData(true)
	}, [vehicleData])

	function ViewPremiumData() {
		const req = {
			ProductId:
				motorData.AllCoverList.length !== 0
					? motorData.AllCoverList[0].ProductId
					: motorData.ProductId,
			RequestReferenceNo:
				motorData.AllCoverList.length !== 0
					? motorData.AllCoverList[0].RequestReferenceNo
					: motorData.RequestReferenceNo
		}
		const res = viewPremium(req)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				const usdVal = {
					PremiumExcluedTax: value.data.data.Result[0].CoverList[0].PremiumExcluedTax,
					PremiumIncludedTax: value.data.data.Result[0].CoverList[0].PremiumIncludedTax
				}

				const taxes: { name: string; amount: number; rate: number }[] = []
				const taxesEA: { name: string; amount: number; rate: number }[] = []

				const coverList: {
					CoverId: string
					SubCoverId: string | null
					SubCoverYn: string
				}[] = []

				value.data.data.Result[0].CoverList.map((covers) => {
					coverList.push({
						CoverId: covers.CoverId,
						SubCoverId: covers.SubCoverId,
						SubCoverYn: 'N'
					})
				})

				setBasicDetails(usdVal)
				dispatch(setCoversDetails(coverList))

				if (value.data.data.Result[0].CoverList.length === 2) {
					setAccessories({
						PremiumExcluedTax: value.data.data.Result[0].CoverList[1].PremiumExcluedTax,
						PremiumIncludedTax:
							value.data.data.Result[0].CoverList[1].PremiumIncludedTax
					})

					if (
						value.data.data.Result[0].CoverList[1].Taxes !== null &&
						value.data.data.Result[0].CoverList[1].Taxes.length !== 0
					) {
						value.data.data.Result[0].CoverList[1].Taxes.map((tax) => {
							taxesEA.push({
								name: tax.TaxDesc,
								amount: tax.TaxAmount,
								rate: tax.TaxRate
							})
						})
						setTaxListAccess(taxesEA)
					}
				}

				if (
					value.data.data.Result[0].CoverList[0].Taxes !== null &&
					value.data.data.Result[0].CoverList[0].Taxes.length !== 0
				) {
					value.data.data.Result[0].CoverList[0].Taxes.map((tax) => {
						taxes.push({
							name: tax.TaxDesc,
							amount: tax.TaxAmount,
							rate: tax.TaxRate
						})
					})
					setTaxList(taxes)
				}

				dispatch(
					storePremiumData({
						baseFare: value.data.data.Result[0].CoverList[0].PremiumExcluedTax,
						tax: taxes,
						premiumIncludedTax:
							value.data.data.Result[0].CoverList[0].PremiumIncludedTax,
						premiumIncludedTaxLC:
							value.data.data.Result[0].CoverList[0].PremiumIncludedTaxLC,
						EABase:
							value.data.data.Result[0].CoverList.length === 2
								? value.data.data.Result[0].CoverList[1].PremiumExcluedTax
								: 0,
						EAPremiumIncluedTax:
							value.data.data.Result[0].CoverList.length === 2
								? value.data.data.Result[0].CoverList[1].PremiumIncludedTax
								: 0,
						EAPremiumIncluedTaxLC:
							value.data.data.Result[0].CoverList.length === 2
								? value.data.data.Result[0].CoverList[1].PremiumIncludedTaxLC
								: 0,
						EATax: value.data.data.Result[0].CoverList.length === 2 ? taxesEA : [],
						TotalPremium: value.data.data.Result[0].CoverList[1].PremiumIncludedTax
					})
				)
			}

			setNeedUpdatedData(false)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		const total = basicDetails.PremiumIncludedTax + accessories.PremiumIncludedTax
		setTotal(total.toFixed(2))
	}, [accessories.PremiumIncludedTax, basicDetails.PremiumIncludedTax])

	// useEffect(() => {
	// 	if (motorData.RequestReferenceNo !== '') {
	// 		if (motorData.AllCoverList.length === 0) {
	// 			const req = {
	// 				InsuranceId: appData.insuranceID,
	// 				BranchCode: appData.branchCode,
	// 				AgencyCode: appData.agencyCode,
	// 				SectionId: vehicleData.classID,
	// 				ProductId: appData.productId,
	// 				MSRefNo: motorData.MSRefNo,
	// 				VehicleId: motorData.VehicleId,
	// 				CdRefNo: motorData.CdRefNo,
	// 				DdRefNo: motorData.DdRefNo,
	// 				VdRefNo: motorData.VdRefNo,
	// 				CreatedBy: motorData.CreatedBy,
	// 				productId: motorData.ProductId,
	// 				RequestReferenceNo: motorData.RequestReferenceNo,
	// 				EffectiveDate: vehicleData.policyStartDate,
	// 				PolicyEndDate: vehicleData.policyEndDate,
	// 				CoverModification: 'N'
	// 			}
	// 			setIsLoading(true)
	// 			const res = premiumCalculator(req)
	// 			res.then(() => {
	// 				ViewPremiumData()
	// 			})
	// 		} else {
	// 			console.log(motorData.AllCoverList)
	// 			motorData.AllCoverList.map((cover) => {
	// 				const req = {
	// 					InsuranceId: appData.insuranceID,
	// 					BranchCode: appData.branchCode,
	// 					AgencyCode: appData.agencyCode,
	// 					SectionId: '104',
	// 					ProductId: appData.productId,
	// 					MSRefNo: cover.MSRefNo,
	// 					VehicleId: cover.VehicleId,
	// 					CdRefNo: cover.CdRefNo,
	// 					DdRefNo: cover.DdRefNo,
	// 					VdRefNo: cover.VdRefNo,
	// 					CreatedBy: cover.CreatedBy,
	// 					productId: cover.ProductId,
	// 					RequestReferenceNo: cover.RequestReferenceNo,
	// 					EffectiveDate: vehicleData.policyStartDate,
	// 					PolicyEndDate: vehicleData.policyEndDate,
	// 					CoverModification: 'N'
	// 				}
	// 				setIsLoading(true)
	// 				premiumCalculator(req)
	// 			})
	// 			ViewPremiumData()
	// 		}
	// 	}
	// }, [])
	return (
		<div className='flex h-full w-full flex-col gap-4 font-roboto'>
			{customerData.premium && (
				<>
					{/* <div className='flex flex-col gap-2'>
						<h1 className='font-jakarta text-xl font-bold text-blue-300'>
							Premium Details
						</h1>
						<span className='font-roboto text-sm font-medium text-gray-500'>
							The amount and calculations for the premium value
						</span>
					</div> */}
					<div className='flex flex-col gap-4 rounded-lg p-6 shadow-md'>
						<div className='flex flex-row gap-6'>
							<div className='h-32 w-32'>
								<Image
									alt='car'
									className='h-full w-full object-contain object-center'
									height={500}
									src={assets.images.car}
									width={500}
								/>
							</div>
							<div className='flex flex-col justify-around gap-2'>
								<div className='flex flex-col gap-1'>
									<h4 className='text-sm font-bold text-green-75 opacity-75'>
										RefNumber No: {motorData.RequestReferenceNo}
									</h4>
									{motorData.QuoteNo !== '' && (
										<h4 className='text-sm font-bold text-green-75 opacity-75'>
											Quote No: {motorData.QuoteNo}
										</h4>
									)}
									<h4 className='font-bold text-green-75'>
										{vehicleData.mark} - {vehicleData.model}
									</h4>
								</div>
								<div className='flex w-full flex-row items-center gap-2'>
									{/* <span className='rounded-lg border border-green-100 p-2 text-xs font-semibold'>
										{vehicleData.seat} seats
									</span> */}
									<span className='text-xs font-bold text-green-75'>
										{vehicleData.year} - {vehicleData.vehicleUsage}
									</span>
								</div>
							</div>
						</div>
						<div className='flex w-full flex-row justify-between gap-6'>
							<span className='flex flex-col items-center text-sm font-bold text-green-75'>
								Policy Start Date
								<span className='font-normal'>{vehicleData.policyStartDate}</span>
							</span>
							<span className='flex flex-col items-center text-sm font-bold text-green-75'>
								Policy End Date
								<span className='font-normal'>{vehicleData.policyEndDate}</span>
							</span>
							<span className='flex flex-col items-center text-sm font-bold text-green-75'>
								Days Count
								<span className='font-normal'>365</span>
							</span>
						</div>
						<div className='border-y-[0.5px] border-green-75 border-opacity-25 py-4'>
							Your Insurance is protected by{' '}
							<span className='font-bold'>Eagle Insurance</span>
						</div>
						{isLoading ? (
							<div className='flex w-full flex-col gap-4'>
								<Skeleton className='h-10 w-3/4' />
								<Skeleton className='h-10 w-full' />
								<Skeleton className='h-10 w-full' />
								<Skeleton className='h-10 w-full' />
								<Skeleton className='h-10 w-full' />
								<Skeleton className='h-10 w-full' />
							</div>
						) : (
							<>
								{needUpdatedData ? (
									<>
										<Button
											variant='bluebtn'
											onClick={doSaveMotorDetails}>
											{isMotorLoading ? (
												<ClipLoader
													color='#FFFFFF'
													size={20}
												/>
											) : (
												<span>Refresh Premium Amount</span>
											)}
										</Button>
									</>
								) : (
									<>
										<div className='flex flex-col gap-4'>
											<h1 className='font-jakarta text-2xl font-bold text-blue-300'>
												{vehicleData.insuranceClass}
											</h1>
											{vehicleData.insuranceClass !== 'TPO' && (
												<div className='flex flex-row justify-between'>
													<span>Sum Insured</span>
													<span>
														{vehicleData.sumInsured}{' '}
														{vehicleData.currency}
													</span>
												</div>
											)}
											<div className='flex flex-row justify-between'>
												<span>Base Fare</span>
												<span>
													{basicDetails.PremiumExcluedTax}{' '}
													{vehicleData.currency}
												</span>
											</div>
											{taxList.map((tax, index) => {
												return (
													<div
														key={index}
														className='flex flex-row justify-between'>
														<span>{`${tax.name} ${tax.rate ? '(' + tax.rate + '%)' : ''}`}</span>
														<span>
															{tax.amount} {vehicleData.currency}
														</span>
													</div>
												)
											})}
										</div>
										<div className='flex flex-row justify-between border-b-[0.5px] border-green-75 border-opacity-25 pb-4 font-semibold'>
											<span>Premium Included Tax</span>
											<span>
												{basicDetails.PremiumIncludedTax}{' '}
												{vehicleData.currency}
											</span>
										</div>
										{accessories.PremiumExcluedTax !== 0 && (
											<>
												<div className='flex flex-row justify-between'>
													<span>Electronic Accessories</span>
													<span>
														{accessories.PremiumExcluedTax}{' '}
														{vehicleData.currency}
													</span>
												</div>
												{taxListAccess.map((tax, index) => {
													return (
														<div
															key={index}
															className='flex flex-row justify-between'>
															<span>{`${tax.name} ${tax.rate ? '(' + tax.rate + '%)' : ''}`}</span>
															<span>
																{tax.amount} {vehicleData.currency}
															</span>
														</div>
													)
												})}
												<div className='flex flex-row justify-between border-b-[0.5px] border-green-75 border-opacity-25 pb-4 font-semibold'>
													<span>Premium Included Tax</span>
													<span>
														{accessories.PremiumIncludedTax}{' '}
														{vehicleData.currency}
													</span>
												</div>
											</>
										)}
										<div className='flex flex-row justify-between font-bold'>
											<span>Grand Total</span>
											<span>{`${total} ${vehicleData.currency}`}</span>
										</div>
										<Button
											variant='bluebtn'
											onClick={() => {
												// route.push('/car-insurance/confirm/otp-verify')
											}}>
											Buy Policy
										</Button>
									</>
								)}
							</>
						)}
					</div>
				</>
			)}
		</div>
	)
}
