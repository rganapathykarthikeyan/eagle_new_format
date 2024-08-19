import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'

type addressDetailsFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function AddressDetailsField(props: addressDetailsFieldProps) {
	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 4}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 4}
			subTitle='Additional information around Step 4'
			title='Step 4 - Address Details'>
			<>
				<div className='flex w-full flex-row gap-8'>
					<div className='basis-1/4'>
						<Label htmlFor='type'>Address Type</Label>
						<Input
							className='border-2 border-blue-925'
							id='type'
							placeholder='Address Type'
						/>
					</div>
					<div className='basis-3/4'>
						<Label htmlFor='address'>Address</Label>
						<Input
							className='border-2 border-blue-925'
							id='address'
							placeholder='Enter your Address'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='city'>City</Label>
						<Input
							className='border-2 border-blue-925'
							id='city'
							placeholder='City'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='pobox'>PO Box</Label>
						<Input
							className='border-2 border-blue-925'
							id='pobox'
							placeholder='PO Box'
						/>
					</div>
				</div>
				<div className='flex-grow'>
					<Label htmlFor='country'>Country</Label>
					<Input
						className='border-2 border-blue-925'
						id='country'
						placeholder='Country'
					/>
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
