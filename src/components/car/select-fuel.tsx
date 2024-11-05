import { useFuelTypeMutation } from '@/redux/api/commonApi'
import { useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Skeleton } from '../ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { type UseFormReturn } from 'react-hook-form'

type selectFuelProps = {
	form: UseFormReturn<
		{
			motorUsage: string
			bodyType: string
			make: string
			model: string
			manufactureyear: string
			suminsured: string
			isRenewal: boolean
			regNo: string
			chassisNo: string
			engineNo: string
			engineCapacity: string
			color: string
			fuelType: string
			tareweight: string
			grossweight: string
			seats: string
		},
		unknown,
		undefined
	>
	setSubmittedStatus: () => void
}

export function SelectFuel(props: selectFuelProps) {
	const insuranceID = useAppSelector((state) => state.apps.insuranceID)
	const branchCode = useAppSelector((state) => state.apps.branchCode)

	const [fuelList] = useFuelTypeMutation()

	const [fuels, setFuels] = useState<{ value: string; label: string }[]>([])

	useEffect(() => {
		const request = { InsuranceId: insuranceID, BranchCode: branchCode }
		const tempArr: { value: string; label: string }[] = []
		const res = fuelList(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				value.data.data!.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
				})
				setFuels(tempArr)
			}
		})
	}, [])

	return (
		<FormField
			control={props.form.control}
			name='fuelType'
			render={({ field }) => (
				<FormItem className='w-full'>
					<FormLabel className='text-blue-825'>Fuel</FormLabel>
					<FormControl>
						{fuels.length === 0 ? (
							<Skeleton className='h-10 w-full' />
						) : (
							<Select
								disabled={field.disabled}
								name={field.name}
								value={field.value}
								onValueChange={(e) => {
									field.onChange(e)
									props.setSubmittedStatus()
								}}>
								<SelectTrigger
									ref={field.ref}
									className='border-gray-360 border shadow-inputShadowDrop'>
									<SelectValue placeholder='FuelType' />
								</SelectTrigger>
								<SelectContent>
									{fuels.map((color, index) => {
										return (
											<SelectItem
												key={index}
												value={color.label}>
												{color.label}
											</SelectItem>
										)
									})}
								</SelectContent>
							</Select>
						)}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
