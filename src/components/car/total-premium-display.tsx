import { assets } from '@/assets'
import Image from 'next/image'

export function TotalPremiumDisplay() {
	return (
		<section className='flex w-full flex-col justify-start gap-4'>
			<div className='flex flex-col items-center justify-between gap-2'>
				<div className='font-dmserif text-xl'>Total Premium</div>
				<div className='border-blue-875 w-3/4 border-2'></div>
			</div>
			<div className='border-gray-825 shadow-premiumContainerShadow flex items-center justify-center rounded-2xl border p-5'>
				<div className='bg-blue-875 flex w-full flex-col items-start gap-6 rounded-3xl p-4 text-white'>
					<div className='flex w-full flex-row justify-between'>
						<div className='flex flex-col font-dmsan'>
							<h3 className='text-xs text-white'>Premium Amount</h3>
							<div className='flex flex-row gap-2'>
								<h2 className='text-xl font-bold'>582.00</h2>
								<Image
									alt='view'
									height={30}
									src={assets.icons.view}
									width={30}
								/>
							</div>
						</div>
						<Image
							alt='shield'
							height={30}
							src={assets.icons.shield}
							width={30}
						/>
					</div>
					<h1 className='font-dmsan text-xl font-bold'>Quote no: 2208 1996 2019 3013</h1>
					<div className='flex w-full flex-row items-center justify-between font-dmsan'>
						<div className='flex flex-col'>
							<h3 className='text-xs'>VALID THRU</h3>
							<h2 className='text-lg font-bold'>11/24</h2>
						</div>
						<span className='text-12'>Secured by Eagle</span>
					</div>
				</div>
			</div>
		</section>
	)
}
