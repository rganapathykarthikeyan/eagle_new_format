import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Input } from '../ui'
import { updateSeats } from '@/redux/slices'

export function CarSeating() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.seat === 0) {
			gsap.from('.selectseat', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.seattitle', { duration: 0.5, text: 'Number of Seats' })
			gsap.to('.seatsubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
		} else {
			gsap.from('.selectseat', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.seattitle', { duration: 0.5, text: 'Number of Seats' })
			gsap.to('.seatsubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
		}
	})

	// useEffect(() => {
	// 	if (seat !== '') {
	// 		dispatch(updateSeats(+seat))
	// 	}
	// }, [])

	return (
		<div className={cn('flex flex-col gap-7', { 'min-h-[65vh]': vehicleData.seat === 0 })}>
			<div className='flex flex-row items-center gap-4'>
				<div className='flex flex-col gap-2'>
					<h1 className='seattitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='seatsubtitle font-inter text-sm font-medium text-gray-500'></span>
				</div>
			</div>
			<div className='selectseat flex w-full flex-row gap-10 lg:w-3/4'>
				<Input
					placeholder='Number of Seats'
					type='number'
					value={vehicleData.seat !== 0 ? vehicleData.seat : ''}
					onChange={(e) => {
						dispatch(updateSeats(+e.target.value))
					}}
				/>
			</div>
			<div className='selectseat grid grid-cols-3 gap-6 lg:grid-cols-5'>
				<div
					key={2}
					className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
					onClick={() => {
						dispatch(updateSeats(2))
					}}>
					2
				</div>
				<div
					key={4}
					className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
					onClick={() => {
						dispatch(updateSeats(4))
					}}>
					4
				</div>
				<div
					key={6}
					className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
					onClick={() => {
						dispatch(updateSeats(6))
					}}>
					6
				</div>
			</div>
		</div>
	)
}
