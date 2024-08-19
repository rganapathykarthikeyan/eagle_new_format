'use client'

import { useState } from 'react'
import { Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'
import { cn } from '@/lib'

type additionalVehicleInfoProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function AdditionalVehicleInfo(props: additionalVehicleInfoProps) {
	const [gps, setGPS] = useState<boolean>(false)
	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 4}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 4}
			subTitle='Additional information around Step 4'
			title='Step 4 - Additional Information'>
			<>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='hydrocardons'>Transport of hydrocarbons</Label>
						<Input
							className='border-2 border-blue-925'
							id='hydrocardons'
							placeholder='Transport of hydrocarbons'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='card'>Number of cards (WW Garage)</Label>
						<Input
							className='border-2 border-blue-925'
							id='card'
							placeholder='Number of cards (WW Garage)'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='circulation'>Date of circulation</Label>
						<Input
							className='border-2 border-blue-925'
							id='circulation'
							placeholder='DD/MM/YYYY'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='zone'>Do you have a GPS?</Label>
						<div className='flex flex-row gap-5'>
							<div
								className={cn(
									'cursor-pointer rounded-md border px-8 py-2 font-semibold',
									{
										'bg-blue-300 text-white': gps === true
									}
								)}
								onClick={() => {
									setGPS(true)
								}}>
								Yes
							</div>
							<div
								className={cn(
									'cursor-pointer rounded-md border px-8 py-2 font-semibold',
									{
										'bg-blue-300 text-white': gps === false
									}
								)}
								onClick={() => {
									setGPS(false)
								}}>
								No
							</div>
						</div>
					</div>
				</div>
			</>
		</FormFieldLayout>
	)
}
