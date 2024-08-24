import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { CardDetails } from './card-details'
import { QRDetails } from './qr-details'

export function PaymentTypes() {
	return (
		<div className='flex h-full w-3/4'>
			<Tabs
				className='flex w-full flex-col items-center'
				defaultValue='card'>
				<TabsList className='flex w-1/2'>
					<TabsTrigger
						className='flex-grow'
						value='card'>
						Card
					</TabsTrigger>
					<TabsTrigger
						className='flex-grow'
						value='bank'>
						Bank
					</TabsTrigger>
					<TabsTrigger
						className='flex-grow'
						value='qrcode'>
						QR Code
					</TabsTrigger>
				</TabsList>
				<TabsContent
					className='w-1/2'
					value='card'>
					<CardDetails />
				</TabsContent>
				<TabsContent value='bank'>
					<CardDetails />
				</TabsContent>
				<TabsContent value='qrcode'>
					<QRDetails />
				</TabsContent>
			</Tabs>
		</div>
	)
}
