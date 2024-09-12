import Image from 'next/image'
import { MoveDownRef } from './move-down-ref'
import { SelectLocation } from './select-location'
import { assets } from '@/assets'
import { SelectHomeCovers } from './select-home-covers'

export function HomeInsurancePage() {
	return (
		<section className='relative flex min-h-[90svh] flex-col items-center justify-end overflow-hidden'>
			<Image
				alt='bg'
				className='absolute top-0 -z-20 hidden max-h-[90svh] min-h-[90svh] w-full object-cover lg:flex'
				height={1080}
				src={assets.images.homeBg}
				width={1920}
			/>
			<Image
				alt='bg'
				className='absolute top-0 -z-20 flex max-h-screen min-h-screen w-full object-cover lg:hidden'
				height={1080}
				src={assets.images.apartment}
				width={1920}
			/>
			<SelectLocation />
			<section className='flex h-full w-full flex-col items-center gap-20 overflow-hidden px-4 pt-4 font-roboto lg:px-14 lg:pb-8 lg:pt-14'>
				<SelectHomeCovers />
				<MoveDownRef />
			</section>
		</section>
	)
}
