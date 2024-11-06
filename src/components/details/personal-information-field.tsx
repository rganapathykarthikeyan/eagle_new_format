'use client'

import { useEffect, useState } from 'react'
import {
	Button,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../ui'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { type CustomerFormType } from './customer-details-form'
import { useGetOccupationListMutation } from '@/redux/api/commonApi'
import { useAppSelector } from '@/redux/hooks'
import { Skeleton } from '../ui/skeleton'
import { Calendar } from '../ui/calendar'
import { CalendarDays } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib'

type personalInformationFieldProps = {
	customer: string
	form: CustomerFormType
}

export function PersonalInformationField(props: personalInformationFieldProps) {
	// const [getTitleTypes] = useTitleTypeMutation()
	// const [titleList, setTitleList] = useState<{ value: string; label: string }[]>([])
	const [OccupationList, setOccupation] = useState<{ value: string; label: string }[]>([])
	const branchCode = useAppSelector((state) => state.apps.branchCode)

	const insuranceID = useAppSelector((state) => state.apps.insuranceID)
	const [getOccupation] = useGetOccupationListMutation()

	const years18 = new Date()

	years18.setFullYear(years18.getFullYear() - 18)

	// useEffect(() => {
	// 	const request = {
	// 		InsuranceId: insuranceID,
	// 		ItemType: 'NAME_TITLE',
	// 		BranchCode: '99999',
	// 		ItemCode: 'null',
	// 		TitleType: props.customer === 'Personal' ? 'I' : 'C'
	// 	}
	// 	const tempArr: { value: string; label: string }[] = []
	// 	const res = getTitleTypes(request)
	// 	res.then((value) => {
	// 		if (value.data?.type === 'success' && value.data?.data !== undefined) {
	// 			value.data.data!.Result.map((value) => {
	// 				tempArr.push({
	// 					value: value.Code,
	// 					label: value.CodeDesc
	// 				})
	// 			})
	// 			setTitleList(tempArr)
	// 		}
	// 	})
	// }, [props.customer])

	useEffect(() => {
		const request = {
			InsuranceId: insuranceID,
			BranchCode: branchCode,
			ProductId: '5',
			TitleType: ''
		}
		const tempArr: { value: string; label: string }[] = []
		const res = getOccupation(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				value.data.data!.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
				})
				setOccupation(tempArr)
			}
		})
	}, [])

	return (
		<>
			<FormField
				control={props.form.control}
				name='title'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Title<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							{/* {titleList.length === 0 ? (
								<Skeleton className='h-10 w-full' />
							) : (
								<div className='w-20'> */}
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
									{/* {titleList.map((title, index) => {
												return (
													<SelectItem
														key={index}
														value={title.value}>
														{title.label}
													</SelectItem>
												)
											})} */}
									<SelectItem
										key={1}
										value='Mr'>
										Mr
									</SelectItem>
									<SelectItem
										key={2}
										value='Mrs'>
										Mrs
									</SelectItem>
								</SelectContent>
							</Select>
							{/* </div>
							)} */}
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			{props.customer === 'Personal' ? (
				<>
					<FormField
						control={props.form.control}
						name='firstname'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									First Name<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='border border-gray-375 bg-gray-975'
										id='firstname'
										placeholder='First Name'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={props.form.control}
						name='lastname'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Last Name<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='border border-gray-375 bg-gray-975'
										id='lastname'
										placeholder='Last Name'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</>
			) : (
				<FormField
					control={props.form.control}
					name='firstname'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Customer Name<span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									className='border border-gray-375 bg-gray-975'
									id='firstname'
									placeholder='Customer Name'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			<FormField
				control={props.form.control}
				name='occupation'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Occupation<span className='text-red-500'>*</span>
						</FormLabel>
						<FormControl>
							{OccupationList.length === 0 ? (
								<Skeleton className='h-10 w-full' />
							) : (
								<Select
									disabled={field.disabled}
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}>
									<SelectTrigger
										ref={field.ref}
										className='border border-gray-375 bg-gray-975'>
										<SelectValue placeholder='Occupation' />
									</SelectTrigger>
									<SelectContent>
										{OccupationList.map((occupation, index) => {
											return (
												<SelectItem
													key={index}
													value={occupation.value}>
													{occupation.label}
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
			{props.customer === 'Personal' && (
				<div className='min-w-32'>
					<FormField
						control={props.form.control}
						name='gender'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Gender<span className='text-red-500'>*</span>
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
											className='border border-gray-375 bg-gray-975'>
											<SelectValue placeholder='Gender' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem
												key={1}
												value='M'>
												Male
											</SelectItem>
											<SelectItem
												key={2}
												value='F'>
												Female
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
			)}
			{props.customer === 'Personal' && (
				<FormField
					control={props.form.control}
					name='dob'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Date of Birth
								<span className='text-red-500'>*</span>
							</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											id='start'
											variant='outline'
											className={cn(
												'w-full border border-gray-375 bg-gray-975 pl-3 text-left font-normal text-black',
												!field.value && 'text-muted-foreground'
											)}>
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Pick a date</span>
											)}
											<CalendarDays className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									align='start'
									className='w-auto p-0'>
									<>
										<Calendar
											initialFocus
											captionLayout='dropdown-buttons'
											className='p-0'
											fromYear={1900}
											id='DOB'
											mode='single'
											selected={field.value}
											toMonth={years18}
											toYear={years18.getFullYear()}
											classNames={{
												day_hidden: 'invisible',
												dropdown:
													'px-2 py-1.5 rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
												caption_dropdowns: 'flex gap-3',
												vhidden: 'hidden',
												caption_label: 'hidden'
											}}
											disabled={(date) =>
												date > years18 || date < new Date('1900-01-01')
											}
											onSelect={(e) => {
												field.onChange(e)
											}}
										/>
									</>
								</PopoverContent>
							</Popover>
						</FormItem>
					)}
				/>
			)}
		</>
	)
}
