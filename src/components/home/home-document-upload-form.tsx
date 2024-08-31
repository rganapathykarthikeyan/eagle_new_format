import { Minus, Plus } from 'lucide-react'
import UploadField from '../details/upload-field'
import { Button } from '../ui'

type HomeDocumentUploadFormProps = {
	goNext: () => void
}

export function HomeDocumentUploadForm(props: HomeDocumentUploadFormProps) {
	const docTypesList = [
		{ value: 'Licence ID', label: 'Licence ID' },
		{ value: 'Vehicle Registration ID', label: 'Vehicle Registration ID' }
	]

	function submit() {
		props.goNext()
	}

	return (
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
	)
}
