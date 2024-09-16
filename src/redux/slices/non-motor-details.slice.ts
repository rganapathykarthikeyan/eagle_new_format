import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: NonMotorDetails = {
	RequestReferenceNo: '',
	CustomerReferenceNo: '',
	MSRefNo: '',
	CdRefNo: '',
	VdRefNo: '',
	Response: '',
	CreatedBy: '',
	InsuranceId: '',
	ProductId: '',
	SectionId: '',
	QuoteNo: '',
	CustomerId: '',
	AllCoverList: []
}

export type NonMotorDetails = {
	RequestReferenceNo: string
	CustomerReferenceNo: string
	MSRefNo: string
	CdRefNo: string
	VdRefNo: string
	Response: string
	CreatedBy: string
	InsuranceId: string
	ProductId: string
	SectionId: string
	QuoteNo: string
	CustomerId: string
	AllCoverList: {
		RequestReferenceNo: string
		CustomerReferenceNo: string
		MSRefNo: string
		CdRefNo: string
		VdRefNo: string
		Response: string
		CreatedBy: string
		InsuranceId: string
		ProductId: string
		SectionId: string
		RiskId: string
		LocationId: string
	}[]
}

export const nonMotorSlice = createSlice({
	name: 'nonmotor',
	initialState: initialState,
	reducers: {
		updateHomeDetails(
			state: NonMotorDetails,
			action: PayloadAction<{
				RequestReferenceNo: string
				CustomerReferenceNo: string
				MSRefNo: string
				CdRefNo: string
				VdRefNo: string
				Response: string
				CreatedBy: string
				InsuranceId: string
				ProductId: string
				SectionId: string
			}>
		) {
			state.CdRefNo = action.payload.CdRefNo
			state.CreatedBy = action.payload.CreatedBy
			state.CustomerReferenceNo = action.payload.CustomerReferenceNo
			state.InsuranceId = action.payload.InsuranceId
			state.MSRefNo = action.payload.MSRefNo
			state.ProductId = action.payload.ProductId
			state.RequestReferenceNo = action.payload.RequestReferenceNo
			state.Response = action.payload.Response
			state.SectionId = action.payload.SectionId
			state.VdRefNo = action.payload.VdRefNo
		},
		updateQuoteDetails(
			state: NonMotorDetails,
			action: PayloadAction<{ QuoteNo: string; CustomerId: string }>
		) {
			state.QuoteNo = action.payload.QuoteNo
			state.CustomerId = action.payload.CustomerId
		},
		updateHomeCoversList(
			state: NonMotorDetails,
			action: PayloadAction<
				{
					RequestReferenceNo: string
					CustomerReferenceNo: string
					MSRefNo: string
					CdRefNo: string
					VdRefNo: string
					Response: string
					CreatedBy: string
					InsuranceId: string
					ProductId: string
					SectionId: string
					RiskId: string
					LocationId: string
				}[]
			>
		) {
			state.AllCoverList = action.payload
			state.RequestReferenceNo = action.payload[0].RequestReferenceNo
			state.CustomerReferenceNo = action.payload[0].CustomerReferenceNo
			state.CreatedBy = action.payload[0].CreatedBy
			state.InsuranceId = action.payload[0].InsuranceId
			state.ProductId = action.payload[0].ProductId
			state.SectionId = action.payload[0].SectionId
		},
		updateCustomerReferenceNumber(state: NonMotorDetails, action: PayloadAction<string>) {
			state.CustomerReferenceNo = action.payload
		}
	}
})

export const {
	updateHomeDetails,
	updateQuoteDetails,
	updateHomeCoversList,
	updateCustomerReferenceNumber
} = nonMotorSlice.actions
