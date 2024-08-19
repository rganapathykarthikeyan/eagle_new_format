import { type PropsWithChildren } from 'react'
import { Header } from '../header'
import { ChatBot } from '../support'
import { CarTextBanner } from './car-text-banner'
// import { CarBanner } from './car-banner'

export function CarLayout(props: PropsWithChildren) {
	return (
		<section className='relative flex h-full w-full flex-col'>
			<Header />
			{/* <ProgressIndicator /> */}
			{/* <CarBanner /> */}
			<CarTextBanner />
			<section className='grid h-full flex-grow grid-cols-4 px-4 lg:px-12'>
				{/* <div className='sticky right-0 top-10 hidden max-h-[80svh] lg:flex'>
					<Image
						alt='VehicleSketch'
						height={550}
						src={assets.images.vehicleSketch}
						width={500}
					/>
				</div> */}
				<div className='col-span-4 lg:col-span-4'>{props.children}</div>
			</section>
			<div className='fixed bottom-10 right-10'>
				<ChatBot />
			</div>
		</section>
	)
}
