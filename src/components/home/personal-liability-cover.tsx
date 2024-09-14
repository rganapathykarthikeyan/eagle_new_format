import { type EachHomeDetails, type SectionDetails } from '@/redux/slices'
import { Input } from '../ui'
import Image from 'next/image'
import { assets } from '@/assets'

type DomesticServantDetailsProps = {
	curDetails: EachHomeDetails
	updateSectionDetails: (
		fieldName: keyof SectionDetails,
		value: string,
		sectionId: string
	) => void
}

export function PersonalLiabilityCover(props: DomesticServantDetailsProps) {
	return (
		<div className='relative flex flex-col gap-4 rounded-lg bg-[#DFDCFF] p-10'>
			<h1 className='font-dmsan text-3xl font-bold'>Personal Liability</h1>
			<p>We are committed to providing our customers with exceptional service.</p>
			<Input
				className='w-full lg:w-1/2'
				placeholder='Sum Insured'
				value={props.curDetails.PersonalLiabilitySi}
				onChange={(e) => {
					props.updateSectionDetails('PersonalLiabilitySi', e.target.value, '139')
				}}
			/>
			{/* <Input
									className='w-full lg:w-1/2'
									placeholder='Sum Insured'
									value={curDetails.sumInsured}
									onChange={(e) => {
										updateDetails('sumInsured', e.target.value)
									}}
								/> */}
			<Image
				alt='cover1'
				className='absolute -right-6 bottom-3'
				height={150}
				src={assets.images.coverPlan4}
				width={200}
			/>
		</div>
	)
}
