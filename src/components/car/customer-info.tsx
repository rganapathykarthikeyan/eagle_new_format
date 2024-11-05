'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
// import { useRouter } from 'next/navigation'
import {
	Button,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../ui'
// import { OtherOptions } from './other-options'

import ClipLoader from 'react-spinners/ClipLoader'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import {
	updateCoversList,
	updateCustomerDetails,
	updateDetails,
	updatePremium
} from '@/redux/slices'
import { Label } from '../ui/label'
import { useState } from 'react'
import { type SaveMotorDetailRequest } from '@/services/models/common.models'
import { useSaveMotorDetailsMutation } from '@/redux/api/commonApi'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { cn, formatDateDDMMYYYY } from '@/lib'
import { CalendarDays } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'

const customerInfoSchema = z.object({
	name: z.string().min(3, { message: 'name should be atleast 3 characters' }).max(50),
	mobile: z.string().min(9, { message: 'Enter valid number' }),
	gender: z.string().min(1, { message: 'Required' }),
	dob: z.date(),
	driverExperience: z.string()
})

type CustomerInfoProps = {
	goNext: () => void
}

export function CustomerInfo(props: CustomerInfoProps) {
	const customerData = useAppSelector((state) => state.customerDetails)
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appData = useAppSelector((state) => state.apps)

	const dispatch = useAppDispatch()
	const router = useRouter()
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { toast } = useToast()

	const years18 = new Date()

	years18.setFullYear(years18.getFullYear() - 18)

	useGSAP(() => {
		gsap.from('.selectCustomerInfo', { y: 80, opacity: 0, duration: 0.5 })
		// gsap.to('.CustomerInfotitle', { duration: 0.5, text: 'Personal Details' })
		// gsap.to('.CustomerInfosubtitle', {
		// 	duration: 0.5,
		// 	text: 'Please provide your details to proceed',
		// 	delay: 0.5
		// })
	})

	const [saveMotor] = useSaveMotorDetailsMutation()

	const form = useForm<z.infer<typeof customerInfoSchema>>({
		resolver: zodResolver(customerInfoSchema),
		defaultValues: {
			name: customerData.name,
			mobile: customerData.mobile,
			driverExperience: customerData.driverExperience,
			gender: customerData.gender
		}
	})

	function onSubmit(values: z.infer<typeof customerInfoSchema>) {
		dispatch(
			updateCustomerDetails({
				name: values.name,
				mobile: values.mobile + '',
				dob: formatDateDDMMYYYY(values.dob),
				driverExperience: values.driverExperience,
				gender: values.gender
			})
		)
		setIsSubmitted(true)
		goToConfirm(values)
		props.goNext()
	}

	function goToConfirm(values: z.infer<typeof customerInfoSchema>) {
		setIsLoading(true)
		doSaveMotorDetails(values)
	}

	function doSaveMotorDetails(values: z.infer<typeof customerInfoSchema>) {
		const req: SaveMotorDetailRequest = {
			CustomerName: values.name,
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
			MobileNumber: values.mobile,
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
				DriverDob: formatDateDDMMYYYY(values.dob),
				DriverExperience: +values.driverExperience,
				DriverName: values.name,
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
				Gender: values.gender,
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
			CubicCapacity: vehicleData.engineCapacity,
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

				router.push('/car-insurance/premium')
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
				setIsLoading(false)
				setIsSubmitted(false)
			}
		})
	}

	return (
		<section className='flex w-full flex-col items-center gap-10 lg:w-4/5'>
			<div className='flex w-full flex-col items-center gap-4'>
				<div className='flex flex-row -space-x-7'>
					<div className='h-10 w-10 rounded-full bg-black'></div>
					<div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg font-medium text-white'>
						2
					</div>
				</div>
				<h1 className='text-center font-inter text-4xl font-bold text-blue-825'>
					Customer Information
				</h1>
				<p className='w-4/5 text-center font-roboto text-sm text-gray-500'>
					Please fill out the form with accurate details about your customer. Ensure all
					information provided is correct and up-to-date.
				</p>
			</div>
			<div className='flex w-full flex-col gap-4 lg:w-4/5 xl:w-3/5'>
				<Form {...form}>
					<form
						className='space-y-8'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='selectCustomerInfo flex flex-row gap-10'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>
											Customer Name
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												autoComplete='name'
												className='border-gray-360 border shadow-inputShadowDrop'
												id='name'
												placeholder='Please Enter Name'
												onChange={(e) => {
													field.onChange(e)

													if (isSubmitted) {
														setIsSubmitted(false)
													}
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* <Input
								placeholder='Customer Name'
								value={customerData.name}
								onChange={(e) => {
									dispatch(updateName(e.target.value))
								}}
							/> */}
						</div>
						<div className='selectCustomerInfo flex flex-row gap-6'>
							<div className='space-y-2'>
								<Label className='text-blue-825'>Code</Label>
								<Input
									disabled
									className='border-gray-360 max-w-20 border shadow-inputShadowDrop'
									placeholder='Code'
									value={customerData.code}
								/>
							</div>
							<FormField
								control={form.control}
								name='mobile'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>
											Mobile Number
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												autoComplete='mobile'
												className='border-gray-360 border shadow-inputShadowDrop'
												id='mobile'
												maxLength={9}
												placeholder='Enter Mobile Number'
												type='number'
												onChange={(e) => {
													if (e.target.value.length < 10) {
														field.onChange(e)

														if (isSubmitted) {
															setIsSubmitted(false)
														}
													}
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='selectCustomerInfo flex w-full flex-row gap-6'>
							<FormField
								control={form.control}
								name='gender'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>
											Gender<span className='text-red-500'>*</span>
										</FormLabel>
										<FormControl>
											<Select
												disabled={field.disabled}
												name={field.name}
												value={field.value}
												onValueChange={(e) => {
													field.onChange(e)
												}}>
												<SelectTrigger
													ref={field.ref}
													className='border-gray-360 border shadow-inputShadowDrop'>
													<SelectValue placeholder='Gender' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem
														key={1}
														value='M'>
														Male
													</SelectItem>
													<SelectItem
														key={2}
														value='F'>
														Female
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='dob'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>
											Date of Birth
											<span className='text-red-500'>*</span>
										</FormLabel>
										<Popover>
											<PopoverTrigger
												asChild
												className='w-full'>
												<FormControl>
													<Button
														id='start'
														variant='outline'
														className={cn(
															'border-gray-360 w-full border pl-3 text-left font-normal text-black shadow-inputShadowDrop',
															!field.value && 'text-muted-foreground'
														)}>
														{field.value ? (
															format(field.value, 'PPP')
														) : (
															<span>Pick a date</span>
														)}
														<CalendarDays className='ml-auto h-4 w-4 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												align='start'
												className='w-auto p-0'>
												<>
													<Calendar
														initialFocus
														captionLayout='dropdown-buttons'
														className='p-0'
														fromYear={1900}
														id='DOB'
														mode='single'
														selected={field.value}
														toMonth={years18}
														toYear={years18.getFullYear()}
														classNames={{
															day_hidden: 'invisible',
															dropdown:
																'px-2 py-1.5 rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
															caption_dropdowns: 'flex gap-3',
															vhidden: 'hidden',
															caption_label: 'hidden'
														}}
														disabled={(date) =>
															date > years18 ||
															date < new Date('1900-01-01')
														}
														onSelect={(e) => {
															field.onChange(e)
														}}
													/>
												</>
											</PopoverContent>
										</Popover>
									</FormItem>
								)}
							/>
						</div>
						<div className='selectCustomerInfo flex flex-row gap-6'>
							<FormField
								control={form.control}
								name='driverExperience'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>
											Driver Experience
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='border-gray-360 border shadow-inputShadowDrop'
												id='driverExperience'
												placeholder='Enter Driver Experience'
												type='number'
												onChange={(e) => {
													if (e.target.value.length < 3) {
														field.onChange(e)
													}
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex w-full items-center justify-center'>
							{!isSubmitted && (
								<Button
									className='rounded-3xl px-10 py-5'
									variant='greenbtn'>
									Continue
								</Button>
							)}
						</div>
					</form>
				</Form>
				<div className='flex flex-row items-center justify-center'>
					{isLoading && (
						<ClipLoader
							color='#054CA0'
							size={40}
						/>
					)}
				</div>
			</div>
			{/* <span className='selectCustomerInfo -mt-6 font-jakarta text-xs text-gray-500'>
				We&apos;ll call or text you to confirm your number. Standard message and data rates
				apply. <span className='font-semibold text-gray-600'>Privacy Policy</span>
			</span>
			<Button
				className='selectCustomerInfo w-full'
				variant='greenbtn'
				onClick={goToConfirm}>
				View Premium
			</Button>
			<div className='flex items-center justify-center'>
				<div className='relative w-full border-t border-green-50'>
					<span className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform bg-white px-2'>
						Or
					</span>
				</div>
			</div>
			<OtherOptions /> */}
		</section>
	)
}
