import { BodyType } from './body-type'
import { SelectMark } from './select-mark'
import { SelectModel } from './select-model'
import { VehicleUsage } from './vehicle-usage'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { updateVehicleBasicInfo } from '@/redux/slices'
import { SelectFuel } from './select-fuel'
import { SelectColor } from './select-color'
import { cn } from '@/lib'

type EditContentsProps = {
	exitEdit: () => void
}

const vehicleBaseSchema = z.object({
	motorUsage: z.string().min(1, { message: 'Required' }),
	bodyType: z.string().min(1, { message: 'Required' }),
	make: z.string().min(1, { message: 'Required' }),
	model: z.string().min(1, { message: 'Required' }),
	manufactureyear: z.string().min(4, { message: 'Required' }),
	suminsured: z.string().min(4, { message: 'Minimum 1000' }),
	// purchasedYear: z.string().min(4, { message: 'Required' }),
	isRenewal: z.boolean(),
	regNo: z.string().min(1, {
		message: 'Registration Number is Required'
	}),
	chassisNo: z.string().min(2, {
		message: 'Please enter Chassis number'
	}),
	engineNo: z.string().min(2, {
		message: 'Please enter Engine Number'
	}),
	engineCapacity: z.string(),
	color: z.string().min(1, { message: 'Required' }),
	fuelType: z.string().min(1, { message: 'Required' }),
	tareweight: z.string().min(1, { message: 'Required' }),
	grossweight: z.string().min(1, { message: 'Required' }),
	seats: z.string().min(1, { message: 'Required' })
})

