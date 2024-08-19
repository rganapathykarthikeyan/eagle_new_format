import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { updateTariff } from '@/redux/slices'
import gsap from 'gsap'

export default function TariffZone() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.seat === 0) {
			gsap.from('.selectTariff', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.tarifftitle', { duration: 0.5, text: 'Tariff Zone' })
			gsap.to('.tariffsubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
		} else {
			gsap.from('.selectTariff', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.tarifftitle', { duration: 0.5, text: 'Tariff Zone' })
			gsap.to('.tariffsubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
		}
	})

	return (
		<div
			className={cn('flex flex-col gap-7', {
				'min-h-[65vh]': vehicleData.tariffZone === ''
			})}>
			<div className='flex flex-row items-center gap-4'>
				<div className='flex flex-col gap-2'>
					<h1 className='tarifftitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='tariffsubtitle font-inter text-sm font-medium text-gray-500'></span>
				</div>
			</div>
			<div className='selectTariff flex w-full flex-row gap-10 lg:w-3/4'>
				<Select
					value={vehicleData.fuelType}
					onValueChange={(e) => {
						dispatch(updateTariff(e))
					}}>
					<SelectTrigger
						className='w-3/4'
						title='Tariff'
						value={vehicleData.fuelType}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Northern'>Northern</SelectItem>
						<SelectItem value='Western'>Western</SelectItem>
						<SelectItem value='Southern'>Southern</SelectItem>
						<SelectItem value='Southern East'>Southern East</SelectItem>
						<SelectItem value='Eastern'>Eastern</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className='selectTariff grid grid-cols-3 gap-6 lg:grid-cols-5'>
				<div
					key={2}
					className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
					onClick={() => {
						dispatch(updateTariff('Northern'))
					}}>
					Northern
				</div>
				<div
					key={4}
					className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
					onClick={() => {
						dispatch(updateTariff('Western'))
					}}>
					Western
				</div>
				<div
					key={6}
					className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
					onClick={() => {
						dispatch(updateTariff('Southern'))
					}}>
					Southern
				</div>
			</div>
		</div>
	)
}
