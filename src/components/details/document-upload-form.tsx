'use client'
import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui'
import { CustomerDetailsTab } from './customer-details-tab'
import UploadField from './upload-field'

export function DocumentUploadForm() {
	const docTypesList = [
		{ value: 'Licence ID', label: 'Licence ID' },
		{ value: 'Vehicle Registration ID', label: 'Vehicle Registration ID' }
	]

	return (
		<section className='flex h-full w-full flex-col items-center gap-10 py-10'>
			<CustomerDetailsTab />
			<section className='flex w-full flex-col items-center gap-10'>
				{docTypesList.map((type, index) => {
					return (
						<div
							key={index}
							className='flex w-1/2 flex-row items-center gap-2'>
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
						variant='greenbtn'>
						Next
					</Button>
				</div>
			</section>
		</section>
	)
}
