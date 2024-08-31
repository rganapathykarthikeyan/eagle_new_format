import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button, Input } from '../ui'

type ManualAddressDialogProps = {
	setManualLocation: (totalAddress: { value: string; label: string }) => void
}

const addressInfoSchema = z.object({
	address1: z.string().min(3, { message: 'address1 should be atleast 3 characters' }).max(50),
	address2: z.string().min(3, { message: 'address2 should be atleast 3 characters' }).max(50),
	city: z.string().min(3, { message: 'Required' }),
	state: z.string().min(3, { message: 'Required' }),
	postCode: z.string().min(3, { message: 'Required' })
})

export function ManualAddressDialog(props: ManualAddressDialogProps) {
	const form = useForm<z.infer<typeof addressInfoSchema>>({
		resolver: zodResolver(addressInfoSchema),
		defaultValues: {
			address1: '',
			address2: '',
			city: '',
			state: '',
			postCode: ''
		}
	})

	function onSubmit(values: z.infer<typeof addressInfoSchema>) {
		const fullAddress =
			values.address1 +
			',' +
			values.address2 +
			',' +
			values.city +
			',' +
			values.state +
			',' +
			values.postCode
		props.setManualLocation({ value: fullAddress, label: fullAddress })
	}

	return (
		<section className='flex flex-col gap-5'>
			<Form {...form}>
				<form
					className='space-y-8'
					onSubmit={form.handleSubmit(onSubmit)}>
					<div className='selectCustomerInfo flex flex-row gap-10'>
						<FormField
							control={form.control}
							name='address1'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel className='text-blue-825'>
										Address First Line
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											autoComplete='address-level3'
											className='border-gray-360 border shadow-inputShadowDrop'
											id='name'
											placeholder='Please Address Line1'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='selectCustomerInfo flex flex-row gap-10'>
						<FormField
							control={form.control}
							name='address2'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel className='text-blue-825'>
										Address Second Line
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											autoComplete='address-level2'
											className='border-gray-360 border shadow-inputShadowDrop'
											id='name'
											placeholder='Please Address Line2'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='selectCustomerInfo flex flex-row gap-10'>
						<FormField
							control={form.control}
							name='city'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel className='text-blue-825'>Suburb</FormLabel>
									<FormControl>
										<Input
											{...field}
											autoComplete='address-level1'
											className='border-gray-360 border shadow-inputShadowDrop'
											id='name'
											placeholder='Please Suburb Name'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='selectCustomerInfo flex flex-row gap-6'>
						<FormField
							control={form.control}
							name='state'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel className='text-blue-825'>State</FormLabel>
									<FormControl>
										<Input
											{...field}
											className='border-gray-360 border shadow-inputShadowDrop'
											id='name'
											placeholder='Please State Name'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='postCode'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel className='text-blue-825'>PostCode</FormLabel>
									<FormControl>
										<Input
											{...field}
											autoComplete='address-level1le'
											className='border-gray-360 border shadow-inputShadowDrop'
											id='mobile'
											maxLength={9}
											placeholder='Enter PostCode'
											type='number'
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
						<Button
							className='rounded-3xl px-10 py-5'
							variant='greenbtn'>
							Continue
						</Button>
					</div>
				</form>
			</Form>
		</section>
	)
}
