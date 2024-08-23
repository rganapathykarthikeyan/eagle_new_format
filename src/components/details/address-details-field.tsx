import { useEffect, useState } from 'react'
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Skeleton } from '../ui/skeleton'
import { type CustomerFormType } from './customer-details-form'
import { useGetRegionListMutation } from '@/redux/api/commonApi'
import { useAppSelector } from '@/redux/hooks'

type addressDetailsFieldProps = {
	form: CustomerFormType
}

export function AddressDetailsField(props: addressDetailsFieldProps) {
	const customerData = useAppSelector((state) => state.customerDetails)

	const [cityName, setCityName] = useState<string>(customerData.cityName)

	const [cityList, setCityList] = useState<{ value: string; label: string }[]>([])

	const [getRegion] = useGetRegionListMutation()

	useEffect(() => {
		const request = { CountryId: 'ZMB' }
		const tempArr: { value: string; label: string }[] = []
		const res = getRegion(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				value.data.data!.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
				})
				setCityList(tempArr)
			}
		})
	}, [])

	useEffect(() => {
		props.form.setValue('cityName', cityName)
	}, [cityName])

	return (
		<>
			<FormField
				control={props.form.control}
				name='residentialaddress'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Street Name<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='bg-gray-975 border border-gray-375'
								id='residentialaddress'
								placeholder='Street Name'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={props.form.control}
				name='country'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Country<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='bg-gray-975 border border-gray-375'
								id='country'
								placeholder='country'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={props.form.control}
				name='citytown'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Region<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							{cityList.length === 0 ? (
								<Skeleton className='h-10 w-full' />
							) : (
								<Select
									disabled={field.disabled}
									name={field.name}
									value={field.value}
									onValueChange={(e) => {
										field.onChange(e)
										const pos = cityList.findIndex((item) => {
											return item.value === e
										})
										setCityName(cityList[pos].label)
									}}>
									<SelectTrigger
										ref={field.ref}
										className='bg-gray-975 border border-gray-375'>
										<SelectValue placeholder='City/Town' />
									</SelectTrigger>
									<SelectContent>
										{cityList.map((city, index) => {
											return (
												<SelectItem
													key={index}
													value={city.value}>
													{city.label}
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
			<FormField
				control={props.form.control}
				name='district'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							District<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='bg-gray-975 border border-gray-375'
								id='district'
								placeholder='district'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={props.form.control}
				name='pobox'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							PO Box<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='bg-gray-975 border border-gray-375'
								id='pobox'
								placeholder='pobox'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}
