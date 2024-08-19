import { ConfirmationTab } from '../car'
import { ConfirmRightSideBar } from '../car/confirm-right-side-bar'
import { CustomerDetailsForm } from '../details/customer-details-form'

export function CustomerDetailsPage() {
	return (
		<section className='flex h-full w-full flex-col gap-6 bg-white'>
			<ConfirmationTab />
			<section className='grid grid-cols-5 gap-6'>
				<div className='col-span-3 p-8 pl-16'>
					<CustomerDetailsForm />
				</div>
				<div className='col-span-2 flex h-fit justify-center'>
					<ConfirmRightSideBar />
				</div>
			</section>
		</section>
	)
}
