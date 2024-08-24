import { CarLayout } from '../car'
import { EditCurrentValues } from '../car/edit-current-values'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { DocumentUploadForm } from './document-upload-form'

export function DocumentDetailsPage() {
	return (
		<CarLayout>
			<Dialog>
				<DialogTrigger className='w-full'>
					<div className='fixed left-0 top-1/4 z-10 rounded-r-xl bg-blue-875 p-1 px-5 font-jakarta font-semibold text-white hover:px-10 hover:duration-500'>
						Edit Vehicle Details
					</div>
				</DialogTrigger>
				<DialogContent>
					<EditCurrentValues />
				</DialogContent>
			</Dialog>
			<DocumentUploadForm />
		</CarLayout>
	)
}
