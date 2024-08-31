'use client'

import { useState } from 'react'
import { HomeDetailsTab } from './home-details-tab'
import { BuildingDetails } from './building-details'
import { ContentDetails } from './content-details'
import { HomeCustomerInfo } from './home-customer-info'
import { HomeDocumentUploadForm } from './home-document-upload-form'
import { PaymentDetails } from '../payment/payment-details'

export function HomeDetailsPage() {
	const [current, setCurrent] = useState<number>(1)

	function setCurrentNumber(i: number) {
		setCurrent(i)
	}

	function goNext() {
		setCurrent((pre) => pre + 1)
	}

	return (
		<section className='flex w-full flex-col items-center gap-2'>
			<HomeDetailsTab
				current={current}
				setCurrentNumber={setCurrentNumber}
			/>
			{current === 1 && <BuildingDetails goNext={goNext} />}
			{current === 2 && <ContentDetails goNext={goNext} />}
			{current === 3 && <HomeCustomerInfo goNext={goNext} />}
			{current === 4 && <HomeDocumentUploadForm goNext={goNext} />}
			{current === 5 && <PaymentDetails />}
		</section>
	)
}
