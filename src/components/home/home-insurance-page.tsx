import { MoveDownRef } from './move-down-ref'
import { SelectHomeCovers } from './select-home-covers'
import { SelectLocation } from './select-location'

export function HomeInsurancePage() {
	return (
		<section className='flex min-h-[90svh] items-center justify-end overflow-hidden'>
			<section className='flex h-full w-full flex-col items-center gap-20 overflow-hidden px-4 pt-4 font-roboto lg:px-14 lg:pb-8 lg:pt-14'>
				<SelectLocation />
				<SelectHomeCovers />
				<MoveDownRef />
			</section>
		</section>
	)
}
