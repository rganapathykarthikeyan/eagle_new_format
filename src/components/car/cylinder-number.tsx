import { cn } from '@/lib'
import { useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function CylinderNumber() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	useGSAP(() => {
		if (vehicleData.seat === 0) {
			gsap.from('.selectCylinder', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.cylindertitle', { duration: 0.5, text: 'Cylinder Number' })
			gsap.to('.cylindersubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
		} else {
			gsap.from('.selectCylinder', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.cylindertitle', { duration: 0.5, text: 'Cylinder Number' })
			gsap.to('.cylindersubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
		}
	})

	return (
		<div className={cn('flex flex-col gap-7')}>
			<div className='flex flex-row items-center gap-4'>
				<div className='flex flex-col gap-2'>
					<h1 className='cylindertitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='cylindersubtitle font-inter text-sm font-medium text-gray-500'></span>
				</div>
			</div>
			<div className='selectCylinder flex w-full flex-row gap-10 lg:w-3/4'>
				{/* <Input
					placeholder='Number of Seats'
					type='number'
					value={vehicleData.tariffZone === '' ? vehicleData.tariffZone : ''}
					onChange={(e) => {
						dispatch(updateTariff(e.target.value))
					}}
				/> */}
			</div>
			{/* <div className='selectCylinder grid grid-cols-3 gap-6 lg:grid-cols-5'>
				<div
					key={2}
					className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
					onClick={() => {
						dispatch(updateTariff('2'))
					}}>
					2
				</div>
				<div
					key={4}
					className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
					onClick={() => {
						dispatch(updateTariff('4'))
					}}>
					4
				</div>
				<div
					key={6}
					className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
					onClick={() => {
						dispatch(updateTariff('6'))
					}}>
					6
				</div>
			</div> */}
		</div>
	)
}
