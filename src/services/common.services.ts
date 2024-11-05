import api, { type TResponse } from '@/lib/api'
import endPoints from './endpoints'
import {
	CurrencyListAPISchema,
	type vehicleUsageRequest,
	type CurrencyList,
	type CurrencyRequest,
	type SaveMotorDetailRequest,
	type policyEndDateList,
	policyEndDatesSchema,
	type saveMotorDetailsList,
	type GenerateOTPResponse,
	type GenerateOTPRequest,
	GenerateOTPResponseSchema,
	type ValidateOTPResponse,
	validateOTPResponseSchema,
	saveMotorDetailsSchema,
	type InsuranceClassTypeList,
	insuranceTypeListSchema,
	type InsuranceClassTypeRequest,
	type PremiumCalcData,
	type PremiumCalcRequest,
	premiumCalcDataSchema,
	type ViewPremiumCalData,
	type ViewPremiumCalcRequest,
	ViewPremiumCalDataSchema,
	type SaveCustomerDetailRequest,
	type SaveVehicleRequest,
	type SaveCustomerDetail,
	SaveCustomerDetailsResponseSchema,
	type SaveVehicleResponse,
	SaveVehicleResponseSchema,
	type OccupationListResponse,
	type OccupationListRequest,
	OccupationListResponseSchema,
	type RegionListResponse,
	type RegionListRequest,
	RegionListResponseSchema,
	type ColorListResponse,
	type ColorListRequest,
	ColorListResponseSchema,
	type DocumentTypeResponse,
	DocumentTypeResponseSchema,
	type DocumentTypeRequest,
	type BuyPolicyRequest,
	type BuyPolicy,
	buyPolicyResponseSchema,
	type ViewQuoteRes,
	type ViewQuoteRequest,
	viewQuoteResponseSchema,
	type UploadDocs,
	uploadDocResSchema,
	type getBankRes,
	type GetBankRequest,
	getBankResSchema,
	type PaymentTypeRes,
	paymentTypesResSchema,
	type PaymentTypeRequest,
	type SaveDriverRes,
	type SaveDriverRequest,
	saveDriverResSchema,
	type TypeRes,
	type TypeRequest,
	titletypeResSchema,
	type VehicleModelRes,
	type VehicleModelReq,
	VehicleModelResponseSchema,
	type FuelTypeRequest,
	type FuelTypeRes,
	fuelTypeResSchema,
	type IDTypesRes,
	type IdTypeRequest
} from './models/common.models'
import { MotorMakeSchema, type MotorList, type CommonModalRequest } from './models/common.models'
import {
	MotorModelListSchema,
	type MotorModelList,
	type MotorModalRequest
} from './models/common.models'
import { BodyTypeSchema, type BodyTypeList } from './models/common.models'
import { vehicleUsageSchema, type vehicleUsageList } from './models/common.models'
import { GuestLoginSchema, type GuestLogin } from './models/common.models'

export type GuestLoginResponse = TResponse<GuestLogin>

export async function doGuestLogin() {
	return api.post<GuestLogin>(
		endPoints.guestLogin,
		{
			e: 'BIxEDbyzljyRQioO+7ARQqLPPKu+WfA4udDCuES1WxsdFNDHLT6r7YP540AG1KmAQNWgrJuNuFGsOcuW6fb7wSBLK3luky6H576Ecw1t8syqtnp5ItYS0h+3UK7FRNYugQljNKJF2pDsu4O4M7mAIxmgrtg15T7ShalOk7mhoznnIbl5WSM+lnONMWpyqPqNfmF8ZEfSm3gagf0a+eZBDDlCiwzw0Lpqw7jSLMH8YyzgmUzu868ix2X9oRLgN2vUJzsd2+KWPAU5wqbwC/eVpYmvEB0NHJZxWqX2ez4V9MaCkz1oCxqssGYUIw2efm+j'
		},
		GuestLoginSchema
	)
}

export type CurrencyListResponse = TResponse<CurrencyList>

