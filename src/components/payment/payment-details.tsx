import { PaymentTypes } from './payment-types'

export function PaymentDetails() {
	return (
		<section className='flex w-full flex-col items-center justify-center gap-10'>
			{/* <div className='flex w-full flex-col items-center gap-2'>
				<h1 className='text-center font-inter text-4xl font-bold text-blue-825'>
					Add a Payment Method
				</h1>
				<p className='w-4/5 text-center font-roboto text-sm text-gray-500'>
					Let&apos;s get you all set up so you can access your personal account
				</p>
			</div> */}
			<div className='flex w-full flex-col items-center justify-center gap-2'>
				<PaymentTypes />
			</div>
		</section>
	)
}
