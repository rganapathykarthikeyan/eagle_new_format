'use client'

import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { type VehicleModelRes } from '@/services/models/common.models'
import { useEffect, useState } from 'react'
import {
	updateVehicleDetailsFromModel,
	updateVehicleModel,
	updateVehicleValues
} from '@/redux/slices'
import { useRouter } from 'next/navigation'

const vehicleBaseSchema = z.object({
	manufactureyear: z.string().min(1, { message: 'Required' }),
	suminsured: z.string().min(1, { message: 'Required' }),
	model: z.string().min(1, { message: 'Required' })
})

type VehcileValueDetails = {
	modelList?: VehicleModelRes
}

export function VehicleValues(props: VehcileValueDetails) {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const years: string[] = []

	const currentYear = new Date(Date.now()).getFullYear()

	const [modelsList, setModelsList] = useState<{ value: string; label: string }[]>([])

	for (let i = currentYear; i > currentYear - 30; i--) {
		years.push(i + '')
	}

	const router = useRouter()

	const dispatch = useAppDispatch()

	const form = useForm<z.infer<typeof vehicleBaseSchema>>({
		resolver: zodResolver(vehicleBaseSchema),
		defaultValues: {
			manufactureyear: vehicleData.year + '',
			suminsured:
				vehicleData.sumInsured === null || vehicleData.sumInsured !== undefined
					? ''
					: vehicleData.sumInsured
		}
	})

	function updateModel(modelid: string) {
		const pos = modelsList.findIndex((item) => {
			return item.value === modelid
		})

		if (pos !== -1 && props.modelList) {
			dispatch(updateVehicleModel({ model: modelsList[pos].label, modelID: modelid }))
			dispatch(
				updateVehicleDetailsFromModel({
					bodyType: props.modelList.Result[pos].BodyType,
					bodyTypeID: props.modelList.Result[pos].BodyTypeId + '',
					Enginecapacity: props.modelList.Result[pos].EnginesizeCc,
					FuelType: props.modelList.Result[pos].FuelType,
					Horsepower: props.modelList.Result[pos].PowerKw,
					Tonnage: props.modelList.Result[pos].WeightKg
				})
			)
		}
	}

	function onSubmit(values: z.infer<typeof vehicleBaseSchema>) {
		dispatch(
			updateVehicleValues({ suminsured: values.suminsured, year: values.manufactureyear })
		)
		router.push('/car-insurance/1')
	}

	useEffect(() => {
		const tempArr: { value: string; label: string }[] = []

		if (props.modelList && props.modelList.Result.length !== 0) {
			props.modelList.Result.map((value) => {
				tempArr.push({
					value: value.ModelId + '',
					label: value.Model
				})
			})
			setModelsList(tempArr)
		}
	}, [props.modelList])

	return (
		<div className='flex w-full flex-col gap-4 lg:w-4/5 xl:w-3/5'>
			<Form {...form}>
				<form
					className='space-y-8'
					onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex w-full flex-col gap-4'>
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
											}}>
											<SelectTrigger
												ref={field.ref}
												className='border-gray-360 border shadow-inputShadowDrop'>
												<SelectValue placeholder='Manufacture Year' />
											</SelectTrigger>
											<SelectContent>
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
						<FormField
							control={form.control}
							name='model'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel className='text-blue-825'>Model</FormLabel>
									<FormControl>
										<Select
											disabled={field.disabled || vehicleData.mark === ''}
											name={field.name}
											value={field.value}
											onValueChange={(e) => {
												field.onChange(e)
												updateModel(e)
											}}>
											<SelectTrigger
												ref={field.ref}
												className='border-gray-360 border shadow-inputShadowDrop'>
												<SelectValue placeholder='Select Model' />
											</SelectTrigger>
											<SelectContent>
												{modelsList.map((model, index) => {
													return (
														<SelectItem
															key={index}
															value={model.value}>
															{model.label}
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
						<Button variant='greenbtn'>Save</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
