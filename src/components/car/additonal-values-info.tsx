import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateAdditionalVehicleInfomations } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import { zodResolver } from '@hookform/resolvers/zod'
import gsap from 'gsap'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button, Input } from '../ui'
import { cn } from '@/lib'

const additionalValuesSchema = z.object({
	claims: z.string().min(1, { message: 'Required' }),
	gpsTracking: z.string().min(1, { message: 'Required' }),
	tonnage: z.string()
})

export function AdditionalValuesInfo() {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
	useGSAP(() => {
		gsap.from('.selectVehicleValuesInfo', { y: 80, opacity: 0, duration: 0.5 })
	})

	const dispatch = useAppDispatch()
	const form = useForm<z.infer<typeof additionalValuesSchema>>({
		resolver: zodResolver(additionalValuesSchema),
		defaultValues: {
			claims: vehicleData.claims,
			gpsTracking: vehicleData.gpsTracking,
			tonnage: vehicleData.tonnage + ''
		}
	})

	function onSubmit(values: z.infer<typeof additionalValuesSchema>) {
		dispatch(
			updateAdditionalVehicleInfomations({
				claims: values.claims,
				gpsTracking: values.gpsTracking,
				tonnage: values.tonnage
			})
		)
		setIsSubmitted(true)
	}

	return (
		<section className='flex w-full flex-col gap-10 lg:w-4/5'>
			<div className='flex w-full flex-col items-center gap-4'>
				<div className='flex flex-row -space-x-7'>
					<div className='h-10 w-10 rounded-full bg-black'></div>
					<div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg font-medium text-white'>
						3
					</div>
				</div>
				<h1 className='text-blue-825 text-center font-inter text-4xl font-bold'>
					Additional Vehicle Information
				</h1>
				<p className='w-4/5 text-center font-roboto text-sm text-gray-500'>
					Please fill the form below to receive a quote for your project. Feel free to add
					as much detail as needed.
				</p>
			</div>
			<div className='flex flex-col gap-4'>
				<Form {...form}>
					<form
						className='space-y-8'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
							{vehicleData.bodyType === 'Truck' && (
								<FormField
									control={form.control}
									name='tonnage'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel className='text-blue-825'>Tonnage</FormLabel>
											<FormControl>
												<Input
													{...field}
													autoComplete='name'
													className='border border-gray-360 shadow-inputShadowDrop'
													id='tonnage'
													placeholder='Please Enter Tonnage'
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
							)}
						</div>
						<div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
							<FormField
								control={form.control}
								name='gpsTracking'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>
											GPS Tracking
										</FormLabel>
										<FormControl>
											<div className='flex flex-row gap-2'>
												<div
													className={cn(
														'rounded-lg border border-gray-360 bg-white px-8 py-2 shadow-inputShadowDrop',
														{
															'bg-blue-300 text-white':
																field.value === 'Yes'
														}
													)}
													onClick={() => {
														field.onChange('Yes')
													}}>
													Yes
												</div>

												<div
													className={cn(
														'rounded-lg border border-gray-360 bg-white px-8 py-2 shadow-inputShadowDrop',
														{
															'bg-blue-300 text-white':
																field.value === 'No'
														}
													)}
													onClick={() => {
														field.onChange('No')
													}}>
													No
												</div>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='claims'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-825'>Claims</FormLabel>
										<FormControl>
											<div className='flex flex-row gap-2'>
												<div
													className={cn(
														'rounded-lg border border-gray-360 bg-white px-8 py-2 shadow-inputShadowDrop',
														{
															'bg-blue-300 text-white':
																field.value === 'Yes'
														}
													)}
													onClick={() => {
														field.onChange('Yes')
													}}>
													Yes
												</div>

												<div
													className={cn(
														'rounded-lg border border-gray-360 bg-white px-8 py-2 shadow-inputShadowDrop',
														{
															'bg-blue-300 text-white':
																field.value === 'No'
														}
													)}
													onClick={() => {
														field.onChange('No')
													}}>
													No
												</div>
											</div>
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
			</div>
		</section>
	)
}
