import { HomeDetailsPage } from './home-details-page'
import { HomeTextBanner } from './home-text-banner'

export function HomeCustomerDetails() {
	return (
		<section className='flex w-full flex-col gap-1'>
			<HomeTextBanner
				subtitle='Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.'
				title='Please provide your customer details within 2 min'
			/>
			<HomeDetailsPage />
		</section>
	)
}
