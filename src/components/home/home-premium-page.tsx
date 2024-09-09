import { Equal, Plus } from 'lucide-react'
import { TotalPremiumDisplayHome } from './total-premium-display-home'

export function HomePremiumPage() {
	return (
		<section className='flex w-full flex-col items-start gap-3 p-4 lg:flex-row'>
			<TotalPremiumDisplayHome />
			<div className='flex min-h-10 min-w-10 flex-row items-center justify-center self-center rounded-full bg-green-600'>
				<Plus
					color='white'
					size={32}
				/>
			</div>
			<TotalPremiumDisplayHome />
			<div className='flex min-h-10 min-w-10 flex-row items-center justify-center self-center rounded-full bg-green-600'>
				<Equal
					color='white'
					size={32}
				/>
			</div>
			<TotalPremiumDisplayHome />
		</section>
	)
}
