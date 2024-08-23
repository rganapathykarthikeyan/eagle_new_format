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
	updatePersonalDetails
} from '@/redux/slices'
import { cn, formatDateDDMMYYYY } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm, type UseFormReturn } from 'react-hook-form'

const formSchema = z.object({
	accountType: z.string(),
	customerOrInsured: z.string(),
	title: z.string().min(1, {
		message: 'Select a title'
	}),
	firstname: z.string().min(2, {
		message: 'Please enter First Name'
	}),
	SocioCategory: z.string().min(2, {
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
	mailId: z.string().min(6, {
		message: 'Invalid mail id'
	}),
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
	civility: z.string(),
	idType: z.string().min(1, {
		message: 'Select a type'
	}),
	idNumber: z.string().min(1, {
		message: 'Required'
	}),
	preferredNotification: z.string().min(1, {
		message: 'Required'
	}),
	taxExempted: z.boolean(),
	status: z.string().min(1, {
		message: 'Required'
	})
})

export type CustomerFormType = UseFormReturn<
	{
		accountType: string
		customerOrInsured: string
		title: string
		SocioCategory: string
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
		civility: string
		idType: string
		idNumber: string
		preferredNotification: string
		taxExempted: boolean
		status: string
	},
	unknown,
	undefined
>

export function CustomerDetailsForm() {
	const customerData = useAppSelector((state) => state.customerDetails)
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const route = useRouter()

	const [customerType, setCustomerType] = useState<string>('Personal')

	const parts = vehicleData.DriverDOB.split('/')
	const dateObject = new Date(+parts[2], +parts[1] - 1, +parts[0])
	const timestamp = dateObject.getTime()

	const custDob = customerData.dob.split('/')
	const dateObject2 = new Date(+custDob[2], +custDob[1] - 1, +custDob[0])
	const timestamp2 = dateObject2.getTime()

	function navigateToVehicle() {
		route.push('/car-insurance/details/vehicle-details')
	}

	const dispatch = useAppDispatch()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			accountType: 'Personal',
			customerOrInsured: 'Customer',
			title: customerData.title,
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
			taxExempted: false
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
				cityName: values.cityName
			})
		)

		navigateToVehicle()
	}

	return (
		<section className='flex h-full w-full flex-col items-center gap-10 py-10'>
			<CustomerDetailsTab />
			<section className='flex w-full flex-col items-center gap-10'>
				<Form {...form}>
					<form
						className='w-4/5 space-y-8'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex w-full flex-row items-center justify-between gap-5'>
							<div className='flex w-full flex-row items-center gap-5'>
								<FormLabel className='w-full'>
									Account Type<span className='text-red-500'>*</span>
								</FormLabel>
								<FormField
									control={form.control}
									name='accountType'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormControl>
												<div className='flex flex-grow flex-row gap-8'>
													<div
														className={cn(
															'text-gray-875 cursor-pointer rounded-md px-8 py-1 font-semibold',
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
															'text-gray-875 cursor-pointer rounded-md px-8 py-1 font-semibold',
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
							<div className='flex w-full flex-row items-center gap-5'>
								<FormLabel className='w-full'>
									<span className='w-full'>
										Customer or Insured<span className='text-red-500'>*</span>
									</span>
								</FormLabel>
								<FormField
									control={form.control}
									name='customerOrInsured'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormControl>
												<div className='flex flex-grow flex-row gap-8'>
													<div
														className={cn(
															'text-gray-875 cursor-pointer rounded-md px-8 py-1 font-semibold',
															{
																'bg-blue-875 text-white':
																	field.value === 'Customer'
															}
														)}
														onClick={() => {
															field.onChange('Customer')
														}}>
														Customer
													</div>
													<div
														className={cn(
															'text-gray-875 cursor-pointer rounded-md px-8 py-1 font-semibold',
															{
																'bg-blue-875 text-white':
																	field.value === 'Insured'
															}
														)}
														onClick={() => {
															field.onChange('Insured')
														}}>
														Insured
													</div>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<section className='flex flex-col justify-between gap-5'>
							<div className='grid w-full grid-cols-4 gap-5'>
								<PersonalInformationField
									customer={customerType}
									form={form}
								/>
							</div>
							<div className='grid w-full grid-cols-4 gap-5'>
								<IdentificationDetailsField form={form} />
							</div>
							{/* <BusinessDetailsField
								current={current}
								goNext={goNext}
								goSpecific={goSpecific}
								pos={3}
							/> */}
							<div className='grid w-full grid-cols-4 gap-5'>
								<AddressDetailsField form={form} />
							</div>
						</section>
						<div className='flex w-full items-center justify-center'>
							<Button
								className='w-1/4'
								variant='greenbtn'>
								Submit
							</Button>
						</div>
					</form>
				</Form>
			</section>
		</section>
	)
}
