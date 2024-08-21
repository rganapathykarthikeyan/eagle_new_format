import { CarLayout } from '@/components/car'
import { CarTextBanner } from '@/components/car/car-text-banner'
import { EditCurrentValues } from '@/components/car/edit-current-values'
import { PremiumPage } from '@/components/car/premium-page'

export default function Page() {
	return (
		<CarLayout>
			<section className='grid h-full w-full grid-cols-10'>
				<div className='col-span-2 h-full w-full'>
					<EditCurrentValues />
				</div>
				<div className='col-span-8 flex h-full w-full flex-col gap-2'>
					<CarTextBanner />
					<div className='flex flex-row gap-2'>
						<PremiumPage />
					</div>
				</div>
			</section>
		</CarLayout>
	)
}
