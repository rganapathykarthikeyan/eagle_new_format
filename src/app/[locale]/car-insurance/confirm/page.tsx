import { ConfirmationPage } from '@/components/car'
import { CarPricing } from '@/components/car/car-pricing'

export default function Page() {
	return (
		<div className='flex h-screen w-full flex-col gap-6 overflow-y-scroll bg-gray-100'>
			<ConfirmationPage />
			<CarPricing />
		</div>
	)
}
