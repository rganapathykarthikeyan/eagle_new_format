'use client'

import { Equal, Plus } from 'lucide-react'
import { PremiumDetailsDisplay } from './premium-details-display'
import { AddonDetailsDisplay } from './addon-details-display'
import { TotalPremiumDisplay } from './total-premium-display'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import { type SaveMotorDetailRequest } from '@/services/models/common.models'
import {
	usePremiumCalcMutation,
	useSaveMotorDetailsMutation,
	useViewPremiumCalcMutation
} from '@/redux/api/commonApi'
import {
	setCoversDetails,
	setSelectedCoversDetails,
	storePremiumData,
	updateCoversList,
	updateDetails,
	updatePremium
} from '@/redux/slices'
import { Button } from '../ui'
import { Skeleton } from '../ui/skeleton'
import { OTPDialogBox } from './otp-dialog-box'

export type CoverList = {
	CalcType: string
	isSelected: string
	CoverName: string
	CoverDesc: string
	CoverID: string
	Currency: string
	SumInsured: string
	Rate: string
	SubCoverId: string
	PremiumBeforeTax: string
	PremiumAfterTax: string
	CoverageType: string
	Taxes: {
		TaxDesc: string
		TaxAmount: string
		TaxRate: string
		TaxID: string
	}[]
}[]

export type Cover = {
	CalcType: string
	isSelected: string
	CoverName: string
	CoverDesc: string
	CoverID: string
	Currency: string
	SumInsured: string
	Rate: string
	SubCoverId: string
	PremiumBeforeTax: string
	PremiumAfterTax: string
	CoverageType: string
	Taxes: {
		TaxDesc: string
		TaxAmount: string
		TaxRate: string
		TaxID: string
	}[]
}

