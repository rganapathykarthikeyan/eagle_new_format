import { cn } from '@/lib'
import { usePathname } from 'next/navigation'

export function CustomerDetailsTab() {
	const path = usePathname()

	return (
		<div className='to-blue-975 flex w-3/4 flex-col rounded-3xl bg-gradient-to-r from-blue-950 px-8 pt-4 font-sans font-semibold'>
			<div className='flex w-full items-center justify-center text-center font-inter text-3xl font-bold text-white'>
				<span>
					{path === '/car-insurance/details/customer-details' &&
						'Please update your customer details within 2 min'}
					{path === '/car-insurance/details/vehicle-details' &&
						'Please update your vehicle details within 2 min'}
				</span>
			</div>
			<div className='flex flex-row gap-10'>
				<div className='flex h-full flex-col items-center justify-end gap-2 p-6 pb-0'>
					<p className='rounded-3xl bg-white p-2 text-xs text-red-500'>2 min</p>
					<h4
						className={cn('p-2 text-sm text-white', {
							'rounded-t-2xl bg-white text-black':
								path === '/car-insurance/details/customer-details'
						})}>
						Customer Info
					</h4>
				</div>
				<div className='flex h-full flex-col items-center justify-end gap-2 p-6 pb-0'>
					<p className='rounded-3xl bg-white p-2 text-xs text-red-500'>3 min</p>
					<h4
						className={cn('p-2 text-sm text-white', {
							'rounded-t-2xl bg-white text-black':
								path === '/car-insurance/details/vehicle-details'
						})}>
						Vehicle Details
					</h4>
				</div>
			</div>
		</div>
	)
}
