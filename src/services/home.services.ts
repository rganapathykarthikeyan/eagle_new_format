import { type TResponse } from '@/lib/api'
import {
	type SaveNonMotorDetailRequest,
	saveNonMotorDetailsSchema,
	type saveNonMotorDetailsList,
	type getItemValueRes,
	type getItemValueRequest,
	getItemValueResSchema,
	type PremiumCalcHomeRequest
} from './models/home.models'
import endPoints from './endpoints'
import api2 from '@/lib/api2'
import {
	GuestLoginSchema,
	type SaveCustomerDetail,
	type SaveCustomerDetailRequest,
	SaveCustomerDetailsResponseSchema,
	type GuestLogin,
	type PremiumCalcData,
	premiumCalcDataSchema,
	type ViewPremiumCalcRequest
} from './models/common.models'

export type GuestLoginResponse = TResponse<GuestLogin>

export async function doGuestLogin() {
	return api2.post<GuestLogin>(
		endPoints.guestLogin,
		{
			e: 'kjIeGIM/2PWZlQUsLQBGq0uOWULX0QWRTSfk2dEbvBik/KTyszKentir1ZMEPiDD4ccgJA4xIW5Km9gKJ+DaePfMhFOhCteQZlr4nEmudBr4WLnPTSVRyIZGOKfpqZAuvaCx5NSm8uEDOdxNSaxLpukUPBUPDieixZ3VYffdIuN0cz6qjzo2psO40izB/GMs4JlM7vOvIsf8WNjIQZ0ci+DW+D+RTtyDbbytT2aceZaDCgf10qYQF5FCKg77sBFCos88q75Z8DhDyaUntMzQ9AArWpe7G9Npj4Fg0v9gSvOizzyrvlnwOANRthoINszO'
		},
		GuestLoginSchema
	)
}

export type SaveNonMotorDetailResponse = TResponse<saveNonMotorDetailsList>

export async function saveNonMotorDetails(data: SaveNonMotorDetailRequest, token: string | null) {
	return api2.post<saveNonMotorDetailsList>(
		endPoints.saveNonMotorDetails,
		data,
		saveNonMotorDetailsSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export async function saveCustomerDetails(data: SaveCustomerDetailRequest, token: string | null) {
	return api2.post<SaveCustomerDetail>(
		endPoints.saveCustomer,
		data,
		SaveCustomerDetailsResponseSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export type getItemValueResponse = TResponse<getItemValueRes>

export async function getItemValue(data: getItemValueRequest, token: string | null) {
	return api2.post<getItemValueRes>(endPoints.getItemValue, data, getItemValueResSchema, {
		headers: { Authorization: token }
	})
}

export async function calculateHomePremium(data: PremiumCalcHomeRequest, token: string | null) {
	return api2.post<PremiumCalcData>(endPoints.calculator, data, premiumCalcDataSchema, {
		headers: { Authorization: token }
	})
}

export async function viewCalculatedHomePremium(
	data: ViewPremiumCalcRequest,
	token: string | null
) {
	return api2.post<PremiumCalcData>(endPoints.viewCalculated, data, premiumCalcDataSchema, {
		headers: { Authorization: token }
	})
}
