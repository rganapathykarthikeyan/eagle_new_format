import { CarLayout } from '@/components/car'
import { CarTextBanner } from '@/components/car/car-text-banner'
import { EditCurrentValues } from '@/components/car/edit-current-values'
// import { EditCurrentValues } from '@/components/car/edit-current-values'
import { PremiumPage } from '@/components/car/premium-page'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export default function Page() {
	return (
		<CarLayout>
			<section className='grid h-full w-full grid-cols-10'>
				{/* <div className='col-span-2 h-full w-full'>
					<EditCurrentValues />
				</div> */}
				<Dialog>
					<DialogTrigger className='w-full'>
						<div className='fixed left-0 top-1/4 z-10 rounded-r-xl bg-blue-875 p-1 px-5 font-jakarta font-semibold text-white hover:px-10 hover:duration-500'>
							Edit Vehicle Details
						</div>
					</DialogTrigger>
					<DialogContent>
						<EditCurrentValues />
					</DialogContent>
				</Dialog>

				<div className='col-span-10 flex h-full w-full flex-col gap-2'>
					<CarTextBanner />
					<div className='flex flex-row gap-2'>
						<PremiumPage />
					</div>
				</div>
			</section>
		</CarLayout>
	)
}
