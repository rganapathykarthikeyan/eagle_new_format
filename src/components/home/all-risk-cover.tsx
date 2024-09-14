import { assets } from '@/assets'
import { type EachHomeDetails, type SectionDetails } from '@/redux/slices'
import Image from 'next/image'
import { Input } from '../ui'

type AllRiskCoverProps = {
	curDetails: EachHomeDetails
	updateSectionDetails: (
		fieldName: keyof SectionDetails,
		value: string,
		sectionId: string
	) => void
}

export function AllRiskCover(props: AllRiskCoverProps) {
	return (
		<div className='relative flex flex-col gap-4 rounded-lg bg-[#E9F2FF] p-10'>
			<h1 className='font-dmsan text-3xl font-bold'>All Risk</h1>
			<p>We are committed to providing our customers with exceptional service.</p>
			<Input
				className='w-full lg:w-1/2'
				placeholder='Sum Insured'
				value={props.curDetails.allRiskSumInsured}
				onChange={(e) => {
					// updateDetails('allRiskSumInsured', e.target.value)
					props.updateSectionDetails('allRiskSumInsured', e.target.value, '3')
				}}
			/>
			<Image
				alt='cover1'
				className='absolute -right-7 bottom-3'
				height={150}
				src={assets.images.coverPlan1}
				width={230}
			/>
		</div>
	)
}
