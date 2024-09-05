import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type EachHomeDetails = {
	homeAddress: string
	addressId: string
	ownerOrTenet: string
	sumInsured: string
	contents: string
	electricEquipement: string
	personalAccident: string
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
					sumInsured: '',
					contents: '',
					electricEquipement: '',
					personalAccident: ''
				})
			})
			state.homeDetailsList = curList
		},
		updateSingleAddressDetails(
			state: HomeDetails,
			action: PayloadAction<{ homeList: EachHomeDetails; index: number }>
		) {
			state.homeDetailsList[action.payload.index] = action.payload.homeList
		}
	}
})

export const { addNewAddress, updateSingleAddressDetails } = homeInsuranceSlice.actions
