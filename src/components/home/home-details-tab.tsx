import { cn } from '@/lib'

type HomeDetailsTabProps = {
	current: number
	setCurrentNumber: (i: number) => void
}

export function HomeDetailsTab(props: HomeDetailsTabProps) {
	return (
		<div className='flex w-full flex-col gap-2 rounded-3xl bg-gradient-to-r from-blue-950 to-blue-975 px-1 font-sans font-semibold lg:w-3/4 lg:px-8'>
			<div className='flex w-full flex-row items-end justify-around gap-2 overflow-x-auto lg:gap-4'>
				<div className='flex h-full flex-col items-center justify-end gap-3 p-1 pb-0 lg:p-6 lg:pb-0'>
					<p className='rounded-3xl bg-white p-2 text-xs text-red-500'>3 min</p>
					<h4
						className={cn('cursor-pointer p-1 text-xs text-white lg:p-2 lg:text-sm', {
							'rounded-t-2xl bg-white text-black': props.current === 1
						})}
						onClick={() => {
							if (props.current > 1) {
								props.setCurrentNumber(1)
							}
						}}>
						Building Info
					</h4>
				</div>
				<div className='flex h-full flex-col items-center justify-end gap-3 p-1 pb-0 lg:p-6 lg:pb-0'>
					<p className='rounded-3xl bg-white p-2 text-xs text-red-500'>3 min</p>
					<h4
						className={cn('cursor-pointer p-1 text-xs text-white lg:p-2 lg:text-sm', {
							'rounded-t-2xl bg-white text-black': props.current === 2
						})}
						onClick={() => {
							if (props.current > 2) {
								props.setCurrentNumber(2)
							}
						}}>
						Content Info
					</h4>
				</div>
				<div className='flex h-full flex-col items-center justify-end gap-3 p-1 pb-0 lg:p-6 lg:pb-0'>
					<p className='rounded-3xl bg-white p-2 text-xs text-red-500'>3 min</p>
					<h4
						className={cn('cursor-pointer p-1 text-xs text-white lg:p-2 lg:text-sm', {
							'rounded-t-2xl bg-white text-black': props.current === 3
						})}
						onClick={() => {
							if (props.current > 3) {
								props.setCurrentNumber(3)
							}
						}}>
						Customer Details
					</h4>
				</div>
				<div className='flex h-full flex-col items-center justify-end gap-3 p-1 pb-0 lg:p-6 lg:pb-0'>
					<p className='rounded-3xl bg-white p-2 text-xs text-red-500'>3 min</p>
					<h4
						className={cn('cursor-pointer p-1 text-xs text-white lg:p-2 lg:text-sm', {
							'rounded-t-2xl bg-white text-black': props.current === 4
						})}
						onClick={() => {
							if (props.current > 4) {
								props.setCurrentNumber(4)
							}
						}}>
						Upload Documents
					</h4>
				</div>
				<div className='flex h-full flex-col items-center justify-end gap-3 p-1 pb-0 lg:p-6 lg:pb-0'>
					<p className='rounded-3xl bg-white p-2 text-xs text-red-500'>3 min</p>
					<h4
						className={cn('cursor-pointer p-1 text-xs text-white lg:p-2 lg:text-sm', {
							'rounded-t-2xl bg-white text-black': props.current === 5
						})}>
						Payment Method
					</h4>
				</div>
			</div>
		</div>
	)
}
