import { z } from 'zod'
import { Button, Input } from '../ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppSelector } from '@/redux/hooks'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Label } from '../ui/label'
import { useState } from 'react'

const customerInfoSchema = z.object({
	name: z.string().min(3, { message: 'name should be atleast 3 characters' }).max(50),
	mobile: z.string().min(9, { message: 'Enter valid number' })
})

type HomeCustomerInfoProps = {
	goNext: () => void
}

export function HomeCustomerInfo(props: HomeCustomerInfoProps) {
	const customerData = useAppSelector((state) => state.customerDetails)

	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
	// const [isLoading, setIsLoading] = useState<boolean>(false)

	const form = useForm<z.infer<typeof customerInfoSchema>>({
		resolver: zodResolver(customerInfoSchema),
		defaultValues: {
			name: customerData.name,
			mobile: customerData.mobile
		}
	})

	function onSubmit() {
		//values: z.infer<typeof customerInfoSchema>
		props.goNext()
	}

	return (
		<div className='flex w-full flex-col gap-4 lg:w-4/5 xl:w-3/5'>
			<Form {...form}>
				<form
					className='space-y-8'
					onSubmit={form.handleSubmit(onSubmit)}>
					<div className='selectCustomerInfo flex flex-row gap-10'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel className='text-blue-825'>Full Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											autoComplete='name'
											className='border-gray-360 border shadow-inputShadowDrop'
											id='name'
											placeholder='Please Enter Name'
											onChange={(e) => {
												field.onChange(e)

												if (isSubmitted) {
													setIsSubmitted(false)
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <Input
                    placeholder='Customer Name'
                    value={customerData.name}
                    onChange={(e) => {
                        dispatch(updateName(e.target.value))
                    }}
                /> */}
					</div>
					<div className='selectCustomerInfo flex flex-row gap-6'>
						<div className='space-y-2'>
							<Label className='text-blue-825'>Code</Label>
							<Input
								disabled
								className='border-gray-360 max-w-20 border shadow-inputShadowDrop'
								placeholder='Code'
								value={customerData.code}
							/>
						</div>
						<FormField
							control={form.control}
							name='mobile'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel className='text-blue-825'>Mobile Number</FormLabel>
									<FormControl>
										<Input
											{...field}
											autoComplete='mobile'
											className='border-gray-360 border shadow-inputShadowDrop'
											id='mobile'
											maxLength={9}
											placeholder='Enter Mobile Number'
											type='number'
											onChange={(e) => {
												if (e.target.value.length < 10) {
													field.onChange(e)

													if (isSubmitted) {
														setIsSubmitted(false)
													}
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <Input
                    placeholder='Mobile Number'
                    type='number'
                    value={customerData.mobile}
                    onChange={(e) => {
                        if (e.target.value.length < 9) {
                            dispatch(updateMobile(e.target.value))
                        }
                    }}
                /> */}
					</div>
					<div className='flex w-full items-center justify-center'>
						{!isSubmitted && (
							<Button
								className='rounded-3xl px-10 py-5'
								variant='greenbtn'>
								Continue
							</Button>
						)}
					</div>
				</form>
			</Form>
			{/* <div className='flex flex-row items-center justify-center'>
				{isLoading && (
					<ClipLoader
						color='#054CA0'
						size={40}
					/>
				)}
			</div> */}
		</div>
	)
}