export function PremiumPage() {
	const customerData = useAppSelector((state) => state.customerDetails)
	const motorData = useAppSelector((state) => state.motor)
	const appData = useAppSelector((state) => state.apps)
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const { toast } = useToast()

	const [saveMotor] = useSaveMotorDetailsMutation()
	const [premiumCalculator] = usePremiumCalcMutation()
	const [viewPremium] = useViewPremiumCalcMutation()

	const dispatch = useAppDispatch()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isMotorLoading, setIsMotorLoading] = useState<boolean>(false)
	const [needUpdatedData, setNeedUpdatedData] = useState<boolean>(false)

	const [allCoverList, setAllCoverList] = useState<CoverList>([])
	const [mainCoverList, setMainCoverList] = useState<CoverList>([])
	const [benefitCoverList, setBenefitCoverList] = useState<CoverList>([])
	const [optionalCoverList, setOptionalCoverList] = useState<CoverList>([])

	const [selectedCoverList, setSelectedCoverList] = useState<CoverList>([])

	const [otpOpen, setOtpOpen] = useState<boolean>(false)

	function getOtpDialogOpen() {
		const coverList: {
			CoverId: string
			SubCoverId: string | null
			SubCoverYn: string
		}[] = []

		selectedCoverList.map((covers) => {
			coverList.push({
				CoverId: covers.CoverID,
				SubCoverId: covers.SubCoverId,
				SubCoverYn: 'N'
			})
		})

		benefitCoverList.map((covers) => {
			coverList.push({
				CoverId: covers.CoverID,
				SubCoverId: covers.SubCoverId,
				SubCoverYn: 'N'
			})
		})

		dispatch(setSelectedCoversDetails(coverList))

		setOtpOpen(true)
	}

	useEffect(() => {
		const alreadySelectedCovers = allCoverList.filter((cover) => {
			return appData.selectedCovers.some((selCover) => {
				return selCover.CoverId === cover.CoverID
			})
		})

		const selectedWithoutBenefits = alreadySelectedCovers.filter((cover) => {
			return !benefitCoverList.some((selCover) => {
				return selCover.CoverID === cover.CoverID
			})
		})

		setSelectedCoverList(selectedWithoutBenefits)
	}, [allCoverList, appData.selectedCovers])

	function closeOTPDialog() {
		setOtpOpen(false)
	}

	function addCover(cover: Cover) {
		setSelectedCoverList((prev) => [...prev, cover])
	}

	function removeCover(cover: Cover) {
		setSelectedCoverList((prev) => {
			return prev.filter((value) => value.CoverID !== cover.CoverID)
		})
	}

	function doSaveMotorDetails() {
		setIsMotorLoading(true)
		const req: SaveMotorDetailRequest = {
			CustomerName: customerData.name,
			LoginId: appData.loginId,
			SubUserType: appData.subUserType,
			UserType: appData.userType,
			ApplicationId: '1', //
			CustomerReferenceNo: null,
			RequestReferenceNo: null,
			VehicleId: '1',
			CreatedBy: appData.loginId,
			InsuranceId: appData.insuranceID,
			BranchCode: appData.branchCode,
			BrokerBranchCode: appData.brokerCode,
			SectionId: ['104', '103'],
			AgencyCode: appData.agencyCode,
			ProductId: appData.productId,
			SavedFrom: 'SQ',
			MobileCode: customerData.code,
			MobileNumber: customerData.mobile,
			Chassisnumber: '',
			Insurancetype: '104',
			ClaimType: '11',
			InsuranceClass: '1',
			LocationId: '1',
			Motorusage: vehicleData.vehicleUsage,
			MotorusageId: vehicleData.vehicleUsageID,
			Vehiclemake: vehicleData.mark,
			VehiclemakeId: vehicleData.makeID,
			VehicleModel: vehicleData.model,
			VehcilemodelId: vehicleData.modelID,
			VehicleValueType: null,
			DefenceValue: null,
			PurchaseDate: null,
			Deductibles: null,
			Inflation: null,
			ManufactureYear: vehicleData.year + '',
			Gpstrackinginstalled: 'N',
			NcdYn: 'N',
			VehicleType: vehicleData.bodyType,
			VehicleTypeId: vehicleData.bodyTypeID,
			CarAlarmYn: 'N',
			PolicyStartDate: vehicleData.policyStartDate,
			PolicyEndDate: vehicleData.policyEndDate,
			CustomerCode: appData.CustomerCode,
			BdmCode: appData.CustomerCode,
			SourceTypeId: appData.userType,
			SumInsured: vehicleData.sumInsured !== null ? +vehicleData.sumInsured : 0,
			AcccessoriesSumInsured: vehicleData.AcccessoriesSumInsured,
			ExchangeRate: vehicleData.exchangeRate,
			Currency: vehicleData.currency,
			HavePromoCode: 'N',
			SearchFromApi: false,
			SeatingCapacity: 0, //vehicleData.seat
			CustomerStatus: 'Y',
			Status: 'Y',
			Windscreencoverrequired: null,
			WindScreenSumInsured: null,
			Zone: '1',
			ZoneCirculation: '',
			Tareweight: null,
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
					OldCurrency: 'ZMW',
					OldExchangeRate: '1.0',
					OldSumInsured: 0,
					OldTppdIncreaeLimit: null,
					OldWindScreenSumInsured: null
				}
			},
			RoofRack: null,
			RadioOrCasseteplayer: null,
			RegistrationDate: null,
			Registrationnumber: null,
			RegistrationYear: null,
			PromoCode: null,
			PolicyType: '1',
			PreviousInsuranceYN: 'N',
			PreviousLossRatio: '',
			PolicyRenewalYn: 'N',
			NewValue: null,
			NoOfClaims: null,
			NoOfClaimYears: null,
			NoOfPassengers: null,
			NoOfVehicles: '1',
			NumberOfAxels: null,
			NumberOfCards: null,
			OrginalPolicyNo: null,
			OwnerCategory: '1',
			PaCoverId: '0',
			periodOfInsurance: 367,
			MunicipalityTraffic: null,
			Ncb: '0',
			ModelNumber: null,
			MotorCategory: '1',
			MarketValue: null,
			Mileage: null,
			InsurancetypeDesc: 'MOTOR private vehicle',
			InsurerSettlement: '',
			InterestedCompanyDetails: '',
			IsFinanceEndt: null,
			LoanAmount: 0,
			LoanEndDate: null,
			LoanStartDate: null,
			InsuranceClassDesc: 'Comprehensive',
			InflationSumInsured: '0',
			HoldInsurancePolicy: 'N',
			HorsePower: '0',
			Idnumber: null,
			Grossweight: null,
			FirstLossPayee: null,
			FleetOwnerYn: 'N',
			FuelType: null,
			DrivenByDesc: 'D',
			DriverDetails: null,
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
			EngineNumber: null,
			ExcessLimit: null,
			DateOfCirculation: null,
			CubicCapacity: null,
			CollateralCompanyAddress: '',
			CollateralCompanyName: '',
			CollateralName: null,
			CollateralYn: 'N',
			Color: null,
			CommissionType: null,
			CoverNoteNo: null,
			CityLimit: null,
			BrokerCode: appData.agencyCode,
			BorrowerType: null,
			AxelDistance: 4,
			BankingDelegation: '',
			AggregatedValue: '',
			AccessoriesInformation: '',
			accident: null,
			AcExecutiveId: null,
			AdditionalCircumstances: ''
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
				const taxes: { name: string; amount: number; rate: number }[] = []
				const taxesEA: { name: string; amount: number; rate: number }[] = []

				const coverList: {
					CoverId: string
					SubCoverId: string | null
					SubCoverYn: string
				}[] = []

				const allcovers: CoverList = []

				value.data.data.Result[0].CoverList.map((covers) => {
					coverList.push({
						CoverId: covers.CoverId,
						SubCoverId: covers.SubCoverId,
						SubCoverYn: 'N'
					})

					const taxesList: {
						TaxDesc: string
						TaxAmount: string
						TaxRate: string
						TaxID: string
					}[] = []

					if (covers.Taxes) {
						covers.Taxes.map((tax) => {
							taxesList.push({
								TaxAmount: tax.TaxAmount + '',
								TaxDesc: tax.TaxDesc,
								TaxID: tax.TaxId,
								TaxRate: tax.TaxRate + ''
							})
						})
					}

					allcovers.push({
						CalcType: covers.CalcType,
						isSelected: covers.isSelected,
						CoverName: covers.CoverName,
						CoverDesc: covers.CoverDesc,
						CoverageType: covers.CoverageType,
						CoverID: covers.CoverId,
						Currency: covers.Currency,
						SumInsured: covers.SumInsured + '',
						SubCoverId: covers.SubCoverId != null ? covers.SubCoverId : '',
						Rate: covers.Rate + '',
						PremiumBeforeTax: covers.PremiumExcluedTax + '',
						PremiumAfterTax: covers.PremiumIncludedTax + '',
						Taxes: taxesList
					})
				})

				setAllCoverList(allcovers)

				dispatch(setCoversDetails(coverList))

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
		if (allCoverList.length !== 0) {
			const mainCovers: CoverList = []
			const benefitCovers: CoverList = []
			const optionalCovers: CoverList = []

			allCoverList.map((cover) => {
				if (cover.isSelected === 'D' && cover.CoverageType == 'A') {
					benefitCovers.push(cover)
				} else if (cover.isSelected == 'D' && cover.CoverageType != 'A') {
					mainCovers.push(cover)
				} else {
					optionalCovers.push(cover)
				}
			})
			setMainCoverList(mainCovers)
			setBenefitCoverList(benefitCovers)
			setOptionalCoverList(optionalCovers)

			if (appData.selectedCovers.length === 0) {
				setSelectedCoverList(mainCovers)
			}
		}
	}, [allCoverList])

	return (
		<>
			{needUpdatedData ? (
				<div className='flex h-full w-full items-center justify-center'>
					<Button
						variant='greenbtn'
						onClick={doSaveMotorDetails}>
						{isMotorLoading ? 'Loading...' : 'Refresh'}
					</Button>
				</div>
			) : (
				<section className='flex w-full flex-col items-start gap-3 p-4 lg:flex-row'>
					{isLoading ? (
						<Skeleton className='h-[50vh] w-full' />
					) : (
						<PremiumDetailsDisplay mainCoverList={mainCoverList} />
					)}
					<div className='flex min-h-10 min-w-10 flex-row items-center justify-center self-center rounded-full bg-green-600'>
						<Plus
							color='white'
							size={32}
						/>
					</div>
					{isLoading ? (
						<Skeleton className='h-[50vh] w-full' />
					) : (
						<AddonDetailsDisplay
							addCover={addCover}
							benefitCoverList={benefitCoverList}
							optionalCoverList={optionalCoverList}
							removeCover={removeCover}
							selectedCoverList={selectedCoverList}
						/>
					)}
					<div className='flex min-h-10 min-w-10 flex-row items-center justify-center self-center rounded-full bg-green-600'>
						<Equal
							color='white'
							size={32}
						/>
					</div>
					{isLoading ? (
						<Skeleton className='h-[50vh] w-full' />
					) : (
						<TotalPremiumDisplay
							getOtpDialogOpen={getOtpDialogOpen}
							selectedCoverList={selectedCoverList}
						/>
					)}
				</section>
			)}
			<OTPDialogBox
				closeDialog={closeOTPDialog}
				otpOpen={otpOpen}
			/>
		</>
	)
}
