import Image from 'next/image'
import { Button } from '../ui'
import { assets } from '@/assets'

export function TotalPremiumDisplayHome() {
	return (
		<section className='flex w-full flex-col justify-start gap-4'>
			<div className='flex flex-col items-center justify-between gap-2'>
				<div className='font-dmserif text-xl'>Total Premium</div>
				<div className='w-3/4 border-2 border-blue-875'></div>
			</div>
			<div className='flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-825 p-5 shadow-premiumContainerShadow'>
				<div className='flex w-full flex-col items-start gap-6 rounded-3xl bg-blue-875 p-4 text-white'>
					<div className='flex w-full flex-row justify-between'>
						<div className='flex flex-col font-dmsan'>
							<h3 className='text-xs text-white'>Premium Amount</h3>
							<div className='flex flex-row gap-2'>
								<h2 className='text-3xl font-bold'>2075 MUR</h2>
							</div>
						</div>
						<Image
							alt='shield'
							height={30}
							src={assets.icons.shield}
							width={30}
						/>
					</div>
					<h1 className='font-dmsan text-lg font-bold'></h1>
					<div className='flex w-full flex-row items-center justify-between font-dmsan'>
						<div className='flex flex-col'>
							<h3 className='text-xs'>VALID THRU</h3>
							<h2 className='text-lg font-bold'></h2>
						</div>
						<span className='text-12'>Secured by Eagle</span>
					</div>
				</div>
				<div className='flex w-full flex-col items-start gap-3'>
					<div className='flex w-full flex-row items-center justify-between'>
						<h2 className='font-dmserif text-xl'>Covers Details</h2>
						<h2 className='font-dmsan text-xs'>in MUR</h2>
					</div>
					<div className='flex w-full flex-row justify-between border-b-[0.5px] border-opacity-40 font-dmsan text-sm'>
						<span>Home</span>
						<span className='font-medium'>2075</span>
					</div>
					<div className='flex w-full flex-row justify-between font-dmsan text-sm font-bold'>
						<h1>Grand Total</h1>
						<h1>2075 MUR</h1>
					</div>
				</div>
			</div>
			<div className='flex w-full justify-center'>
				<Button
					className='w-3/4'
					variant='greenbtn'>
					Buy Policy
				</Button>
			</div>
		</section>
	)
}
