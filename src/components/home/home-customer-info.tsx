import { z } from 'zod'
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Label } from '../ui/label'
import { useState } from 'react'
import { type SaveCustomerDetailRequest } from '@/services/models/common.models'
import { useToast } from '../ui/use-toast'
import { updateDetailsFromHome } from '@/redux/slices'
import { updateCustomerReferenceNumber } from '@/redux/slices/non-motor-details.slice'
import { useSaveCustomerDetailsMutation } from '@/redux/api/homeApi'

const customerInfoSchema = z.object({
	name: z.string().min(3, { message: 'name should be atleast 3 characters' }).max(50),
	mobile: z.string().min(9, { message: 'Enter valid number' }),
	email: z.string().min(9, { message: 'Enter Email' }),
	city: z.string().min(1, { message: 'Address Required' }),
	pobox: z.string().min(6, { message: 'POBox Required' }),
	gender: z.string().min(1, { message: 'Gender Required' }),
	nrc: z.string().min(10, { message: 'Id Required' })
})

type HomeCustomerInfoProps = {
	goNext?: () => void
}

export function HomeCustomerInfo(props: HomeCustomerInfoProps) {
	const customerData = useAppSelector((state) => state.customerDetails)

	const appData = useAppSelector((state) => state.apps)

	const dispatch = useAppDispatch()

	const [saveCustomerDetails] = useSaveCustomerDetailsMutation()

	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
	// const [isLoading, setIsLoading] = useState<boolean>(false)

	const form = useForm<z.infer<typeof customerInfoSchema>>({
		resolver: zodResolver(customerInfoSchema),
		defaultValues: {
			name: customerData.name,
			mobile: customerData.mobile
		}
	})

	const { toast } = useToast()

	function onSubmit(values: z.infer<typeof customerInfoSchema>) {
		dispatch(
			updateDetailsFromHome({
				name: values.name,
				mobile: values.mobile,
				email: values.email,
				city: values.city,
				pobox: values.pobox,
				gender: values.gender,
				nrc: values.nrc
			})
		)
		//values: z.infer<typeof customerInfoSchema>
		const request: SaveCustomerDetailRequest = {
			BrokerBranchCode: appData.branchCode,
			InsuranceId: appData.insuranceID,
			BranchCode: appData.branchCode,
			ProductId: appData.productId,
			AppointmentDate: '',
			BusinessType: null,
			CityCode: values.pobox,
			CityName: values.city,
			ClientName: values.name,
			Clientstatus: 'Y',
			CreatedBy: appData.loginId,
			DobOrRegDate: '',
			Email1: values.email,
			Email2: null,
			Email3: null,
			Fax: null,
			Gender: values.gender,
			IdNumber: values.nrc,
			IdType: '1',
			IsTaxExempted: 'N',
			Language: '1',
			MobileNo1: values.mobile,
			MobileNo2: '',
			MobileNo3: null,
			Nationality: 'ZMB',
			Occupation: '1',
			PolicyHolderType: '1',
			PolicyHolderTypeid: '1',
			PreferredNotification: 'Sms',
			RegionCode: values.pobox,
			MobileCode1: customerData.code,
			WhatsappCode: customerData.code,
			MobileCodeDesc1: '1',
			WhatsappDesc: '1',
			WhatsappNo: '',
			StateCode: '37',
			StateName: null,
			Status: 'Y',
			Type: 'Personal',
			TaxExemptedId: null,
			TelephoneNo1: '',
			PinCode: values.pobox,
			TelephoneNo2: null,
			TelephoneNo3: null,
			VrTinNo: null,
			Title: '5',
			Address1: values.city,
			SaveOrSubmit: 'Save',
			Zone: '1'
		}
		const res = saveCustomerDetails(request)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError !== true &&
				value.data.data.Result !== null
			) {
				dispatch(updateCustomerReferenceNumber(value.data.data.Result.SuccessId))
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
		})

		if (props.goNext) {
			props.goNext()
		}
	}

	return (
		<div className='flex w-full flex-col gap-4'>
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
									<FormLabel className='text-blue-825'>Full Name</FormLabel>
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
									<FormLabel className='text-blue-825'>Mobile Number</FormLabel>
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
						{/* <Input
                    placeholder='Mobile Number'
                    type='number'
                    value={customerData.mobile}
                    onChange={(e) => {
                        if (e.target.value.length < 9) {
                            dispatch(updateMobile(e.target.value))
                        }
                    }}
                /> */}
					</div>
					<div className='selectCustomerInfo flex flex-row gap-6'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel className='text-blue-825'>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											autoComplete='mobile'
											className='border-gray-360 border shadow-inputShadowDrop'
											id='email'
											placeholder='Enter Email'
											type='email'
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
					</div>
					<div className='selectCustomerInfo flex flex-row gap-6'>
						<FormField
							control={form.control}
							name='city'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel className='text-blue-825'>City</FormLabel>
									<FormControl>
										<Input
											{...field}
											autoComplete='mobile'
											className='border-gray-360 border shadow-inputShadowDrop'
											id='city'
											placeholder='Enter City'
											type='city'
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
						<FormField
							control={form.control}
							name='pobox'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel className='text-blue-825'>POBOX</FormLabel>
									<FormControl>
										<Input
											{...field}
											autoComplete='mobile'
											className='border-gray-360 border shadow-inputShadowDrop'
											id='pobox'
											placeholder='Enter Pobox'
											type='pobox'
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
					</div>
					<div className='selectCustomerInfo flex flex-row gap-6'>
						<FormField
							control={form.control}
							name='gender'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
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
												className='border border-gray-375 bg-gray-975'>
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
							name='nrc'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel className='text-blue-825'>Id Number(NRC)</FormLabel>
									<FormControl>
										<Input
											{...field}
											autoComplete='mobile'
											className='border-gray-360 border shadow-inputShadowDrop'
											id='nrc'
											placeholder='Enter nrc'
											type='nrc'
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
			{/* <div className='flex flex-row items-center justify-center'>
				{isLoading && (
					<ClipLoader
						color='#054CA0'
						size={40}
					/>
				)}
			</div> */}
		</div>
	)
}
