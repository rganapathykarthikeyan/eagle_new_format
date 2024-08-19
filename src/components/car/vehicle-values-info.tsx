import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button, Input } from '../ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateVehicleValueInfo } from '@/redux/slices'
import { BodyType } from './body-type'
import { FuelType } from './fuel-type'

const vehicleValueInfoSchema = z.object({
	fuelType: z.string().min(1, { message: 'Required' }),
	bodyType: z.string().min(1, { message: 'Required' }),
	seatingCapacity: z.string().min(1, { message: 'Required' }),
	engineCapacity: z.string().min(1, { message: 'Required' })
})

type VehcileValuesInfoProps = {
	goNext: () => void
}

export function VehcileValuesInfo(props: VehcileValuesInfoProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
	useGSAP(() => {
		gsap.from('.selectVehicleValuesInfo', { y: 80, opacity: 0, duration: 0.5 })
	})

	const dispatch = useAppDispatch()

	const form = useForm<z.infer<typeof vehicleValueInfoSchema>>({
		resolver: zodResolver(vehicleValueInfoSchema),
		defaultValues: {
			fuelType: vehicleData.fuelType,
			bodyType: vehicleData.bodyType,
			seatingCapacity: vehicleData.seat + '',
			engineCapacity: vehicleData.engineCapacity
		}
	})

	function onSubmit(values: z.infer<typeof vehicleValueInfoSchema>) {
		dispatch(
			updateVehicleValueInfo({
				engineCapacity: values.engineCapacity,
				seats: values.seatingCapacity
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
		<section className='flex w-full flex-col items-center gap-10 lg:w-4/5'>
			<div className='flex w-full flex-col items-center gap-4'>
				<div className='flex flex-row -space-x-7'>
					<div className='h-10 w-10 rounded-full bg-black'></div>
					<div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg font-medium text-white'>
						2
					</div>
				</div>
				<h1 className='text-center font-inter text-4xl font-bold text-blue-825'>
					Vehicle Information
				</h1>
				<p className='w-4/5 text-center font-roboto text-sm text-gray-500'>
					Please fill the form below to receive a quote for your project. Feel free to add
					as much detail as needed.
				</p>
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
							<FormField
								control={form.control}
								name='seatingCapacity'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>
											Enter Number of Seats
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='border-gray-360 border shadow-inputShadowDrop'
												id='seatingCapacity'
												placeholder='Please Enter Number of Seats'
												type='number'
												onChange={(e) => {
													if (e.target.value.length < 3) {
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
						{/* <div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
							<FormField
								control={form.control}
								name='deductibles'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>Deductibles</FormLabel>
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
													<SelectValue placeholder='Deductibles' />
												</SelectTrigger>
												<SelectContent>
													{deductibles.map((deductible, index) => {
														return (
															<SelectItem
																key={index}
																value={deductible.value}>
																{deductible.label}
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
								name='defensiveCost'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>
											Defensive Cost
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
													className='border border-gray-360 shadow-inputShadowDrop'>
													<SelectValue placeholder='Defensive Cost' />
												</SelectTrigger>
												<SelectContent>
													{deductibles
														.slice(0, 1)
														.map((bodyType, index) => {
															return (
																<SelectItem
																	key={index}
																	value={bodyType.value}>
																	{bodyType.label}
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
						</div> */}
						<div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
							<FormField
								control={form.control}
								name='engineCapacity'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>
											Enter Cubic Capacity or Tonnage
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='border-gray-360 border shadow-inputShadowDrop'
												id='engineCapacity'
												placeholder='Please Enter Cubic Capacity'
												type='number'
												onChange={(e) => {
													if (e.target.value.length < 7) {
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
							<FuelType
								form={form}
								setSubmittedStatus={setSubmittedStatus}
							/>
						</div>
						{/* <div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
							<FormField
								control={form.control}
								name='inflation'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>Inflation</FormLabel>
										<FormControl>
											<Input
												{...field}
												autoComplete='name'
												className='border border-gray-360 shadow-inputShadowDrop'
												id='inflation'
												placeholder='Inflation'
												type='number'
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
								name='horsePower'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>HorsePower</FormLabel>
										<FormControl>
											<Input
												{...field}
												autoComplete='name'
												className='border border-gray-360 shadow-inputShadowDrop'
												id='horsePower'
												placeholder='Please Enter HorsePower'
												onChange={(e) => {
													if (e.target.value.length < 4) {
														field.onChange(e)
													}

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
						</div> */}
						<div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'></div>
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
			</div>
		</section>
	)
}
