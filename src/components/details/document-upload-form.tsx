'use client'
import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui'
import { CustomerDetailsTab } from './customer-details-tab'
import UploadField from './upload-field'
import { useRouter } from 'next/navigation'

export function DocumentUploadForm() {
	const route = useRouter()

	const docTypesList = [
		{ value: 'Licence ID', label: 'Licence ID' },
		{ value: 'Vehicle Registration ID', label: 'Vehicle Registration ID' }
	]

	function submit() {
		route.push('/car-insurance/payment')
	}

	return (
		<section className='flex h-full w-full flex-col items-center gap-10 py-2 lg:py-10'>
			<CustomerDetailsTab />
			<section className='flex w-full flex-col items-center gap-10'>
				{docTypesList.map((type, index) => {
					return (
						<div
							key={index}
							className='flex w-full flex-row items-center gap-2 lg:w-1/2'>
							<UploadField
								key={index}
								// fileDataList={fileDataList}
								// handleFileChange={handleFileChange}
								index={index}
								type={type}
								// uploadDocument={uploadDocument}
							/>
							<Button
								size='sm'
								type='button'
								variant='bluebtn'
								// onClick={() => {
								// 	addId(type.label)
								// }}>
							>
								<Plus />
							</Button>
							<Button
								size='sm'
								type='button'
								variant='bluebtn'
								// onClick={() => {
								// 	removeId(index)
								// }}
							>
								<Minus />
							</Button>
						</div>
					)
				})}
				<div className='flex w-full items-center justify-center'>
					<Button
						className='w-1/4'
						variant='greenbtn'
						onClick={submit}>
						Next
					</Button>
				</div>
			</section>
		</section>
	)
}
