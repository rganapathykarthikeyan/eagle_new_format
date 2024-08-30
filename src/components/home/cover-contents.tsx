import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Input } from '../ui'

type CoverContentsProps = {
	icon: string
	title: string
	value: string
	fieldName: string
	updateDetails: (fieldName: string, value: string) => void
}

export function CoverContents(props: CoverContentsProps) {
	const [showDialog, setDialog] = useState<boolean>(false)

	return (
		<div className='relative flex w-full flex-col items-center justify-between gap-3 overflow-hidden rounded-lg border border-green-600 bg-green-700 py-3'>
			<Image
				alt='home'
				height={54}
				src={props.icon}
				width={54}
			/>
			<div className='flex flex-col items-center justify-between gap-1'>
				<span className='font-inter text-sm text-gray-325'>I want</span>
				<span className='font-inter text-lg font-medium'>{props.title}</span>
			</div>
			<div className='flex flex-row items-start justify-start self-start px-2'>
				<span className='text-xs font-bold'>{props.value} ZMW</span>
			</div>
			{props.value !== '' && (
				<>
					<div
						className='group absolute -bottom-6 -right-6 flex h-16 w-16 cursor-pointer rounded-full bg-green-800 hover:-bottom-5 hover:-right-5 hover:duration-300'
						onClick={() => {
							setDialog(true)
						}}>
						<Check
							className='p-3 text-white group-hover:hidden'
							color='white'
							size={50}
						/>
						<ArrowRight
							className='hidden p-3 text-white group-hover:flex'
							color='white'
							size={50}
						/>
					</div>
				</>
			)}
			{props.value === '' && (
				<div
					className='absolute -bottom-6 -right-6 flex h-16 w-16 cursor-pointer rounded-full bg-blue-825 hover:-bottom-5 hover:-right-5 hover:duration-300'
					onClick={() => {
						setDialog(true)
					}}>
					<ArrowRight
						className='p-3'
						color='white'
						size={50}
					/>
				</div>
			)}
			<Dialog
				open={showDialog}
				onOpenChange={() => {
					setDialog(false)
				}}>
				<DialogContent>
					<div className='flex w-full flex-row items-center justify-center gap-2 p-3'>
						<div className='w-full text-xs lg:text-base'>
							{props.title}
							<span className='text-red-500'>*</span>
						</div>
						<Input
							placeholder={props.fieldName}
							value={props.value}
							onChange={(e) => {
								props.updateDetails(props.fieldName, e.target.value)
							}}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
