'use client'

import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { CustomerDetailsTab } from './customer-details-tab'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'

const formSchema = z.object({
	driverName: z.string().min(1, { message: 'Name Required' }),
	licenseNumber: z.string().min(1, { message: 'Required' }),
	drivingExperience: z.string().min(1, { message: 'Required' }),
	DOB: z.string().min(1, { message: 'Required' }),
	driverMaritalStatus: z.string().min(1, { message: 'Required' }),
	claimType: z.string().min(1, { message: 'Required' }),
	driverType: z.string().min(1, { message: 'Required' }),
	gender: z.string().min(1, { message: 'Required' })
})

export function DriverDetailsForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			driverName: '',
			licenseNumber: '',
			drivingExperience: '',
			DOB: '',
			driverMaritalStatus: '',
			claimType: '',
			driverType: '',
			gender: ''
		}
	})

	function onSubmit() {}

	return (
		<section className='flex h-full w-full flex-col items-center gap-10 py-10'>
			<CustomerDetailsTab />
			<section className='flex w-full flex-col items-center gap-10'>
				<Form {...form}>
					<form
						className='w-4/5 space-y-8'
						onSubmit={form.handleSubmit(onSubmit)}>
						<section className='flex flex-col justify-between gap-5'>
							<div className='grid w-full grid-cols-4 gap-5'>
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
									name='licenseNumber'
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
											<FormControl>
												<Input
													{...field}
													className='border border-gray-375 bg-gray-975'
													id='idType'
													placeholder='DOB'
												/>
											</FormControl>
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
												<Input
													{...field}
													className='border border-gray-375 bg-gray-975'
													id='idType'
													placeholder='Driver Marital Status'
												/>
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
