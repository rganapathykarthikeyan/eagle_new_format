import { CarLayout } from '../car'
import { CustomerDetailsForm } from '../details/customer-details-form'

export function CustomerDetailsPage() {
	return (
		<CarLayout>
			{/* <Dialog>
				<DialogTrigger className='w-full'>
					<div className='fixed left-0 top-[12%] z-10 rounded-r-xl bg-blue-875 p-1 px-5 font-jakarta font-semibold text-white hover:px-10 hover:duration-500 lg:top-1/4'>
						Edit Vehicle Details
					</div>
				</DialogTrigger>
				<DialogContent>
					<EditCurrentValues />
				</DialogContent>
			</Dialog> */}
			<CustomerDetailsForm />
		</CarLayout>
	)
}