export function EditContents(props: EditContentsProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

	const [formattedValue, setFormattedValue] = useState<string>(vehicleData.value.toLocaleString())

	const dispatch = useAppDispatch()

	const years: string[] = []

	const currentYear = new Date(Date.now()).getFullYear()

	for (let i = currentYear; i > currentYear - 30; i--) {
		years.push(i + '')
	}

	const form = useForm<z.infer<typeof vehicleBaseSchema>>({
		resolver: zodResolver(vehicleBaseSchema),
		defaultValues: {
			motorUsage: vehicleData.vehicleUsageID,
			bodyType: vehicleData.bodyTypeID,
			make: vehicleData.makeID,
			model: vehicleData.modelID,
			manufactureyear: vehicleData.year === 0 ? '' : vehicleData.year + '',
			isRenewal: vehicleData.isRenewal,
			suminsured: vehicleData.sumInsured !== null ? vehicleData.sumInsured : '',
			chassisNo: vehicleData.chassisNumber,
			color: vehicleData.color,
			engineCapacity: vehicleData.engineCapacity,
			engineNo: vehicleData.engineNumber,
			fuelType: vehicleData.fuelType,
			grossweight: vehicleData.grossweight,
			regNo: vehicleData.registrationNumber,
			seats: vehicleData.seat + '',
			tareweight: vehicleData.tareweight
		}
	})

	function onSubmit(values: z.infer<typeof vehicleBaseSchema>) {
		dispatch(
			updateVehicleBasicInfo({
				suminsured: values.suminsured,
				isRenewal: values.isRenewal,
				manufactureyear: values.manufactureyear,
				chassisNumber: values.chassisNo,
				color: values.color,
				engineCapacity: values.engineCapacity,
				engineNumber: values.engineNo,
				grossweight: values.grossweight,
				registrationNumber: values.regNo,
				seat: values.seats,
				tareweight: values.tareweight,
				fueltype: values.fuelType,
				classId: '103'
			})
		)
		setIsSubmitted(true)
		props.exitEdit()
	}

	function setSubmittedStatus() {
		if (isSubmitted) {
			setIsSubmitted(false)
		}
	}

	return (
		<Form {...form}>
			<form
				className='space-y-8'
				onSubmit={form.handleSubmit(onSubmit)}>
				<section className='flex flex-col gap-2'>
					<BodyType
						form={form}
						setSubmittedStatus={setSubmittedStatus}
					/>
					<SelectMark
						form={form}
						setSubmittedStatus={setSubmittedStatus}
					/>

					<SelectModel
						form={form}
						setSubmittedStatus={setSubmittedStatus}
					/>
					<VehicleUsage
						form={form}
						setSubmittedStatus={setSubmittedStatus}
					/>

					<FormField
						control={form.control}
						name='manufactureyear'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-blue-825'>Manufacture Year</FormLabel>
								<FormControl>
									<Select
										disabled={field.disabled}
										name={field.name}
										value={field.value}
										onValueChange={(e) => {
											field.onChange(e)

											if (isSubmitted) {
												setIsSubmitted(false)
											}
										}}>
										<SelectTrigger
											ref={field.ref}
											className='border-gray-360 border shadow-inputShadowDrop'>
											<SelectValue placeholder='Manufacture Year' />
										</SelectTrigger>
										<SelectContent className='max-h-[40vh]'>
											{years.map((year) => {
												return (
													<SelectItem
														key={year}
														value={year}>
														{year}
													</SelectItem>
												)
											})}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='suminsured'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-blue-825'>Sum Insured</FormLabel>
								<FormControl>
									<Input
										className='border-gray-360 border shadow-inputShadowDrop'
										placeholder='Sum Insured'
										value={formattedValue}
										onChange={(e) => {
											let inputValue = e.target.value
											inputValue = inputValue.replace(/[^0-9]/g, '')
											const numericValue = Number(inputValue)
											const formattedValue = numericValue.toLocaleString()
											field.onChange(numericValue + '')
											setFormattedValue(formattedValue)
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<SelectColor
						form={form}
						setSubmittedStatus={setSubmittedStatus}
					/>
					<FormField
						control={form.control}
						name='regNo'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-blue-825'>
									Registration Number
									<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='border-gray-360 border shadow-inputShadowDrop'
										id='regNo'
										placeholder='Registration Number'
										onChange={(e) => {
											if (e.target.value.length < 20) {
												field.onChange(e)
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
						name='chassisNo'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-blue-825'>
									Chassis number
									<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='border-gray-360 border shadow-inputShadowDrop'
										id='chassisNo'
										placeholder='Enter Chassis number'
										onChange={(e) => {
											if (e.target.value.length < 20) {
												field.onChange(e)
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
						name='engineNo'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-blue-825'>
									Engine Number<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='border-gray-360 border shadow-inputShadowDrop'
										id='engineNo'
										placeholder='Enter Engine Number'
										onChange={(e) => {
											if (e.target.value.length < 20) {
												field.onChange(e)
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
						name='engineCapacity'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-blue-825'>Engine Capacity</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='border-gray-360 border shadow-inputShadowDrop'
										id='engineCapacity'
										placeholder='Enter Engine Capacity'
										type='number'
										onChange={(e) => {
											if (e.target.value.length < 6) {
												field.onChange(e)
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
						name='tareweight'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-blue-825'>Tare Weight (kg)</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='border-gray-360 border shadow-inputShadowDrop'
										id='tareweight'
										placeholder='Enter Tare Weight (kg)'
										type='number'
										onChange={(e) => {
											if (e.target.value.length < 6) {
												field.onChange(e)
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
						name='grossweight'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-blue-825'>Gross Weight (kg)</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='border-gray-360 border shadow-inputShadowDrop'
										id='grossweight'
										placeholder='Enter Tare Weight (kg)'
										type='number'
										onChange={(e) => {
											if (e.target.value.length < 6) {
												field.onChange(e)
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
						name='seats'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-blue-825'>Seat Capacity</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='border-gray-360 border shadow-inputShadowDrop'
										id='seats'
										placeholder='Enter Seat Capacity'
										type='number'
										onChange={(e) => {
											if (e.target.value.length < 6) {
												field.onChange(e)
											}
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<SelectFuel
						form={form}
						setSubmittedStatus={setSubmittedStatus}
					/>
					<FormField
						control={form.control}
						name='isRenewal'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-blue-825'>
									Renew your Existing Policy
								</FormLabel>
								<FormControl>
									<div className='selectDriver flex flex-row gap-5'>
										<div
											className={cn(
												'cursor-pointer rounded-3xl border border-gray-700 bg-white px-7 py-2 font-inter font-semibold text-gray-700',
												{
													'border-none bg-green-600 text-white':
														field.value === true
												}
											)}
											onClick={() => {
												field.onChange(true)

												if (isSubmitted) {
													setIsSubmitted(false)
												}
											}}>
											Yes
										</div>
										<div
											className={cn(
												'cursor-pointer rounded-3xl border border-gray-700 bg-white px-7 py-2 font-inter font-semibold text-gray-700',
												{
													'border-none bg-green-600 text-white':
														field.value === false
												}
											)}
											onClick={() => {
												field.onChange(false)

												if (isSubmitted) {
													setIsSubmitted(false)
												}
											}}>
											No
										</div>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>

					<div className='flex w-full items-center justify-center pt-10'>
						{!isSubmitted && (
							<Button
								className='rounded-3xl px-32 py-5'
								variant='greenbtn'>
								Continue
							</Button>
						)}
					</div>
				</section>
			</form>
		</Form>
	)
}
