import { Button } from '../ui'

type BuildingDetailsProps = {
	goNext: () => void
}

export function BuildingDetails(props: BuildingDetailsProps) {
	return (
		<section className='flex h-full w-full flex-row gap-2'>
			<div className='h-full w-full flex-col'>Building Details</div>
			<div className='h-full w-full flex-col'>
				<Button
					variant='greenbtn'
					onClick={props.goNext}>
					Save
				</Button>
			</div>
		</section>
	)
}
