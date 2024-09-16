import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SectionDetails = {
	SectionId: string
	RiskId: null | string
	BuildingSumInsured?: string
	OutbuildConstructType?: string
	ContentSuminsured?: string
	allRiskSumInsured?: string
	PersonalLiabilitySi?: string
	DomesticServantType?: string
	ServantCount?: string
	DomesticServentSi?: string
	RelationType?: string
	PersonalAccidentSi?: string
	sumInsured?: string
}

export type EachHomeDetails = {
	homeAddress: string
	addressId: string
	ownerOrTenet: string
	BuildingSumInsured: string
	ContentSuminsured: string
	electricEquipement: string
	PersonalAccidentSi: string
	allRiskSumInsured: string
	DomesticServentSi: string
	PersonalLiabilitySi: string
	coverType: string
	OutbuildConstructType: string
	DomesticServantType: string
	ServantCount: string
	RelationType: string
	sectionType: SectionDetails[]
}

export type HomeDetails = {
	homeDetailsList: EachHomeDetails[]
}

const initialState: HomeDetails = {
	homeDetailsList: []
}

export const homeInsuranceSlice = createSlice({
	name: 'homeInsurance',
	initialState: initialState,
	reducers: {
		addNewAddress(
			state: HomeDetails,
			action: PayloadAction<{ value: string; label: string; ownerOrTenant: string }[]>
		) {
			const curList: EachHomeDetails[] = []
			action.payload.forEach((home) => {
				curList.push({
					homeAddress: home.label,
					addressId: home.value,
					ownerOrTenet: home.ownerOrTenant,
					allRiskSumInsured: '',
					DomesticServentSi: '',
					PersonalLiabilitySi: '',
					BuildingSumInsured: '',
					ContentSuminsured: '',
					electricEquipement: '',
					PersonalAccidentSi: '',
					coverType: '',
					DomesticServantType: '',
					RelationType: '',
					ServantCount: '',
					OutbuildConstructType: '',
					sectionType: []
				})
			})
			state.homeDetailsList = curList
		},
		updateSingleAddressDetails(
			state: HomeDetails,
			action: PayloadAction<{ homeList: EachHomeDetails; index: number }>
		) {
			state.homeDetailsList[action.payload.index] = action.payload.homeList
		},
		addNewCoverSectionTypes(
			state: HomeDetails,
			action: PayloadAction<{ NewList: SectionDetails[]; index: number; sectionId: string }>
		) {
			if (state.homeDetailsList[action.payload.index]) {
				state.homeDetailsList[action.payload.index].sectionType = [
					...state.homeDetailsList[action.payload.index].sectionType.filter(
						(item) => item.SectionId !== action.payload.sectionId
					),
					...action.payload.NewList
				]
			}
		}
	}
})

export const { addNewAddress, updateSingleAddressDetails, addNewCoverSectionTypes } =
	homeInsuranceSlice.actions
