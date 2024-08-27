'use client'

import { useState } from 'react'
import { PersonalInformationField } from './personal-information-field'
import { IdentificationDetailsField } from './identification-details-field'
import { AddressDetailsField } from './address-details-field'
import { Button } from '../ui'
import { useRouter } from 'next/navigation'
import { CustomerDetailsTab } from './customer-details-tab'
import { z } from 'zod'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
	updateAddressDetails,
	updateContactInformation,
	updateIdentificationDetails,
	updatePersonalDetails,
	updateQuoteDetails
} from '@/redux/slices'
import { cn, formatDateDDMMYYYY } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { useBuyPolicyMutation, useSaveCustomerDetailsMutation } from '@/redux/api/commonApi'
import ClipLoader from 'react-spinners/ClipLoader'
import { useToast } from '../ui/use-toast'

const formSchema = z.object({
	accountType: z.string(),
	title: z.string().min(1, {
		message: 'Select a title'
	}),
	firstname: z.string().min(2, {
		message: 'Please enter First Name'
	}),
	lastname: z.string().min(2, {
		message: 'Please enter Last Name'
	}),
	gender: z.string(),
	occupation: z.string().min(1, {
		message: 'Please enter Occupation'
	}),
	mobile: z.string().min(2, {
		message: 'Please enter Mobile number'
	}),
	dob: z.date().optional(),
	residentialaddress: z.string().min(4, {
		message: 'Residential Address is required'
	}),
	citytown: z.string().min(1, {
		message: 'City or Town is required'
	}),
	pobox: z.string().optional(),
	workaddress: z.string().optional(),
	district: z.string().min(1, {
		message: 'City or Town is required'
	}),
	mailId: z.string(),
	contact1: z.string().min(4, {
		message: 'Contact number is required'
	}),
	contact2: z.string(),
	contact1Code: z.string().min(3, {
		message: 'Required'
	}),
	contact2Code: z.string(),
	country: z.string(),
	cityName: z.string(),
	idType: z.string().min(1, {
		message: 'Select a type'
	}),
	idNumber: z.string().min(1, {
		message: 'Required'
	})
})

export type CustomerFormType = UseFormReturn<
	{
		accountType: string
		title: string
		firstname: string
		lastname: string
		gender: string
		occupation: string
		mobile: string
		dob?: Date | undefined
		residentialaddress: string
		citytown: string
		cityName: string
		mailId: string
		contact1: string
		contact2: string
		contact1Code: string
		contact2Code: string
		workaddress?: string | undefined
		district: string
		pobox?: string | undefined
		country: string
		idType: string
		idNumber: string
	},
	unknown,
	undefined
>