export async function getCurrencyList(data: CurrencyRequest, token: string | null) {
	return api.post<CurrencyList>(endPoints.currencyList, data, CurrencyListAPISchema, {
		headers: { Authorization: token }
	})
}

export type MotorListResponse = TResponse<MotorList>

export async function getMotorList(data: CommonModalRequest, token: string | null) {
	return api.post<MotorList>(endPoints.motorMake, data, MotorMakeSchema, {
		headers: { Authorization: token }
	})
}

export type MotorModelListResponse = TResponse<MotorModelList>

export async function getMotorModelList(data: MotorModalRequest, token: string | null) {
	return api.post<MotorModelList>(endPoints.modelList, data, MotorModelListSchema, {
		headers: { Authorization: token }
	})
}

export type BodyTypeListResponse = TResponse<BodyTypeList>

export async function getBodyTypeList(data: vehicleUsageRequest, token: string | null) {
	return api.post<BodyTypeList>(endPoints.bodyTypeList, data, BodyTypeSchema, {
		headers: { Authorization: token }
	})
}

export type VehicleUsageListResponse = TResponse<vehicleUsageList>

export async function getVehicleUsageList(data: vehicleUsageRequest, token: string | null) {
	return api.post<vehicleUsageList>(endPoints.vehicleUsage, data, vehicleUsageSchema, {
		headers: { Authorization: token }
	})
}

export type SaveMotorDetailResponse = TResponse<saveMotorDetailsList>

