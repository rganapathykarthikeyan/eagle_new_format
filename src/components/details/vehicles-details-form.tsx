'use client'

import { useRouter } from 'next/navigation'
import { MotorDetailsField } from './motor-details-field'
import { Button } from '../ui'
import { CustomerDetailsTab } from './customer-details-tab'
import { Form } from '../ui/form'
import { z } from 'zod'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { useAppSelector } from '@/redux/hooks'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
	regNo: z.string().min(1, {
		message: 'Registration Number is Required'
	}),
	chassisNo: z.string().min(2, {
		message: 'Please enter Chassis number'
	}),
	engineNo: z.string().min(2, {
		message: 'Please enter Engine Number'
	}),
	engineCapacity: z.string(),
	color: z.string().optional(),
	seats: z.string().min(1, { message: 'Required' }),
	tareweight: z.string().min(1, { message: 'Required' })
})

export type vehicleFormType = UseFormReturn<
	{
		regNo: string
		chassisNo: string
		engineNo: string
		engineCapacity: string
		seats: string
		color?: string | undefined
		tareweight: string
	},
	unknown,
	undefined
>

export function VehicleDetailsForm() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const route = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			regNo: vehicleData.registrationNumber,
			chassisNo: vehicleData.chassisNumber,
			engineNo: vehicleData.engineNumber,
			engineCapacity: vehicleData.engineCapacity,
			color: vehicleData.color,
			seats: vehicleData.seat + ''
		}
	})

	function navigateToPay() {
		route.push('/car-insurance/details/driver-details')
	}

	function onSubmit() {
		// dispatch(
		// 	updateVehicleDetails({
		// 		registrationNumber: values.regNo,
		// 		chassisNumber: values.chassisNo,
		// 		engineNumber: values.engineNo,
		// 		engineCapacity: values.engineCapacity,
		// 		color: values.color ? values.color : '',
		// 		seat: values.seats,
		// 	})
		// )
		navigateToPay()
	}

	return (
		<section className='flex h-full w-full flex-col items-center gap-10 py-10'>
			<CustomerDetailsTab />
			<Form {...form}>
				<form
					className='w-4/5 space-y-8'
					onSubmit={form.handleSubmit(onSubmit)}>
					<section className='flex flex-col justify-between gap-5'>
						<div className='grid w-full grid-cols-4 gap-5'>
							<MotorDetailsField form={form} />
						</div>
					</section>
					{/* <ValuationDetailsField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={2}
				/>
				<EnergySpecificationField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={3}
				/>
				<AdditionalVehicleInfo
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={4}
				/> */}
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
	)
}
