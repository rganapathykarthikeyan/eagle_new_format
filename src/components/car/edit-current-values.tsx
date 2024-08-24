'use client'

import { PencilLine } from 'lucide-react'
import { Button } from '../ui'
import { useState } from 'react'
import { Label } from '../ui/label'
import { useAppSelector } from '@/redux/hooks'
import { EditContents } from './edit-contents'

export function EditCurrentValues() {
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const vehicleData = useAppSelector((state) => state.carInsurance)

	function exitEditMode() {
		setIsEditMode(false)
	}

	return (
		<section className='flex w-full flex-col items-center justify-center gap-3 p-6'>
			<Button
				className='w-full rounded-3xl'
				variant='greenbtn'
				onClick={() => {
					setIsEditMode(true)
				}}>
				<div className='flex w-full flex-row items-center justify-between'>
					<span>Vehicle Details</span>
					<span className='flex flex-row items-center gap-2'>
						Edit <PencilLine size={16} />
					</span>
				</div>
			</Button>
			{isEditMode ? (
				<div className='flex w-full flex-col gap-8 rounded-xl px-4 py-8 shadow-containerShadow1'>
					<EditContents exitEdit={exitEditMode} />
				</div>
			) : (
				<div className='flex w-full flex-col gap-8 rounded-xl px-4 py-8 shadow-containerShadow1'>
					<div className='flex flex-col gap-2'>
						<Label className='text-blue-850'>Body Type</Label>
						<div className='border border-gray-920 p-2 shadow-inputShadowDrop'>
							{vehicleData.bodyType}
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<Label className='text-blue-850'>Make</Label>
						<div className='border border-gray-920 p-2 shadow-inputShadowDrop'>
							{vehicleData.mark}
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<Label className='text-blue-850'>Model</Label>
						<div className='border border-gray-920 p-2 shadow-inputShadowDrop'>
							{vehicleData.model}
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<Label className='text-blue-850'>Vehicle Usage</Label>
						<div className='border border-gray-920 p-2 shadow-inputShadowDrop'>
							{vehicleData.vehicleUsage}
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<Label className='text-blue-850'>Manufacture Year</Label>
						<div className='border border-gray-920 p-2 shadow-inputShadowDrop'>
							{vehicleData.year}
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<Label className='text-blue-850'>Sum Insured</Label>
						<div className='border border-gray-920 p-2 shadow-inputShadowDrop'>
							{vehicleData.sumInsured}
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
