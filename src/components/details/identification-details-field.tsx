'use client'

import { useIdTypeMutation } from '@/redux/api/commonApi'
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { type CustomerFormType } from './customer-details-form'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { Skeleton } from '../ui/skeleton'

type identificationDetailsFieldProps = {
	form: CustomerFormType
}

export function IdentificationDetailsField(props: identificationDetailsFieldProps) {
	const branchCode = useAppSelector((state) => state.apps.branchCode)

	const insuranceID = useAppSelector((state) => state.apps.insuranceID)

	const [idTypeList, setIdTypeList] = useState<{ value: string; label: string }[]>([])
	const [getIdTypes] = useIdTypeMutation()

	useEffect(() => {
		const request = {
			InsuranceId: insuranceID,
			BranchCode: branchCode,
			PolicyTypeId: '1'
		}
		const tempArr: { value: string; label: string }[] = []
		const res = getIdTypes(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				value.data.data!.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
				})
				setIdTypeList(tempArr)
			}
		})
	}, [insuranceID, branchCode])

	return (
		<>
			<FormField
				control={props.form.control}
				name='idType'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							ID Type<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							{idTypeList.length === 0 ? (
								<Skeleton className='h-10 w-full' />
							) : (
								<div className=''>
									<Select
										disabled={field.disabled}
										name={field.name}
										value={field.value}
										onValueChange={(e) => {
											field.onChange(e)
										}}>
										<SelectTrigger
											ref={field.ref}
											className='border border-gray-375 bg-gray-975'>
											<SelectValue placeholder='Title' />
										</SelectTrigger>
										<SelectContent>
											{idTypeList.map((title, index) => {
												return (
													<SelectItem
														key={index}
														value={title.value}>
														{title.label}
													</SelectItem>
												)
											})}
										</SelectContent>
									</Select>
								</div>
							)}
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={props.form.control}
				name='idNumber'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							ID Number<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='border border-gray-375 bg-gray-975'
								id='idNumber'
								placeholder='Id Number'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			{/* <FormField
				control={props.form.control}
				name='taxExempted'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Tax Exempted<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							<Select
								disabled={field.disabled}
								name={field.name}
								value={field.value ? 'Yes' : 'No'}
								onValueChange={(e) => {
									field.onChange(e === 'Yes' ? true : false)
								}}>
								<SelectTrigger
									ref={field.ref}
									className='bg-gray-975 border border-gray-375'>
									<SelectValue placeholder='Tax Exempted' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem
										key={1}
										value='Yes'>
										Yes
									</SelectItem>
									<SelectItem
										key={2}
										value='No'>
										No
									</SelectItem>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/> */}
		</>
	)
}
