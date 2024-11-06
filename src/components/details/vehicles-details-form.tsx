'use client'

import { useRouter } from 'next/navigation'
import { MotorDetailsField } from './motor-details-field'
import { Button } from '../ui'
import { CustomerDetailsTab } from './customer-details-tab'
import { Form } from '../ui/form'
import { z } from 'zod'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSaveVehicleInfoMutation } from '@/redux/api/commonApi'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import ClipLoader from 'react-spinners/ClipLoader'
import { updateVehicleDetails } from '@/redux/slices'

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
	const appData = useAppSelector((state) => state.apps)
	const customerData = useAppSelector((state) => state.customerDetails)

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { toast } = useToast()
	const route = useRouter()
	const dispatch = useAppDispatch()
	const [saveCustomerData] = useSaveVehicleInfoMutation()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			regNo: vehicleData.registrationNumber,
			chassisNo: vehicleData.chassisNumber,
			engineNo: vehicleData.engineNumber,
			engineCapacity: vehicleData.engineCapacity,
			color: vehicleData.color,
			seats: vehicleData.seat + '',
			tareweight: vehicleData.tareweight
		}
	})

	function navigateToDriver(values: z.infer<typeof formSchema>) {
		setIsLoading(true)
		const req = {
			Insuranceid: appData.insuranceID,
			BranchCode: appData.branchCode,
			Chassisnumber: values.chassisNo,
			Color: values.color ? values.color : '',
			CreatedBy: appData.loginId,
			EngineNumber: values.engineNo,
			Grossweight: values.tareweight,
			ManufactureYear: vehicleData.year + '',
			Motorusage: vehicleData.vehicleUsageID,
			NumberOfAxels: null,
			OwnerCategory: '1',
			Registrationnumber: values.regNo,
			ResEngineCapacity: values.engineCapacity,
			ResOwnerName: customerData.name,
			ResStatusCode: 'Y',
			ResStatusDesc: 'None',
			SeatingCapacity: values.seats,
			Tareweight: values.tareweight,
			Vehcilemodel: vehicleData.model,
			VehicleType: vehicleData.bodyType,
			Vehiclemake: vehicleData.mark,
			FuelType: vehicleData.fuelType
		}
		const res = saveCustomerData(req)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.Result !== null
			) {
				setIsLoading(false)
				route.push('/car-insurance/details/driver-details')
			} else if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError === true &&
				value.data.data.ErrorMessage !== null &&
				value.data.data.ErrorMessage.length !== 0
			) {
				setIsLoading(false)
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: value.data.data.ErrorMessage[0].Message
				})
			} else {
				setIsLoading(false)
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'There was a problem with your request.'
				})
			}
		})
	}

	function onSubmit(values: z.infer<typeof formSchema>) {
		dispatch(
			updateVehicleDetails({
				registrationNumber: values.regNo,
				chassisNumber: values.chassisNo,
				engineNumber: values.engineNo,
				engineCapacity: values.engineCapacity,
				color: values.color ? values.color : '',
				seat: values.seats,
				leased: false,
				bankName: ''
			})
		)
		route.push('/car-insurance/details/driver-details')
		navigateToDriver(values)
	}

	return (
		<section className='flex h-full w-full flex-col items-center gap-10 py-10'>
			<CustomerDetailsTab />
			<Form {...form}>
				<form
					className='w-full space-y-8 px-2 lg:w-4/5 lg:px-0'
					onSubmit={form.handleSubmit(onSubmit)}>
					<section className='flex flex-col justify-between gap-5'>
						<div className='grid w-full grid-cols-1 gap-5 lg:grid-cols-4'>
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
							className='w-1/3 lg:w-1/4'
							variant='greenbtn'>
							{isLoading ? (
								<ClipLoader
									color='#FFFFFF'
									size={20}
								/>
							) : (
								<span>Next</span>
							)}
						</Button>
					</div>
				</form>
			</Form>
		</section>
	)
}
