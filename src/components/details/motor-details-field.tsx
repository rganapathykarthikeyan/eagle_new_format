import { useAppSelector } from '@/redux/hooks'
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Skeleton } from '../ui/skeleton'
import { type vehicleFormType } from './vehicles-details-form'
import { useEffect, useState } from 'react'
import { useGetColorListMutation } from '@/redux/api/commonApi'

type motorDetailsFieldProps = {
	form: vehicleFormType
}

export function MotorDetailsField(props: motorDetailsFieldProps) {
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
		<>
			<FormField
				control={props.form.control}
				name='regNo'
				render={({ field }) => (
					<FormItem className='w-full'>
						<FormLabel className='line-clamp-1'>
							Registration Number
							<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='bg-gray-975 border border-gray-375'
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
				control={props.form.control}
				name='chassisNo'
				render={({ field }) => (
					<FormItem className='w-full'>
						<FormLabel className='line-clamp-1'>
							Chassis number
							<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='bg-gray-975 border border-gray-375'
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
				control={props.form.control}
				name='engineNo'
				render={({ field }) => (
					<FormItem className='w-full'>
						<FormLabel className='line-clamp-1'>
							Engine Number<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='bg-gray-975 border border-gray-375'
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
				control={props.form.control}
				name='engineCapacity'
				render={({ field }) => (
					<FormItem className='w-full'>
						<FormLabel className='line-clamp-1'>Engine Capacity</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='bg-gray-975 border border-gray-375'
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
				control={props.form.control}
				name='tareweight'
				render={({ field }) => (
					<FormItem className='w-full'>
						<FormLabel>Tare Weight (kg)</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='bg-gray-975 border border-gray-375'
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
				control={props.form.control}
				name='color'
				render={({ field }) => (
					<FormItem className='w-full'>
						<FormLabel>Color</FormLabel>
						<FormControl>
							{colors.length === 0 ? (
								<Skeleton className='h-10 w-full' />
							) : (
								<Select
									disabled={field.disabled}
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}>
									<SelectTrigger
										ref={field.ref}
										className='bg-gray-975 border border-gray-375'>
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
		</>
	)
}
