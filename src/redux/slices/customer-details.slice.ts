import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: CustomerDetails = {
	name: '',
	code: '260',
	mobile: '',
	premium: false,
	email: '',
	title: '',
	occupation: '',
	gender: '',
	dob: '',
	nrc: '',
	passport: '',
	accType: 'Personal',
	companyRegistrationNumber: '',
	address: '',
	city: '',
	poBox: '',
	workAddress: '',
	code2: '',
	mobile2: '',
	cityName: '',
	isResident: true
}

export type CustomerDetails = {
	name: string
	code: string
	mobile: string
	premium: boolean
	email: string
	title: string
	gender: string
	occupation: string
	dob: string
	nrc: string
	passport: string
	accType: string
	companyRegistrationNumber: string
	address: string
	city: string
	poBox: string
	workAddress: string
	code2: string
	mobile2: string
	cityName: string
	isResident: boolean
}

export const customerDetailsSlice = createSlice({
	name: 'customerDetails',
	initialState: initialState,
	reducers: {
		updateName(state: CustomerDetails, action: PayloadAction<string>) {
			state.name = action.payload
		},
		updateCode(state: CustomerDetails, action: PayloadAction<string>) {
			state.code = action.payload
		},
		updateMobile(state: CustomerDetails, action: PayloadAction<string>) {
			state.mobile = action.payload
		},
		updatePremium(state: CustomerDetails, action: PayloadAction<boolean>) {
			state.premium = action.payload
		},
		updateEmail(state: CustomerDetails, action: PayloadAction<string>) {
			state.email = action.payload
		},
		updateCustomerDetails(
			state: CustomerDetails,
			action: PayloadAction<{ name: string; mobile: string }>
		) {
			state.name = action.payload.name
			state.mobile = action.payload.mobile
		},
		updatePersonalDetails(
			state: CustomerDetails,
			action: PayloadAction<{
				title: string
				gender: string
				occupation: string
				dob: string
				name: string
				mobile: string
				accountType: string
			}>
		) {
			state.title = action.payload.title
			state.gender = action.payload.gender
			state.occupation = action.payload.occupation
			state.dob = action.payload.dob
			state.name = action.payload.name
			state.mobile = action.payload.mobile
			state.accType = action.payload.accountType
		},
		updateIdentificationDetails(
			state: CustomerDetails,
			action: PayloadAction<{
				nrc: string
				passport: string
				companyNumber: string
				isResident: boolean
			}>
		) {
			state.nrc = action.payload.nrc
			state.passport = action.payload.passport
			state.companyRegistrationNumber = action.payload.companyNumber
			state.isResident = action.payload.isResident
		},
		updateAddressDetails(
			state: CustomerDetails,
			action: PayloadAction<{
				address: string
				city: string
				poBox: string
				workAddress: string
				cityName: string
			}>
		) {
			state.address = action.payload.address
			state.city = action.payload.city
			state.poBox = action.payload.poBox
			state.workAddress = action.payload.workAddress
			state.cityName = action.payload.cityName
		},
		updateContactInformation(
			state: CustomerDetails,
			action: PayloadAction<{
				email: string
				code: string
				mobile: string
				code2: string
				mobile2: string
			}>
		) {
			state.email = action.payload.email
			state.code = action.payload.code
			state.mobile = action.payload.mobile
			state.code2 = action.payload.code2
			state.code2 = action.payload.code2
		}
	}
})

export const {
	updateCode,
	updateMobile,
	updateName,
	updatePremium,
	updateEmail,
	updatePersonalDetails,
	updateIdentificationDetails,
	updateAddressDetails,
	updateContactInformation,
	updateCustomerDetails
} = customerDetailsSlice.actions
