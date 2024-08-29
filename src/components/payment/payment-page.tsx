import { CustomerDetailsTab } from '../details/customer-details-tab'
import { PaymentDetails } from './payment-details'

export function PaymentPage() {
	return (
		<section className='flex h-full w-full flex-col items-center justify-center gap-10 px-4 py-10'>
			<CustomerDetailsTab />
			<section className='flex w-full flex-col items-center justify-center gap-10 lg:w-3/4'>
				<PaymentDetails />
			</section>
		</section>
	)
}
