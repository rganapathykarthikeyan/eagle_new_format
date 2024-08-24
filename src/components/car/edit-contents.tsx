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
	isRenewal: z.boolean()
})

export function EditContents(props: EditContentsProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

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
			manufactureyear: vehicleData.year + '',
			isRenewal: vehicleData.isRenewal,
			suminsured: vehicleData.sumInsured !== null ? vehicleData.sumInsured : ''
		}
	})

	function onSubmit(values: z.infer<typeof vehicleBaseSchema>) {
		dispatch(
			updateVehicleBasicInfo({
				suminsured: values.suminsured,
				isRenewal: vehicleData.isRenewal,
				manufactureyear: values.manufactureyear
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
				<div className='selectVehicleBaseInfo flex flex-col gap-5'>
					<BodyType
						form={form}
						setSubmittedStatus={setSubmittedStatus}
					/>
					<SelectMark
						form={form}
						setSubmittedStatus={setSubmittedStatus}
					/>
				</div>
				<div className='selectVehicleBaseInfo flex flex-col gap-5'>
					<SelectModel
						form={form}
						setSubmittedStatus={setSubmittedStatus}
					/>
					<VehicleUsage
						form={form}
						setSubmittedStatus={setSubmittedStatus}
					/>
				</div>

				<div className='selectVehicleBaseInfo flex flex-col gap-5'>
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
										type='number'
										value={field.value}
										onChange={(e) => {
											field.onChange(e)
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex w-full items-center justify-center pt-10'>
					{!isSubmitted && (
						<Button
							className='w-full rounded-3xl'
							variant='greenbtn'>
							Save & View Premium
						</Button>
					)}
				</div>
			</form>
		</Form>
	)
}
