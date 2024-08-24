'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import { zodResolver } from '@hookform/resolvers/zod'
import gsap from 'gsap'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { updateVehicleBasicInfo } from '@/redux/slices'
import { cn } from '@/lib'
import { SelectMark } from './select-mark'
import { SelectModel } from './select-model'
import { VehicleUsage } from './vehicle-usage'
import { TextPlugin } from 'gsap/all'
import { BodyType } from './body-type'

const vehicleBaseSchema = z.object({
	motorUsage: z.string().min(1, { message: 'Required' }),
	bodyType: z.string().min(1, { message: 'Required' }),
	make: z.string().min(1, { message: 'Required' }),
	model: z.string().min(1, { message: 'Required' }),
	manufactureyear: z.string().min(4, { message: 'Required' }),
	suminsured: z.string().min(4, { message: 'Minimum 1000' }),
	// purchasedYear: z.string().min(4, { message: 'Required' }),
	isRenewal: z.boolean()
})
gsap.registerPlugin(TextPlugin)

type VehcileBaseInfoProps = {
	goNext: () => void
}

export function VehcileBaseInfo(props: VehcileBaseInfoProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

	const dispatch = useAppDispatch()

	const [formattedValue, setFormattedValue] = useState<string>(vehicleData.value.toLocaleString())

	const years: string[] = []

	const currentYear = new Date(Date.now()).getFullYear()

	for (let i = currentYear; i > currentYear - 30; i--) {
		years.push(i + '')
	}

	useGSAP(() => {
		gsap.from('.selectVehicleBaseInfo', { y: 80, opacity: 0, duration: 0.8 })
		gsap.to('.VehicleTitle', { duration: 0.8, text: 'Vehicle Information' })
		gsap.to('.VehicleSubTitle', {
			duration: 0.8,
			text: 'Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.',
			delay: 0.5
		})
	})

	const form = useForm<z.infer<typeof vehicleBaseSchema>>({
		resolver: zodResolver(vehicleBaseSchema),
		defaultValues: {
			motorUsage: vehicleData.vehicleUsageID,
			bodyType: vehicleData.bodyTypeID,
			make: vehicleData.makeID,
			model: vehicleData.modelID,
			manufactureyear: vehicleData.year === 0 ? '' : vehicleData.year + '',
			isRenewal: vehicleData.isRenewal,
			suminsured: vehicleData.sumInsured !== null ? vehicleData.sumInsured : ''
		}
	})

	function onSubmit(values: z.infer<typeof vehicleBaseSchema>) {
		dispatch(
			updateVehicleBasicInfo({
				suminsured: values.suminsured,
				isRenewal: values.isRenewal,
				manufactureyear: values.manufactureyear
			})
		)
		setIsSubmitted(true)
		props.goNext()
	}

	function setSubmittedStatus() {
		if (isSubmitted) {
			setIsSubmitted(false)
		}
	}

	return (
		<section className='flex w-full flex-col items-center gap-16 lg:w-4/5'>
			<div className='flex w-full flex-col items-center gap-4'>
				<div className='flex flex-row -space-x-7'>
					<div className='h-10 w-10 rounded-full bg-black'></div>
					<div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg font-medium text-white'>
						1
					</div>
				</div>
				<h1 className='VehicleTitle text-center font-inter text-4xl font-bold text-blue-825'></h1>
				<p className='VehicleSubTitle w-4/5 text-center font-roboto text-sm text-gray-500'></p>
			</div>
			<div className='flex w-full flex-col gap-4 lg:w-4/5 xl:w-3/5'>
				<Form {...form}>
					<form
						className='space-y-8'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
							<BodyType
								form={form}
								setSubmittedStatus={setSubmittedStatus}
							/>
							<SelectMark
								form={form}
								setSubmittedStatus={setSubmittedStatus}
							/>
						</div>
						<div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
							<SelectModel
								form={form}
								setSubmittedStatus={setSubmittedStatus}
							/>
							<VehicleUsage
								form={form}
								setSubmittedStatus={setSubmittedStatus}
							/>
							{/* <FormField
								control={form.control}
								name='bodyType'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>Body Type</FormLabel>
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
													className='border border-gray-360 shadow-inputShadowDrop'>
													<SelectValue placeholder='Select Body Type' />
												</SelectTrigger>
												<SelectContent>
													{bodyTypes.map((bodyType, index) => {
														return (
															<SelectItem
																key={index}
																value={bodyType.id}>
																{bodyType.name}
															</SelectItem>
														)
													})}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/> */}
						</div>

						<div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
							<FormField
								control={form.control}
								name='manufactureyear'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>
											Manufacture Year
										</FormLabel>
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
													const formattedValue =
														numericValue.toLocaleString()
													field.onChange(numericValue + '')
													setFormattedValue(formattedValue)
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
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
						</div>
						<div className='flex w-full items-center justify-center pt-10'>
							{!isSubmitted && (
								<Button
									className='rounded-3xl px-32 py-5'
									variant='greenbtn'>
									Continue
								</Button>
							)}
						</div>
					</form>
				</Form>
			</div>
		</section>
	)
}
