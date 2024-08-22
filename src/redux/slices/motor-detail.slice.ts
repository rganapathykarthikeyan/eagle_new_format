import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: MotorDetails = {
	CoverList: null,
	RequestReferenceNo: '',
	CustomerReferenceNo: '',
	VehicleId: '',
	MSRefNo: '',
	CdRefNo: '',
	VdRefNo: '',
	DdRefNo: '',
	Response: '',
	CreatedBy: '',
	InsuranceId: '',
	ProductId: '',
	SectionId: '',
	QuoteNo: '',
	CustomerId: '',
	AllCoverList: []
}

export type MotorDetails = {
	CoverList: string | null
	RequestReferenceNo: string
	CustomerReferenceNo: string
	VehicleId: string
	MSRefNo: string
	CdRefNo: string
	VdRefNo: string
	DdRefNo: string
	Response: string
	CreatedBy: string
	InsuranceId: string
	ProductId: string
	SectionId: string
	QuoteNo: string
	CustomerId: string
	AllCoverList: {
		CoverList: string | null
		RequestReferenceNo: string
		CustomerReferenceNo: string
		VehicleId: string
		MSRefNo: string
		CdRefNo: string
		VdRefNo: string
		DdRefNo: string
		Response: string
		CreatedBy: string
		InsuranceId: string
		ProductId: string
		SectionId: string
	}[]
}

export const motorSlice = createSlice({
	name: 'motor',
	initialState: initialState,
	reducers: {
		updateDetails(
			state: MotorDetails,
			action: PayloadAction<{
				CoverList: string | null
				RequestReferenceNo: string
				CustomerReferenceNo: string
				VehicleId: string
				MSRefNo: string
				CdRefNo: string
				VdRefNo: string
				DdRefNo: string
				Response: string
				CreatedBy: string
				InsuranceId: string
				ProductId: string
				SectionId: string
			}>
		) {
			state.CdRefNo = action.payload.CdRefNo
			state.CoverList = action.payload.CoverList
			state.CreatedBy = action.payload.CreatedBy
			state.CustomerReferenceNo = action.payload.CustomerReferenceNo
			state.DdRefNo = action.payload.DdRefNo
			state.InsuranceId = action.payload.InsuranceId
			state.MSRefNo = action.payload.MSRefNo
			state.ProductId = action.payload.ProductId
			state.RequestReferenceNo = action.payload.RequestReferenceNo
			state.Response = action.payload.Response
			state.SectionId = action.payload.SectionId
			state.VdRefNo = action.payload.VdRefNo
			state.VehicleId = action.payload.VehicleId
		},
		updateQuoteDetails(
			state: MotorDetails,
			action: PayloadAction<{ QuoteNo: string; CustomerId: string }>
		) {
			state.QuoteNo = action.payload.QuoteNo
			state.CustomerId = action.payload.CustomerId
		},
		updateCoversList(
			state: MotorDetails,
			action: PayloadAction<
				{
					CoverList: string | null
					RequestReferenceNo: string
					CustomerReferenceNo: string
					VehicleId: string
					MSRefNo: string
					CdRefNo: string
					VdRefNo: string
					DdRefNo: string
					Response: string
					CreatedBy: string
					InsuranceId: string
					ProductId: string
					SectionId: string
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
			state.VehicleId = action.payload[0].VehicleId
		}
	}
})

export const { updateDetails, updateQuoteDetails, updateCoversList } = motorSlice.actions
