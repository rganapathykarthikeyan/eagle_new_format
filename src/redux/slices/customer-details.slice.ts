import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	name: '',
	dob: '',
	code: '266',
	mobile: ''
}

export type CustomerDetails = {
	name: string
	dob: string
	code: string
	mobile: string
}

export const customerDetailsSlice = createSlice({
	name: 'customerDetails',
	initialState: initialState,
	reducers: {
		updateName(state: CustomerDetails, action: PayloadAction<string>) {
			state.name = action.payload
		},
		updateDob(state: CustomerDetails, action: PayloadAction<string>) {
			state.dob = action.payload
		},
		updateCode(state: CustomerDetails, action: PayloadAction<string>) {
			state.code = action.payload
		},
		updateMobile(state: CustomerDetails, action: PayloadAction<string>) {
			state.mobile = action.payload
		},
		updateCustomerDetails(
			state: CustomerDetails,
			action: PayloadAction<{ name: string; mobile: string }>
		) {
			state.name = action.payload.name
			state.mobile = action.payload.name
		}
	}
})

export const { updateDob, updateCode, updateMobile, updateName, updateCustomerDetails } =
	customerDetailsSlice.actions
