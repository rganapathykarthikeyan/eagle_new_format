import { type CoverList } from './premium-page'

type PremiumDetailsDisplayProps = {
	mainCoverList: CoverList
}

export function PremiumDetailsDisplay(props: PremiumDetailsDisplayProps) {
	return (
		<section className='flex w-full flex-col gap-4'>
			<div className='flex flex-col items-center justify-between gap-2'>
				<div className='font-dmserif text-xl'>Premium Details</div>
				<div className='w-3/4 border-2 border-blue-875'></div>
			</div>

			{props.mainCoverList.length !== 0 &&
				props.mainCoverList.map((cover) => {
					return (
						<div
							key={cover.CoverID}
							className='flex flex-col gap-3 rounded-2xl border border-gray-825 p-5 shadow-premiumContainerShadow'>
							<div className='flex flex-row items-center justify-between gap-6 rounded-2xl bg-green-600 p-3 text-white'>
								{/* <div className='flex h-14 w-14 flex-row items-center justify-center overflow-hidden rounded-full'>
									<Image
										alt='car'
										className='h-full w-full object-cover object-center'
										height={300}
										src={assets.images.car}
										width={300}
									/>
								</div> */}
								<div className='flex flex-grow flex-col font-dmsan'>
									<span className='text-lg font-bold'>{cover.CoverDesc}</span>
									<span className='text-xs'>
										Sum Insured - {cover.SumInsured}
									</span>
								</div>
								<div>
									<h3 className='font-dmsan text-sm font-bold'>
										{cover.PremiumBeforeTax} MUR
									</h3>
								</div>
							</div>
							<div className='flex flex-col gap-2'>
								<div className='flex flex-row items-center justify-between'>
									<h2 className='font-dmserif text-xl'>{cover.CoverName}</h2>
									<span className='font-dmsan text-xs'>in MUR</span>
								</div>
								{cover.Taxes.map((tax) => {
									return (
										<div
											key={tax.TaxID}
											className='flex flex-row justify-between border-b-[0.5px] border-opacity-40 font-dmsan text-sm'>
											<span>
												{tax.TaxDesc} - {tax.TaxRate}
											</span>
											<span className='font-medium'>{tax.TaxAmount}</span>
										</div>
									)
								})}
								<div className='flex flex-row justify-between font-dmsan text-sm font-bold'>
									<h1>Grand Total</h1>
									<h1>{cover.PremiumAfterTax}</h1>
								</div>
							</div>
						</div>
					)
				})}
		</section>
	)
}
