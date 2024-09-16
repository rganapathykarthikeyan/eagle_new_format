import { type EachHomeDetails, type SectionDetails } from '@/redux/slices'
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'

type BuildingSumInsuredProps = {
	curDetails: EachHomeDetails
	updateSectionDetails: (
		fieldName: keyof SectionDetails,
		value: string,
		sectionId: string
	) => void
	constructionTypeList: {
		value: string
		label: string
	}[]
}

export function BuildingSumInsured(props: BuildingSumInsuredProps) {
	return (
		<>
			<Input
				className='w-full'
				placeholder='Building Sum Insured'
				value={props.curDetails.BuildingSumInsured}
				onChange={(e) => {
					props.updateSectionDetails('BuildingSumInsured', e.target.value, '1')
				}}
			/>
			<Select
				value={props.curDetails.OutbuildConstructType}
				onValueChange={(value) => {
					props.updateSectionDetails('OutbuildConstructType', value, '1')
				}}>
				<SelectTrigger className='border border-gray-375 bg-gray-975'>
					<SelectValue placeholder='Construct Type' />
				</SelectTrigger>
				<SelectContent>
					{props.constructionTypeList.map((type, index) => {
						return (
							<SelectItem
								key={index}
								value={type.value}>
								{type.label}
							</SelectItem>
						)
					})}
				</SelectContent>
			</Select>
		</>
	)
}
