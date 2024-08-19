import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'

type valuationDetailsFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function ValuationDetailsField(props: valuationDetailsFieldProps) {
	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 2}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 2}
			subTitle='Additional information around Step 2'
			title='Step 2 - Valuation'>
			<>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='number'>New Value</Label>
						<Input
							className='border-2 border-blue-925'
							id='number'
							placeholder='New Value'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='market'>Market Value</Label>
						<Input
							className='border-2 border-blue-925'
							id='market'
							placeholder='Enter Market Value'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='aggregated'>Aggregated value</Label>
						<Input
							className='border-2 border-blue-925'
							id='aggregated'
							placeholder='Aggregated value'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='area'>Traffic Municipality</Label>
						<Input
							className='border-2 border-blue-925'
							id='area'
							placeholder='Traffic Municipality'
						/>
					</div>
				</div>
				<Button
					className='w-32'
					variant='greenbtn'
					onClick={props.goNext}>
					Continue
				</Button>
			</>
		</FormFieldLayout>
	)
}
