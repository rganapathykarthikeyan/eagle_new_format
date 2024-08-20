import { CarLayout } from '@/components/car'
import { PremiumSideBar } from '@/components/car/premium-sidebar'

export default function Page() {
	return (
		<CarLayout>
			<section className='grid h-full w-full grid-cols-10'>
				<div className='col-span-7 h-full w-full'>View Calcs</div>
				<div className='col-span-3 h-full w-full'>
					<PremiumSideBar />
				</div>
			</section>
		</CarLayout>
	)
}
