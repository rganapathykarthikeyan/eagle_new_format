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
			e: 'kjIeGIM/2PWZlQUsLQBGq0uOWULX0QWRTSfk2dEbvBik/KTyszKentir1ZMEPiDDIy7dx9ARMZpmWZUTsFG2iODW+D+RTtyDbbytT2aceZakCOSI24Kbx3MkQg+3jdRNk6mPgHBpl5Waa2ZBZee4ek6aKaV3iIkCSiX4SokY0CJ6zIufj0WVPE5emAvchppF7SCL/CG5Dxh6tdzrQarEERmgrtg15T7ShalOk7mhozmUyMy6l1XbCDJVV46ozA96AOuA569DKORabFSO2KznTryiCQ3wwWQc/B9qAfeJizUA64Dnr0Mo5FpsVI7YrOdO1ijSMiMifMU='
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
