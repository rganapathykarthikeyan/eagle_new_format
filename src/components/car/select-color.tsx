import { useGetColorListMutation } from '@/redux/api/commonApi'
import { useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Skeleton } from '../ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'

type selectColorProps = {
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

export function SelectColor(props: selectColorProps) {
	const insuranceID = useAppSelector((state) => state.apps.insuranceID)
	const branchCode = useAppSelector((state) => state.apps.branchCode)

	const [colorList] = useGetColorListMutation()

	const [colors, setColors] = useState<{ value: string; label: string }[]>([])

	useEffect(() => {
		const request = { InsuranceId: insuranceID, BranchCode: branchCode }
		const tempArr: { value: string; label: string }[] = []
		const res = colorList(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				value.data.data!.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
				})
				setColors(tempArr)
			}
		})
	}, [])

	return (
		<FormField
			control={props.form.control}
			name='color'
			render={({ field }) => (
				<FormItem className='w-full'>
					<FormLabel className='text-blue-825'>Color</FormLabel>
					<FormControl>
						{colors.length === 0 ? (
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
									<SelectValue placeholder='Colors' />
								</SelectTrigger>
								<SelectContent>
									{colors.map((color, index) => {
										return (
											<SelectItem
												key={index}
												value={color.value}>
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
