'use client'

import { cn } from '@/lib'
import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'
import { useState } from 'react'

type personalInformationFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function PersonalInformationField(props: personalInformationFieldProps) {
	const [customerType, setCustomerType] = useState<string>('Personal')
	const [customerOrInsured, setCustomerOrInsured] = useState<string>('Customer')

	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 1}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 1}
			subTitle='Additional information around Step 1'
			title='Step 1 - Personal Information'>
			<>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex flex-grow flex-col'>
						<span>Account Type</span>
						<div className='glex-row flex flex-grow gap-8'>
							<div
								className={cn(
									'cursor-pointer rounded-md border px-8 py-2 font-semibold',
									{
										'bg-blue-300 text-white': customerType === 'Personal'
									}
								)}
								onClick={() => {
									setCustomerType('Personal')
								}}>
								Personal
							</div>
							<div
								className={cn(
									'cursor-pointer rounded-md border px-8 py-2 font-semibold',
									{
										'bg-blue-300 text-white': customerType === 'Corporate'
									}
								)}
								onClick={() => {
									setCustomerType('Corporate')
								}}>
								Corporate
							</div>
						</div>
					</div>
					<div className='flex flex-grow flex-col'>
						<span>Customer or Insured</span>
						<div className='glex-row flex flex-grow gap-8'>
							<div
								className={cn(
									'cursor-pointer rounded-md border px-8 py-2 font-semibold',
									{
										'bg-blue-300 text-white': customerOrInsured === 'Customer'
									}
								)}
								onClick={() => {
									setCustomerOrInsured('Customer')
								}}>
								Customer
							</div>
							<div
								className={cn(
									'cursor-pointer rounded-md border px-8 py-2 font-semibold',
									{
										'bg-blue-300 text-white': customerOrInsured === 'Insured'
									}
								)}
								onClick={() => {
									setCustomerOrInsured('Insured')
								}}>
								Insured
							</div>
						</div>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='max-w-20'>
						<Label htmlFor='title'>Title</Label>
						<Input
							className='border-2 border-blue-925'
							id='title'
							placeholder='Title'
						/>
					</div>
					{customerType === 'Personal' ? (
						<>
							<div className='flex-grow'>
								<Label htmlFor='firstname'>First Name</Label>
								<Input
									className='border-2 border-blue-925'
									id='firstname'
									placeholder='First Name'
								/>
							</div>
							<div className='flex-grow'>
								<Label htmlFor='lastname'>Last Name</Label>
								<Input
									className='border-2 border-blue-925'
									id='lastname'
									placeholder='Last Name'
								/>
							</div>
						</>
					) : (
						<div className='flex-grow'>
							<Label htmlFor='company'>Company Name</Label>
							<Input
								className='border-2 border-blue-925'
								id='company'
								placeholder='Company Name'
							/>
						</div>
					)}
				</div>
				<div className='flex w-full flex-row gap-8'>
					{customerType === 'Personal' ? (
						<div className='flex-grow'>
							<Label htmlFor='category'>Socio-professional category</Label>
							<Input
								className='border-2 border-blue-925'
								id='category'
								placeholder='Socio-professional category'
							/>
						</div>
					) : (
						<div className='flex-grow'>
							<Label htmlFor='activites'>Activites</Label>
							<Input
								className='border-2 border-blue-925'
								id='activites'
								placeholder='Activites'
							/>
						</div>
					)}
					<div className='flex-grow'>
						<Label htmlFor='occupation'>Occupation</Label>
						<Input
							className='border-2 border-blue-925'
							id='occupation'
							placeholder='Occupation'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					{customerType === 'Personal' && (
						<div className='flex-grow'>
							<Label htmlFor='gender'>Gender</Label>
							<Input
								className='border-2 border-blue-925'
								id='gender'
								placeholder='Gender'
							/>
						</div>
					)}
					<div className='flex-grow'>
						<Label htmlFor='Civility'>Civility</Label>
						<Input
							className='border-2 border-blue-925'
							id='Civility'
							placeholder='Civility'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='DOB'>DOB</Label>
						<Input
							className='border-2 border-blue-925'
							id='DOB'
							placeholder='Date of Birth'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='Nationality'>Nationality</Label>
						<Input
							className='border-2 border-blue-925'
							id='Nationality'
							placeholder='Nationality'
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
