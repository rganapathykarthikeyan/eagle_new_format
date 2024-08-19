'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useFuelTypeMutation } from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { updateVehicleFuelType } from '@/redux/slices'

type FuelTypeProps = {
	form: UseFormReturn<
		{
			bodyType: string
			engineCapacity: string
			fuelType: string
			seatingCapacity: string
		},
		unknown,
		undefined
	>
	setSubmittedStatus: () => void
}

export function FuelType(props: FuelTypeProps) {
	const appsData = useAppSelector((state) => state.apps)
	const dispatch = useAppDispatch()

	const [fuelType] = useFuelTypeMutation()

	const [fuelTypeList, setFuelTypeList] = useState<{ value: string; label: string }[]>([])

	useEffect(() => {
		if (fuelTypeList.length === 0) {
			const tempArr: { value: string; label: string }[] = []
			const request = { InsuranceId: appsData.insuranceID, BranchCode: appsData.branchCode }
			const res = fuelType(request)
			res.then((value) => {
				if (value.data?.type === 'success' && value.data.data !== undefined) {
					value.data.data.Result.map((value) => {
						tempArr.push({
							value: value.Code,
							label: value.CodeDesc
						})
					})
					setFuelTypeList(tempArr)
				}
			})
		}
	}, [fuelType, appsData.branchCode, appsData.insuranceID])

	function updateFuel(label: string) {
		const pos = fuelTypeList.findIndex((item) => {
			return item.label.toLowerCase() === label.toLowerCase()
		})

		if (pos !== -1) {
			dispatch(
				updateVehicleFuelType({ fuelType: label, fuelTypeID: fuelTypeList[pos].label })
			)
		}
	}

	return (
		<FormField
			control={props.form.control}
			name='fuelType'
			render={({ field }) => (
				<FormItem className='w-full'>
					<FormLabel className='text-blue-825'>FuelType</FormLabel>
					<FormControl>
						<Select
							disabled={field.disabled}
							name={field.name}
							value={field.value}
							onValueChange={(e) => {
								field.onChange(e)
								updateFuel(e)
							}}>
							<SelectTrigger
								ref={field.ref}
								className='border-gray-360 border shadow-inputShadowDrop'>
								<SelectValue placeholder='FuelType' />
							</SelectTrigger>
							<SelectContent>
								{fuelTypeList.map((type, index) => {
									return (
										<SelectItem
											key={index}
											value={type.label}>
											{type.label}
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
	)
}
