import { z } from 'zod'

export const locationListSchema = z.array(
	z.object({
		LocationId: z.string(),
		LocationName: z.string(),
		SectionList: z.array(
			z.object({
				SectionId: z.string(),
				RiskId: z.string().nullable(),
				BuildingSumInsured: z.string().optional(),
				OutbuildConstructType: z.string().optional(),
				ContentSuminsured: z.string().optional(),
				allRiskSumInsured: z.string().optional(),
				PersonalLiabilitySi: z.string().optional(),
				DomesticServantType: z.string().optional(),
				Count: z.string().optional(),
				DomesticServentSi: z.string().optional(),
				RelationType: z.string().optional(),
				PersonalAccidentSi: z.string().optional()
			})
		),
		CommonError: z.boolean()
	})
)

export type locationListHome = z.infer<typeof locationListSchema>

export const saveNonMotorRequestSchema = z.object({
	PolicyDetails: z.object({
		SaveOrSubmit: z.string(),
		AcexecutiveId: z.string(),
		ProductType: z.null(),
		TiraCoverNoteNo: z.null(),
		CustomerReferenceNo: z.string(),
		RequestReferenceNo: z.null(),
		BuildingOwnerYn: z.string(),
		Createdby: z.string(),
		Currency: z.string(),
		ExchangeRate: z.string(),
		Havepromocode: z.string(),
		PolicyEndDate: z.string(),
		PolicyStartDate: z.string(),
		IndustryId: z.string(),
		InsuranceId: z.string(),
		ProductId: z.string(),
		BranchCode: z.string()
	}),
	BrokerDetails: z.object({
		CustomerCode: z.string(),
		CustomerName: z.string(),
		BdmCode: z.string(),
		BrokerCode: z.null(),
		LoginId: z.string(),
		ApplicationId: z.string(),
		AgencyCode: z.string(),
		BrokerBranchCode: z.string(),
		SourceTypeId: z.null(),
		UserType: z.string()
	}),
	EndorsementDetails: z.object({
		EndorsementDate: z.null(),
		EndorsementEffectiveDate: z.null(),
		EndorsementRemarks: z.null(),
		EndorsementType: z.null(),
		EndorsementTypeDesc: z.null(),
		EndtCategoryDesc: z.null(),
		EndtCount: z.null(),
		EndtPrevPolicyNo: z.null(),
		EndtPrevQuoteNo: z.null(),
		EndtStatus: z.null(),
		IsFinanceEndt: z.null(),
		OrginalPolicyNo: z.null(),
		PolicyNo: z.null()
	}),
	LocationList: locationListSchema
})

export type SaveNonMotorDetailRequest = z.infer<typeof saveNonMotorRequestSchema>

export const saveNonMotorDetailsSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z
		.array(
			z.object({
				RequestReferenceNo: z.string(),
				CustomerReferenceNo: z.string(),
				RiskId: z.string(),
				LocationId: z.string(),
				Response: z.string(),
				ProductId: z.string(),
				MSRefNo: z.string(),
				CdRefNo: z.string(),
				VdRefNo: z.string(),
				SectionId: z.string(),
				InsuranceId: z.string(),
				CreatedBy: z.string()
			})
		)
		.nullable(),
	ErroCode: z.number()
})

export type saveNonMotorDetailsList = z.infer<typeof saveNonMotorDetailsSchema>

// export const saveCustomerRequestSchema = z.object({
// 	BrokerBranchCode: z.string(),
// 	InsuranceId: z.string(),
// 	BranchCode: z.string(),
// 	ProductId: z.string(),
// 	AppointmentDate: z.string(),
// 	BusinessType: z.null(),
// 	CityCode: z.string(),
// 	CityName: z.string(),
// 	ClientName: z.string(),
// 	Clientstatus: z.string(),
// 	CreatedBy: z.string(),
// 	DobOrRegDate: z.string(),
// 	District: z.string(),
// 	Email1: z.string(),
// 	Email2: z.null(),
// 	Email3: z.null(),
// 	Fax: z.null(),
// 	Gender: z.string(),
// 	IdNumber: z.string(),
// 	IdType: z.string(),
// 	IsTaxExempted: z.string(),
// 	Language: z.string(),
// 	MobileNo1: z.string(),
// 	MobileNo2: z.string(),
// 	MobileNo3: z.null(),
// 	Nationality: z.string(),
// 	Occupation: z.string(),
// 	OtherOccupation: z.string(),
// 	Placeofbirth: z.string(),
// 	PolicyHolderType: z.string(),
// 	PolicyHolderTypeid: z.string(),
// 	PreferredNotification: z.string(),
// 	RegionCode: z.string(),
// 	MobileCode1: z.string(),
// 	WhatsappCode: z.string(),
// 	MobileCodeDesc1: z.string(),
// 	WhatsappDesc: z.string(),
// 	WhatsappNo: z.string(),
// 	StateCode: z.string(),
// 	StateName: z.null(),
// 	Status: z.string(),
// 	Type: z.string(),
// 	TaxExemptedId: z.null(),
// 	TelephoneNo1: z.string(),
// 	PinCode: z.string(),
// 	TelephoneNo2: z.null(),
// 	TelephoneNo3: z.null(),
// 	VrTinNo: z.null(),
// 	Title: z.string(),
// 	Address1: z.string(),
// 	SaveOrSubmit: z.string(),
// 	Zone: z.string()
// })

// export type saveCustomerRequest = z.infer<typeof saveCustomerRequestSchema>

export const getItemValueReqSchema = z.object({
	InsuranceId: z.string(),
	ItemType: z.string()
})

export type getItemValueRequest = z.infer<typeof getItemValueReqSchema>

export const getItemValueResSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.unknown()),
	Result: z.array(
		z.object({
			TitleType: z.string().nullable(),
			Code: z.string(),
			CodeDesc: z.string(),
			Status: z.string(),
			BodyType: z.string().nullable(),
			RiskId: z.string().nullable(),
			CodeDescLocal: z.string()
		})
	),
	ErroCode: z.number()
})

export type getItemValueRes = z.infer<typeof getItemValueResSchema>