export function CustomerDetailsForm() {
	const customerData = useAppSelector((state) => state.customerDetails)
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appData = useAppSelector((state) => state.apps)
	const motorData = useAppSelector((state) => state.motor)

	const [saveCustomerDetails] = useSaveCustomerDetailsMutation()
	const [isLoading, setIsLoading] = useState(false)

	const { toast } = useToast()

	const [buyPolicies] = useBuyPolicyMutation()

	const route = useRouter()

	const [customerType, setCustomerType] = useState<string>('Personal')

	const parts = vehicleData.DriverDOB.split('/')
	const dateObject = new Date(+parts[2], +parts[1] - 1, +parts[0])
	const timestamp = dateObject.getTime()

	const custDob = customerData.dob.split('/')
	const dateObject2 = new Date(+custDob[2], +custDob[1] - 1, +custDob[0])
	const timestamp2 = dateObject2.getTime()

	function navigateToVehicle(values: z.infer<typeof formSchema>) {
		setIsLoading(true)
		const req = {
			BrokerBranchCode: appData.brokerCode,
			CustomerReferenceNo: motorData.CustomerReferenceNo,
			InsuranceId: appData.insuranceID,
			BranchCode: appData.branchCode,
			ProductId: appData.productId,
			AppointmentDate: '',
			BusinessType: null,
			CityCode: customerData.poBox,
			CityName: values.cityName,
			ClientName: customerData.name,
			Clientstatus: 'Y',
			CreatedBy: appData.loginId,
			DobOrRegDate: values.dob !== undefined ? formatDateDDMMYYYY(values.dob) : '',
			District: values.citytown,
			Email1: customerData.email,
			Email2: null,
			Email3: null,
			Fax: null,
			Gender: values.gender,
			IdNumber: values.idNumber,
			IdType: '1',
			IsTaxExempted: 'N',
			Language: '1',
			MobileNo1: customerData.mobile,
			MobileNo2: customerData.mobile2,
			MobileNo3: null,
			Nationality: 'ZMB',
			Occupation: '1',
			OtherOccupation: '',
			Placeofbirth: values.cityName,
			PolicyHolderType: '1',
			PolicyHolderTypeid: '1',
			PreferredNotification: 'Sms',
			RegionCode: values.citytown,
			MobileCode1: customerData.code,
			WhatsappCode: customerData.code,
			MobileCodeDesc1: '1',
			WhatsappDesc: '1',
			WhatsappNo: '',
			StateCode: '37',
			StateName: null,
			Status: 'Y',
			Type: customerData.accType,
			TaxExemptedId: null,
			TelephoneNo1: '',
			PinCode: values.pobox ? values.pobox : '',
			TelephoneNo2: null,
			TelephoneNo3: null,
			VrTinNo: null,
			Title: '1',
			Address1: values.residentialaddress,
			SaveOrSubmit: 'Submit',
			Zone: '1'
		}
		const res = saveCustomerDetails(req)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError !== true &&
				value.data.data.Result !== null
			) {
				buyPolicy()
				route.push('/car-insurance/details/vehicle-details')
			} else if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError === true &&
				value.data.data.ErrorMessage !== null &&
				value.data.data.ErrorMessage.length !== 0
			) {
				setIsLoading(false)
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: value.data.data.ErrorMessage[0].Message
				})
			} else {
				setIsLoading(false)
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'There was a problem with your request.'
				})
			}
		})
	}

	function buyPolicy() {
		const req = {
			RequestReferenceNo: motorData.RequestReferenceNo,
			CreatedBy: appData.loginId,
			ProductId: appData.productId,
			ManualReferralYn: 'N',
			ReferralRemarks: null,
			Vehicles: [
				{
					Covers: appData.covers,
					Id: '1',
					SectionId: '104'
				}
			]
		}
		const res = buyPolicies(req)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.Result !== null
			) {
				dispatch(
					updateQuoteDetails({
						CustomerId: value.data.data.Result.CustomerId
							? value.data.data.Result.CustomerId
							: '',
						QuoteNo:
							value.data.data.Result.QuoteNo !== null
								? value.data.data.Result.QuoteNo
								: ''
					})
				)
				setIsLoading(false)
				route.push('/car-insurance/details/vehicle-details')
			} else if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError === true &&
				value.data.data.ErrorMessage !== null &&
				value.data.data.ErrorMessage.length !== 0
			) {
				setIsLoading(false)
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: value.data.data.ErrorMessage[0].Message
				})
			} else {
				setIsLoading(false)
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'There was a problem with your request.'
				})
			}
		})
	}

	const dispatch = useAppDispatch()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			accountType: 'Personal',
			title: 'Mr', //customerData.title
			firstname: customerData.name.split(' ')[0],
			lastname: customerData.name.split(' ')[1],
			mobile: customerData.mobile,
			gender: customerData.gender,
			occupation: customerData.occupation,
			dob:
				vehicleData.driverOrOwner === 'Owner'
					? new Date(timestamp)
					: customerData.dob !== ''
						? new Date(timestamp2)
						: undefined,
			mailId: customerData.email,
			contact1: customerData.mobile,
			contact2: customerData.mobile2,
			contact1Code: customerData.code,
			contact2Code: customerData.code2,
			residentialaddress: customerData.address,
			citytown: customerData.city,
			district: customerData.district,
			pobox: customerData.poBox,
			country: customerData.country,
			idType: customerData.idType + '',
			idNumber: customerData.idType === 7 ? customerData.nrc : customerData.passport
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (values.accountType === 'Personal') {
			dispatch(
				updatePersonalDetails({
					title: values.title,
					gender: values.gender,
					occupation: values.occupation,
					dob: values.dob !== undefined ? formatDateDDMMYYYY(values.dob) : '',
					name: values.firstname + ' ' + values.lastname,
					mobile: values.mobile,
					accountType: values.accountType
				})
			)
			dispatch(
				updateContactInformation({
					code: values.contact1Code,
					email: values.mailId,
					mobile: values.contact1,
					code2: values.contact2Code,
					mobile2: values.contact2
				})
			)
		} else {
			dispatch(
				updatePersonalDetails({
					title: values.title,
					gender: values.gender,
					occupation: values.occupation,
					dob: values.dob !== undefined ? formatDateDDMMYYYY(values.dob) : '',
					name: values.firstname + values.lastname,
					mobile: values.mobile,
					accountType: values.accountType
				})
			)
			dispatch(
				updateContactInformation({
					code: values.contact1Code,
					email: values.mailId,
					mobile: values.contact1,
					code2: values.contact2Code,
					mobile2: values.contact2
				})
			)
		}

		dispatch(
			updateAddressDetails({
				address: values.residentialaddress,
				city: values.citytown,
				poBox: values.pobox !== undefined ? values.pobox : '',
				workAddress: values.workaddress !== undefined ? values.workaddress : '',
				cityName: values.cityName,
				country: values.country,
				district: values.district
			})
		)
		dispatch(
			updateIdentificationDetails({
				nrc: values.idType === '7' ? values.idNumber : '',
				passport: values.idType === '3' ? values.idNumber : '',
				isResident: true,
				companyNumber: values.accountType === 'Corporate' ? values.idNumber : '',
				idType: +values.idType
			})
		)
		navigateToVehicle(values)
	}

	return (
		<section className='flex h-full w-full flex-col items-center gap-10 py-10'>
			<CustomerDetailsTab />
			<section className='flex w-full flex-col items-center gap-10'>
				<Form {...form}>
					<form
						className='w-4/5 space-y-8'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex w-full flex-row items-center justify-center gap-12'>
							<FormLabel>
								Account Type<span className='text-red-500'>*</span> :
							</FormLabel>
							<FormField
								control={form.control}
								name='accountType'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className='flex flex-grow flex-row gap-8'>
												<div
													className={cn(
														'cursor-pointer rounded-md px-8 py-1 font-semibold text-gray-875',
														{
															'bg-blue-875 text-white':
																field.value === 'Personal'
														}
													)}
													onClick={() => {
														field.onChange('Personal')
														setCustomerType('Personal')
													}}>
													Personal
												</div>
												<div
													className={cn(
														'cursor-pointer rounded-md px-8 py-1 font-semibold text-gray-875',
														{
															'bg-blue-875 text-white':
																field.value === 'Corporate'
														}
													)}
													onClick={() => {
														field.onChange('Corporate')
														setCustomerType('Corporate')
													}}>
													Corporate
												</div>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<section className='flex flex-col justify-between gap-5'>
							<div className='grid w-full grid-cols-4 gap-5'>
								<PersonalInformationField
									customer={customerType}
									form={form}
								/>
								<IdentificationDetailsField form={form} />
							</div>
							{/* <BusinessDetailsField
								current={current}
								goNext={goNext}
								goSpecific={goSpecific}
								pos={3}
							/> */}
							<h3 className='font-jakarta text-lg font-semibold'>Address Details</h3>
							<div className='grid w-full grid-cols-4 gap-5'>
								<AddressDetailsField form={form} />
							</div>
						</section>
						<div className='flex w-full items-center justify-center'>
							<Button
								className='w-1/4'
								variant='greenbtn'>
								{isLoading ? (
									<ClipLoader
										color='#FFFFFF'
										size={20}
									/>
								) : (
									<span>Next</span>
								)}
							</Button>
						</div>
					</form>
				</Form>
			</section>
		</section>
	)
}
