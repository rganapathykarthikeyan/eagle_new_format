'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleModel } from '@/redux/slices'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { type UseFormReturn } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useGetMotorModelListMutation } from '@/redux/api/commonApi'

type selectModelProps = {
	form: UseFormReturn<
		{
			motorUsage: string
			bodyType: string
			make: string
			model: string
			manufactureyear: string
			suminsured: string
			isRenewal: boolean
		},
		unknown,
		undefined
	>
	setSubmittedStatus: () => void
}

export function SelectModel(props: selectModelProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appsData = useAppSelector((state) => state.apps)

	const dispatch = useAppDispatch()
	const [getModel] = useGetMotorModelListMutation()
	const [modelsList, setModelsList] = useState<{ value: string; label: string }[]>([])

	useEffect(() => {
		if (vehicleData.mark !== '') {
			const request = {
				InsuranceId: appsData.insuranceID,
				BranchCode: appsData.branchCode,
				MakeId: vehicleData.makeID,
				BodyId: vehicleData.bodyTypeID
			}
			const tempArr: { value: string; label: string }[] = []
			const res = getModel(request)
			res.then((value) => {
				if (value.data?.type === 'success' && value.data?.data !== undefined) {
					value.data.data!.Result.map((value) => {
						tempArr.push({
							value: value.Code,
							label: value.CodeDesc
						})
					})
					setModelsList(tempArr)
				}
			})
		}
	}, [
		appsData.branchCode,
		appsData.insuranceID,
		getModel,
		vehicleData.makeID,
		vehicleData.bodyTypeID,
		vehicleData.mark
	])

	function updateModel(modelid: string) {
		const pos = modelsList.findIndex((item) => {
			return item.value === modelid
		})

		if (pos !== -1) {
			dispatch(updateVehicleModel({ model: modelsList[pos].label, modelID: modelid }))
		}
	}

	return (
		<FormField
			control={props.form.control}
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
								props.setSubmittedStatus()
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
	)
}
