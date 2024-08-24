import { assets } from '@/assets'
import Image from 'next/image'
import { type CoverList } from './premium-page'
import { useEffect, useState } from 'react'
import { Button } from '../ui'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setTotal } from '@/redux/slices'

type TotalPremiumDisplayProps = {
	selectedCoverList: CoverList
	getOtpDialogOpen: () => void
}

export function TotalPremiumDisplay(props: TotalPremiumDisplayProps) {
	const [totalAmount, setTotalAmount] = useState<number>()

	const dispatch = useAppDispatch()

	const requestRef = useAppSelector((state) => state.motor.RequestReferenceNo)
	const endDate = useAppSelector((state) => state.carInsurance.policyEndDate)

	useEffect(() => {
		let total = 0
		props.selectedCoverList.forEach((cover) => {
			total += +cover.PremiumAfterTax
		})
		setTotalAmount(total)
		dispatch(setTotal(total))
	}, [props.selectedCoverList])

	function confirmBuy() {
		props.getOtpDialogOpen()
	}

	return (
		<section className='flex w-full flex-col justify-start gap-4'>
			<div className='flex flex-col items-center justify-between gap-2'>
				<div className='font-dmserif text-xl'>Total Premium</div>
				<div className='w-3/4 border-2 border-blue-875'></div>
			</div>
			<div className='flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-825 p-5 shadow-premiumContainerShadow'>
				<div className='flex w-full flex-col items-start gap-6 rounded-3xl bg-blue-875 p-4 text-white'>
					<div className='flex w-full flex-row justify-between'>
						<div className='flex flex-col font-dmsan'>
							<h3 className='text-xs text-white'>Premium Amount</h3>
							<div className='flex flex-row gap-2'>
								<h2 className='text-3xl font-bold'>{totalAmount} MUR</h2>
							</div>
						</div>
						<Image
							alt='shield'
							height={30}
							src={assets.icons.shield}
							width={30}
						/>
					</div>
					<h1 className='font-dmsan text-lg font-bold'>{requestRef}</h1>
					<div className='flex w-full flex-row items-center justify-between font-dmsan'>
						<div className='flex flex-col'>
							<h3 className='text-xs'>VALID THRU</h3>
							<h2 className='text-lg font-bold'>{endDate}</h2>
						</div>
						<span className='text-12'>Secured by Eagle</span>
					</div>
				</div>
				<div className='flex w-full flex-col items-start gap-3'>
					<div className='flex w-full flex-row items-center justify-between'>
						<h2 className='font-dmserif text-xl'>Covers Details</h2>
						<h2 className='font-dmsan text-xs'>in MUR</h2>
					</div>
					{props.selectedCoverList.map((cover) => {
						return (
							<div
								key={cover.CoverID}
								className='flex w-full flex-row justify-between border-b-[0.5px] border-opacity-40 font-dmsan text-sm'>
								<span>{cover.CoverDesc}</span>
								<span className='font-medium'>{cover.PremiumAfterTax}</span>
							</div>
						)
					})}
					<div className='flex w-full flex-row justify-between font-dmsan text-sm font-bold'>
						<h1>Grand Total</h1>
						<h1>{totalAmount}</h1>
					</div>
				</div>
			</div>
			<div className='flex w-full justify-center'>
				<Button
					className='w-3/4'
					variant='greenbtn'
					onClick={confirmBuy}>
					Buy Policy
				</Button>
			</div>
		</section>
	)
}
