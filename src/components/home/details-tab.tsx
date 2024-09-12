import { cn } from '@/lib'

type DetailsTabProps = {
	details: string[]
	detailsPart: number
	updateDetailsPart: (index: number) => void
}

export function DetailsTab(props: DetailsTabProps) {
	return (
		<>
			{props.details.map((details, index) => {
				return (
					<div
						key={index}
						className={cn(
							'flex flex-row items-center gap-2 pb-4 text-sm font-medium text-gray-325',
							{
								'border-b border-gray-750 text-black':
									index + 1 === props.detailsPart
							}
						)}
						onClick={() => {
							props.updateDetailsPart(index)
						}}>
						<h4 className='cursor-pointer'>{details}</h4>
					</div>
				)
			})}
		</>
	)
}