export async function saveMotorDetails(data: SaveMotorDetailRequest, token: string | null) {
	return api.post<saveMotorDetailsList>(
		endPoints.saveMotorDetails,
		data,
		saveMotorDetailsSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export type policyEndDateResponse = TResponse<policyEndDateList>

export async function getPolicyEndDates(data: { date: string }, token: string | null) {
	return api.get<policyEndDateList>(
		endPoints.policyEndDates + '?policyStartDate=' + data.date,
		policyEndDatesSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export type OTPResponse = TResponse<GenerateOTPResponse>

export async function generateOTP(data: GenerateOTPRequest, token: string | null) {
	return api.post<GenerateOTPResponse>(endPoints.generateOTP, data, GenerateOTPResponseSchema, {
		headers: { Authorization: token }
	})
}

export type verifyOTPResponse = TResponse<ValidateOTPResponse>

export async function verifyOTP(data: GenerateOTPRequest, token: string | null) {
	return api.post<ValidateOTPResponse>(endPoints.verifyOTP, data, validateOTPResponseSchema, {
		headers: { Authorization: token }
	})
}

export type InsuranceClassTypeResponse = TResponse<InsuranceClassTypeList>

export async function insuranceType(data: InsuranceClassTypeRequest, token: string | null) {
	return api.post<InsuranceClassTypeList>(
		endPoints.insuranceClass,
		data,
		insuranceTypeListSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export type PremiumCalcDataResponse = TResponse<PremiumCalcData>

export async function calculatePremium(data: PremiumCalcRequest, token: string | null) {
	return api.post<PremiumCalcData>(endPoints.calculator, data, premiumCalcDataSchema, {
		headers: { Authorization: token }
	})
}

export type ViewPremiumCalDataResponse = TResponse<ViewPremiumCalData>

export async function viewCalculatedPremium(data: ViewPremiumCalcRequest, token: string | null) {
	return api.post<ViewPremiumCalData>(endPoints.viewCalculated, data, ViewPremiumCalDataSchema, {
		headers: { Authorization: token }
	})
}

export type SaveCustomerDetailResponse = TResponse<SaveCustomerDetail>

export async function saveCustomerDetails(data: SaveCustomerDetailRequest, token: string | null) {
	return api.post<SaveCustomerDetail>(
		endPoints.saveCustomer,
		data,
		SaveCustomerDetailsResponseSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export type SaveVehcileDetialResponse = TResponse<SaveVehicleResponse>

export async function saveVehicleInfo(data: SaveVehicleRequest, token: string | null) {
	return api.post<SaveVehicleResponse>(endPoints.saveVehicle, data, SaveVehicleResponseSchema, {
		headers: { Authorization: token }
	})
}

export type OccupationList = TResponse<OccupationListResponse>

export async function getOccupationList(data: OccupationListRequest, token: string | null) {
	return api.post<OccupationListResponse>(
		endPoints.occupationList,
		data,
		OccupationListResponseSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export type RegionList = TResponse<RegionListResponse>

export async function getRegionList(data: RegionListRequest, token: string | null) {
	return api.post<RegionListResponse>(endPoints.regionList, data, RegionListResponseSchema, {
		headers: { Authorization: token }
	})
}

export type ColorList = TResponse<ColorListResponse>

export async function getColorList(data: ColorListRequest, token: string | null) {
	return api.post<ColorListResponse>(endPoints.colorList, data, ColorListResponseSchema, {
		headers: { Authorization: token }
	})
}

export type DocumentTypeResp = TResponse<DocumentTypeResponse>

export async function getDocumentTypeList(data: DocumentTypeRequest, token: string | null) {
	return api.post<DocumentTypeResponse>(
		endPoints.documentType,
		data,
		DocumentTypeResponseSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export type BuyPolicyResponse = TResponse<BuyPolicy>

export async function buyPolicy(data: BuyPolicyRequest, token: string | null) {
	return api.post<BuyPolicy>(endPoints.buyPolicy, data, buyPolicyResponseSchema, {
		headers: { Authorization: token }
	})
}

export type ViewQuoteResponse = TResponse<ViewQuoteRes>

export async function viewQuote(data: ViewQuoteRequest, token: string | null) {
	return api.post<BuyPolicy>(endPoints.viewQuote, data, viewQuoteResponseSchema, {
		headers: { Authorization: token }
	})
}

export type UploadDocsResponse = TResponse<UploadDocs>

export async function uploadDocs(data: FormData, token: string | null) {
	return api.post<UploadDocs>(endPoints.uploadFile, data, uploadDocResSchema, {
		headers: { Authorization: token }
	})
}

export type getBankResponse = TResponse<getBankRes>

export async function getBankDetails(data: GetBankRequest, token: string | null) {
	return api.post<getBankRes>(endPoints.bankList, data, getBankResSchema, {
		headers: { Authorization: token }
	})
}

export type PaymentTypeResponse = TResponse<PaymentTypeRes>

export async function getPaymentTypes(data: PaymentTypeRequest, token: string | null) {
	return api.post<PaymentTypeRes>(endPoints.paymentTypes, data, paymentTypesResSchema, {
		headers: { Authorization: token }
	})
}

export type SaveDriverResponse = TResponse<SaveDriverRes>

export async function saveDriverDetails(data: SaveDriverRequest, token: string | null) {
	return api.post<PaymentTypeRes>(endPoints.saveDriver, data, saveDriverResSchema, {
		headers: { Authorization: token }
	})
}

export type TitleTypeResponse = TResponse<TypeRes>

export async function getTitleTypes(data: TypeRequest, token: string | null) {
	return api.post<PaymentTypeRes>(endPoints.titleType, data, titletypeResSchema, {
		headers: { Authorization: token }
	})
}

export type VehicleModelResponse = TResponse<VehicleModelRes>

export async function getVehicleModelList(data: VehicleModelReq, token: string | null) {
	return api.post<VehicleModelRes>(
		endPoints.vehicleModelDetails,
		data,
		VehicleModelResponseSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export type FuelTypeResponse = TResponse<FuelTypeRes>

export async function getFuelType(data: FuelTypeRequest, token: string | null) {
	return api.post<FuelTypeRes>(endPoints.fuelTypes, data, fuelTypeResSchema, {
		headers: { Authorization: token }
	})
}

export type IDTypesResponse = TResponse<IDTypesRes>

export async function getIDTypes(data: IdTypeRequest, token: string | null) {
	return api.post<FuelTypeRes>(endPoints.idTypes, data, fuelTypeResSchema, {
		headers: { Authorization: token }
	})
}
