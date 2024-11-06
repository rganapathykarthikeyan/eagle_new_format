import { X } from 'lucide-react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui'
import { useRouter } from 'next/navigation'

type PaymentFailedProps = {
	isFailed: boolean
	requestNumber: string
	QuoteNo: string
	policyNumber: string
	debitNoteNumber: string
	merchantRefNumber: string
}

export function PaymentFailedDialog(props: PaymentFailedProps) {
	const route = useRouter()

	return (
		<Dialog open={props.isFailed}>
			<DialogContent className='max-w-[90svw] md:max-w-[78svw] lg:max-w-[60svw]'>
				<div className='flex h-full w-full flex-col items-center justify-center gap-2 p-2'>
					<div className='flex h-28 w-28 items-center justify-center rounded-full bg-red-200 bg-opacity-50'>
						<div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-500'>
							<X
								color='white'
								height={30}
								width={30}
							/>
						</div>
					</div>
					<div className='flex w-full flex-col items-center justify-center gap-3 rounded-md border border-gray-450 border-opacity-60 p-4'>
						<h1 className='font-jakarta text-lg font-bold text-red-500'>
							Payment Failed
						</h1>
						<div className='grid w-full grid-cols-3 border-b border-gray-450 border-opacity-60 pb-4'>
							<div className='flex h-full flex-col justify-between'>
								<span className='text-xs md:text-base'>Reference Number</span>
								<h4 className='text-xs font-semibold text-blue-450 md:text-base'>
									{props.requestNumber}
								</h4>
							</div>
							<div className='flex h-full flex-col justify-between'>
								<span className='text-xs md:text-base'>Quote Number</span>
								<h4 className='text-xs font-semibold text-blue-450 md:text-base'>
									{props.QuoteNo}
								</h4>
							</div>
							<div className='flex h-full flex-col justify-between'>
								<span className='text-xs md:text-base'>Policy Number</span>
								<h4 className='text-xs font-semibold text-blue-450 md:text-base'>
									{props.policyNumber}
								</h4>
							</div>
						</div>
						<div className='grid w-full grid-cols-3 border-b border-gray-450 border-opacity-60 pb-4'>
							<div className='flex h-full flex-col justify-between'>
								<span className='text-xs md:text-base'>Debit Note No</span>
								<h4 className='text-xs font-semibold text-blue-450 md:text-base'>
									{props.debitNoteNumber}
								</h4>
							</div>
							<div className='flex h-full flex-col justify-between'>
								<span className='text-xs md:text-base'>Merchant Reference No</span>
								<h4 className='text-xs font-semibold text-blue-450 md:text-base'>
									{props.merchantRefNumber}
								</h4>
							</div>
						</div>
						<div className='flex w-full flex-row justify-center gap-2'>
							<Button
								className='w-1/4 text-xs'
								size='lg'
								variant='whiteBlackOutlined'>
								Debit Note PDF
							</Button>
							<Button
								className='w-1/4 text-xs'
								size='lg'
								variant='whiteBlackOutlined'>
								Schedule PDF
							</Button>
						</div>
					</div>
					<div className='flex w-full flex-row justify-center gap-2'>
						<Button
							className='w-1/5'
							size='lg'
							variant='bluebtn'
							onClick={() => {
								route.push('/dashboard')
							}}>
							Proceed
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
