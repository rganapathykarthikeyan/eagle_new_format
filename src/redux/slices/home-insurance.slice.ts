import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type EachHomeDetails = {
	homeAddress: string
	addressId: string
	ownerOrTenet: string
	sumInsured: string
	constents: string
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
			action: PayloadAction<{ value: string; label: string }[]>
		) {
			const curList: EachHomeDetails[] = []
			action.payload.forEach((home) => {
				curList.push({
					homeAddress: home.label,
					addressId: home.value,
					ownerOrTenet: '',
					sumInsured: '',
					constents: '',
					electricEquipement: '',
					personalAccident: ''
				})
			})
			state.homeDetailsList = curList
		}
	}
})

export const { addNewAddress } = homeInsuranceSlice.actions
