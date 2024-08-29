'use client'

import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { CustomerDetailsTab } from './customer-details-tab'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { cn } from '@/lib'
import { format } from 'date-fns'
import { CalendarDays } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/hooks'
import { type SaveDriverRequest } from '@/services/models/common.models'
import { useToast } from '../ui/use-toast'
import { useSaveDriverMutation } from '@/redux/api/commonApi'

const formSchema = z.object({
	driverName: z.string().min(1, { message: 'Name Required' }),
	licenseNumber: z.string().min(1, { message: 'Required' }),
	drivingExperience: z.string().min(1, { message: 'Required' }),
	DOB: z.date().optional(),
	driverMaritalStatus: z.string().min(1, { message: 'Required' }),
	claimType: z.string().min(1, { message: 'Required' }),
	driverType: z.string().min(1, { message: 'Required' }),
	gender: z.string().min(1, { message: 'Required' }),
	driverOrOwner: z.string().optional()
})

export function DriverDetailsForm() {
	const customerData = useAppSelector((state) => state.customerDetails)
	const QuoteNo = useAppSelector((state) => state.motor.QuoteNo)
	const reqRefNo = useAppSelector((state) => state.motor.RequestReferenceNo)

	const years18 = new Date()

	years18.setFullYear(years18.getFullYear() - 18)

	const { toast } = useToast()
	const [saveDriver] = useSaveDriverMutation()

	const route = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			driverName: '',
			licenseNumber: '',
			drivingExperience: '',
			driverMaritalStatus: '',
			claimType: '',
			driverType: '',
			gender: '',
			driverOrOwner: 'Driver'
		}
	})

	function saveDriverDetails(values: z.infer<typeof formSchema>) {
		const req: SaveDriverRequest = []

		// driversDetails.forEach((driver) => {
		if (
			values.licenseNumber !== '' &&
			values.driverName !== '' &&
			values.driverOrOwner === 'Driver'
		) {
			req.push({
				CreatedBy: customerData.name,
				DriverDob: '09/07/2006',
				DriverName: values.driverName,
				DriverType: '1',
				LicenseNo: values.licenseNumber,
				QuoteNo: QuoteNo,
				RiskId: '1',
				RequestReferenceNo: reqRefNo,
				MaritalStatus: values.driverMaritalStatus,
				CountryId: null,
				StateId: null,
				CityId: null,
				AreaGroup: null,
				DriverExperience: values.drivingExperience,
				LicenseIssueDt: null,
				Gender: values.gender
			})
		}
		// })

		const res = saveDriver(req)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError !== true &&
				value.data.data.Result !== null
			) {
				toast({
					variant: 'default',
					title: 'Driver Details Updated'
				})
			} else if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError === true &&
				value.data.data.ErrorMessage !== null &&
				value.data.data.ErrorMessage.length !== 0
			) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: value.data.data.ErrorMessage[0].Message
				})
			}
		})
	}

	function onSubmit(values: z.infer<typeof formSchema>) {
		saveDriverDetails(values)
		route.push('/car-insurance/details/upload-details')
	}

	return (
		<section className='flex h-full w-full flex-col items-center gap-10 py-2 lg:py-10'>
			<CustomerDetailsTab />
			<section className='flex w-full flex-col items-center gap-10'>
				<Form {...form}>
					<form
						className='w-full space-y-8 px-2 lg:w-4/5 lg:px-0'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex w-full flex-row items-center justify-center gap-4 lg:gap-12'>
							<FormLabel>
								Driver or Owner<span className='text-red-500'>*</span> :
							</FormLabel>
							<FormField
								control={form.control}
								name='driverOrOwner'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className='flex flex-grow flex-row gap-8'>
												<div
													className={cn(
														'cursor-pointer rounded-md px-3 py-1 font-semibold text-gray-875 lg:px-8',
														{
															'bg-blue-875 text-white':
																field.value === 'Driver'
														}
													)}
													onClick={() => {
														field.onChange('Driver')
													}}>
													Driver
												</div>
												<div
													className={cn(
														'cursor-pointer rounded-md px-3 py-1 font-semibold text-gray-875 lg:px-8',
														{
															'bg-blue-875 text-white':
																field.value === 'Owner'
														}
													)}
													onClick={() => {
														field.onChange('Owner')
													}}>
													Owner
												</div>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<section className='flex flex-col justify-between gap-5'>
							<div className='grid w-full grid-cols-1 gap-5 lg:grid-cols-4'>
								<FormField
									control={form.control}
									name='driverName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Driver Name<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border border-gray-375 bg-gray-975'
													id='idType'
													placeholder='Driver Name'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='licenseNumber'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												License Number
												<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border border-gray-375 bg-gray-975'
													id='idType'
													placeholder='License Number'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='drivingExperience'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Driving Experience
												<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border border-gray-375 bg-gray-975'
													id='idType'
													placeholder='License Number'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='DOB'
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
																!field.value &&
																	'text-muted-foreground'
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
																date > years18 ||
																date < new Date('1900-01-01')
															}
															onSelect={(e) => {
																field.onChange(e)
															}}
														/>
													</>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='driverMaritalStatus'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Marital Status
												<span className='text-red-500'>*</span>
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
														<SelectValue placeholder='Marital Status' />
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
															value='Single'>
															Single
														</SelectItem>
														<SelectItem
															key={2}
															value='Married'>
															Married
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='claimType'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Claim Type
												<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border border-gray-375 bg-gray-975'
													id='idType'
													placeholder='Claim Type'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='driverType'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Driver Type
												<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border border-gray-375 bg-gray-975'
													id='idType'
													placeholder='Driver Type'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='gender'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Gender
												<span className='text-red-500'>*</span>
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
														<SelectItem
															key={3}
															value='O'>
															Other
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</section>
						<div className='flex w-full items-center justify-center'>
							<Button
								className='w-1/4'
								variant='greenbtn'>
								Next
							</Button>
						</div>
					</form>
				</Form>
			</section>
		</section>
	)
}
