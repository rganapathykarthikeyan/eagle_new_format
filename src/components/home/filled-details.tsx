'use client'

import { useAppSelector } from '@/redux/hooks'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

export function FilledDetails() {
	const allLocationData = useAppSelector((state) => state.homeInsurance.homeDetailsList)

	return (
		<section>
			<Accordion
				collapsible
				type='single'>
				{allLocationData.map((location, index) => {
					return (
						<AccordionItem
							key={index}
							value={location.addressId}>
							<AccordionTrigger className='font-dmsan text-lg font-bold'>
								{location.homeAddress}
							</AccordionTrigger>
							<AccordionContent className='flex flex-col gap-4'>
								{location.sectionType.length === 0 && (
									<div>Please fill required Details</div>
								)}
								{location.sectionType.map((section, index) => {
									return (
										<div
											key={index}
											className='flex w-full flex-col gap-2 rounded-2xl border px-4 py-2 shadow-detailsContainerShadow'>
											<div className='font-dmsan font-semibold'>
												{section.SectionId === '1' && 'Building'}
												{section.SectionId === '3' && 'All Risk'}
												{section.SectionId === '47' && 'Content'}
												{section.SectionId === '106' && 'Domestic Servant'}
												{section.SectionId === '76' &&
													'Electronic Equipement'}
												{section.SectionId === '138' && 'Peronsal Accident'}
												{section.SectionId === '139' &&
													'Peronsal Liability'}
											</div>
											{section.BuildingSumInsured && (
												<div>
													Building Sum Insured:
													{section.BuildingSumInsured}
												</div>
											)}
											{section.OutbuildConstructType && (
												<div>
													Outbuild Construction Type:
													{section.OutbuildConstructType}
												</div>
											)}
											{section.ContentSuminsured && (
												<div>
													Content Sum Insured: {section.ContentSuminsured}
												</div>
											)}
											{section.allRiskSumInsured && (
												<div>
													All Risk Sum Insured:
													{section.allRiskSumInsured}
												</div>
											)}
											{section.PersonalLiabilitySi && (
												<div>
													Personal Liability SI:
													{section.PersonalLiabilitySi}
												</div>
											)}
											{section.DomesticServantType && (
												<div>
													Domestic Servant Type:
													{section.DomesticServantType}
												</div>
											)}
											{section.ServantCount && (
												<div>Servant Count: {section.ServantCount}</div>
											)}
											{section.DomesticServentSi && (
												<div>
													Domestic Servant SI: {section.DomesticServentSi}
												</div>
											)}
											{section.RelationType && (
												<div>Relation Type: {section.RelationType}</div>
											)}
											{section.PersonalAccidentSi && (
												<div>
													Personal Accident SI:
													{section.PersonalAccidentSi}
												</div>
											)}
										</div>
									)
								})}
							</AccordionContent>
						</AccordionItem>
					)
				})}
			</Accordion>
		</section>
	)
}
