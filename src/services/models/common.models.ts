import { z } from 'zod'

export const currencyCodeSchema = z.object({
	Code: z.string(),
	CodeDesc: z.string(),
	ExchangeRate: z.string(),
	MinRate: z.string(),
	MaxRate: z.string(),
	Status: z.string()
})

export const CurrencyListAPISchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.string()),
	Result: z.array(currencyCodeSchema),
	ErroCode: z.number()
})

export type CurrencyList = z.infer<typeof CurrencyListAPISchema>

// .......................Body Type Response.................................
export const BodyTypeSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z.array(
		z.object({
			TitleType: z.string().nullable(),
			Code: z.string(),
			CodeDesc: z.string(),
			Status: z.string(),
			BodyType: z.string(),
			RiskId: z.null()
		})
	),
	ErroCode: z.number()
})

export type BodyTypeList = z.infer<typeof BodyTypeSchema>

// .......................Guest Login Response.....................................
export const GuestLoginSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ChangePasswordYn: z.null(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z.object({
		Token: z.string(),
		LoginId: z.string(),
		OaCode: z.string(),
		UserName: z.string(),
		UserMail: z.string(),
		UserMobile: z.string(),
		UserType: z.string(),
		SubUserType: z.string(),
		BankCode: z.string(),
		CountryId: z.string(),
		CurrencyId: z.string(),
		CustomerCode: z.string(),
		CustomerName: z.string(),
		AttachedCompanies: z.null(),
		LoginBranchDetails: z.array(
			z.object({
				BranchCode: z.string(),
				BrokerBranchCode: z.string(),
				BrokerBranchName: z.string(),
				BranchName: z.string(),
				RegionCode: z.string().nullable(),
				RegionName: z.null(),
				InsuranceId: z.string(),
				CompanyName: z.string(),
				CompanyLogo: z.null(),
				AttachedBranchCode: z.null(),
				AttachedBranchName: z.null(),
				AttachedRegionCode: z.null(),
				AttachedRegionName: z.null(),
				AttachedCompanyId: z.null(),
				AttachedCompanyName: z.null(),
				AttachedCompanyLogo: z.null(),
				CurrencyId: z.string(),
				SourceType: z.null(),
				DepartmentCode: z.null()
			})
		),
		BrokerCompanyProducts: z.array(
			z.object({
				ProductId: z.string(),
				OldProductName: z.string(),
				ProductName: z.string(),
				ProductIconId: z.string(),
				ProductIconName: z.null(),
				PackageYn: z.string(),
				DisplayOrder: z.number()
			})
		)
	}),
	ErroCode: z.number(),
	AdditionalInfo: z.object({
		TinyUrlId: z.string(),
		RouterLink: z.string(),
		InsuranceId: z.string(),
		SubUserType: z.string(),
		LoginId: z.string(),
		ProductId: z.string(),
		PageType: z.string(),
		UserType: z.string(),
		BranchCode: z.string(),
		TinyGroupId: z.string()
	})
})

export type GuestLogin = z.infer<typeof GuestLoginSchema>

// ....................................................Motor Make List Response................................
export const ResultSchema = z.object({
	TitleType: z.nullable(z.string()),
	Code: z.string(),
	CodeDesc: z.string(),
	Status: z.string(),
	BodyType: z.nullable(z.string()),
	RiskId: z.nullable(z.string())
})

export const MotorMakeSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.string()),
	Result: z.array(ResultSchema),
	ErroCode: z.number()
})

export type MotorList = z.infer<typeof MotorMakeSchema>

// .................................................Motor Model List Response........................................

export const ResultItemSchema = z.object({
	TitleType: z.string().nullable(),
	Code: z.string(),
	CodeDesc: z.string(),
	Status: z.string(),
	BodyType: z.string().nullable(),
	RiskId: z.string().nullable()
})

export const MotorModelListSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z.array(ResultItemSchema),
	ErroCode: z.number()
})

export type MotorModelList = z.infer<typeof MotorModelListSchema>

// ..............................................Vehicle Usage Models...................................................

export const vehicleUsageSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z.array(
		z.object({
			TitleType: z.null(),
			Code: z.string(),
			CodeDesc: z.string(),
			Status: z.string(),
			BodyType: z.string(),
			RiskId: z.null()
		})
	),
	ErroCode: z.number()
})

export type vehicleUsageList = z.infer<typeof vehicleUsageSchema>

// --------------------------------------------Policy End Date -----------------------------------------------------

export const policyEndDatesSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z.array(
		z.object({
			TitleType: z.string().nullable(),
			Code: z.string(),
			CodeDesc: z.string(),
			Status: z.string().nullable(),
			BodyType: z.string().nullable(),
			RiskId: z.string().nullable()
		})
	),
	ErroCode: z.number()
})

export type policyEndDateList = z.infer<typeof policyEndDatesSchema>

// ---------------------------------ShortQuoteResponse------------------------

export const saveMotorDetailsSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z
		.array(
			z.object({
				CoverList: z.string().nullable(),
				RequestReferenceNo: z.string(),
				CustomerReferenceNo: z.string(),
				VehicleId: z.string(),
				MSRefNo: z.string(),
				CdRefNo: z.string(),
				VdRefNo: z.string(),
				DdRefNo: z.string(),
				Response: z.string(),
				CreatedBy: z.string(),
				InsuranceId: z.string(),
				ProductId: z.string(),
				SectionId: z.string()
			})
		)
		.nullable(),
	ErroCode: z.number()
})

export type saveMotorDetailsList = z.infer<typeof saveMotorDetailsSchema>

// .........Request Class......................................................

export const MotorModalRequestSchema = z.object({
	InsuranceId: z.string(),
	BranchCode: z.string(),
	BodyId: z.string().optional(),
	MakeId: z.string()
})

export type MotorModalRequest = z.infer<typeof MotorModalRequestSchema>

// ..............common Modal request...........................................

export const CommonModalRequestSchema = z.object({
	InsuranceId: z.string(),
	BranchCode: z.string(),
	BodyId: z.string().optional()
})

export type CommonModalRequest = z.infer<typeof CommonModalRequestSchema>

// ...............Get Currency Request.........................................

export const CurrencyRequestSchema = z.object({
	InsuranceId: z.string(),
	ProductId: z.string(),
	BranchCode: z.string()
})

export type CurrencyRequest = z.infer<typeof CurrencyRequestSchema>

// ................Vehicle Usage Request.........................................
export const VehicleUsageListRequestSchema = z.object({
	InsuranceId: z.string(),
	BranchCode: z.string()
})
export type vehicleUsageRequest = z.infer<typeof VehicleUsageListRequestSchema>

// ....................Save Motor Details Request...................................

export const SaveMotorDetailRequestSchema = z.object({
	CustomerName: z.string(),
	LoginId: z.string(),
	SubUserType: z.string(),
	UserType: z.string(),
	ApplicationId: z.string(),
	CustomerReferenceNo: z.string().nullable(),
	RequestReferenceNo: z.string().nullable(),
	VehicleId: z.string(),
	CreatedBy: z.string(),
	InsuranceId: z.string(),
	BranchCode: z.string(),
	BrokerBranchCode: z.string(),
	SectionId: z.string(),
	AgencyCode: z.string(),
	ProductId: z.string(),
	SavedFrom: z.string(),
	MobileCode: z.string(),
	MobileNumber: z.string(),
	Chassisnumber: z.string(),
	Insurancetype: z.array(z.string()),
	InsuranceClass: z.string(),
	Motorusage: z.string(),
	MotorusageId: z.string(),
	Vehiclemake: z.string(),
	VehiclemakeId: z.string(),
	VehicleModel: z.string(),
	VehcilemodelId: z.string(),
	VehicleValueType: z.string().nullable(),
	DefenceValue: z.string().nullable(),
	PurchaseDate: z.string().nullable(),
	Deductibles: z.string().nullable(),
	Inflation: z.string().nullable(),
	ManufactureYear: z.string(),
	Gpstrackinginstalled: z.string(),
	NcdYn: z.string(),
	VehicleType: z.string(),
	VehicleTypeId: z.string(),
	CarAlarmYn: z.string(),
	PolicyStartDate: z.string(),
	PolicyEndDate: z.string(),
	CustomerCode: z.string(),
	BdmCode: z.string(),
	SourceTypeId: z.string(),
	SumInsured: z.number(),
	AcccessoriesSumInsured: z.string().nullable(),
	ExchangeRate: z.string(),
	Currency: z.string(),
	HavePromoCode: z.string(),
	SearchFromApi: z.boolean(),
	SeatingCapacity: z.number(),
	CustomerStatus: z.string(),
	Status: z.string(),
	CollateralYn: z.string().nullable().optional(),
	BorrowerType: z.string().nullable().optional(),
	CollateralName: z.string().nullable().optional(),
	FirstLossPayee: z.string().nullable().optional()
})

export type SaveMotorDetailRequest = z.infer<typeof SaveMotorDetailRequestSchema>

//-------------------------OTP Gen-----------------------------------------

export const GenerateOTPSchema = z.object({
	CompanyId: z.string(),
	ProductId: z.string(),
	LoginId: z.string(),
	TemplateName: z.null(),
	OtpUser: z.object({
		UserMailId: z.null(),
		UserMobileNo: z.string(),
		UserMobileCode: z.string(),
		UserWhatsappNo: z.string(),
		UserWhatsappCode: z.string(),
		CustomerName: z.null()
	})
})

export type GenerateOTPRequest = z.infer<typeof GenerateOTPSchema>

export const GenerateOTPResponseSchema = z.object({
	isError: z.boolean(),
	OtpToken: z.number(),
	Errors: z.null(),
	OTP: z.string(),
	LoginResponse: z.null()
})

export type GenerateOTPResponse = z.infer<typeof GenerateOTPResponseSchema>

// ******Validate OTP

export const validateOTPRequestSchema = z.object({
	CompanyId: z.string(),
	ProductId: z.string(),
	AgencyCode: z.string().nullable(),
	OtpToken: z.number(),
	UserOTP: z.string(),
	CreateUser: z.boolean(),
	CustomerId: z.string().nullable(),
	ReferenceNo: z.string().nullable()
})

export type ValidateOTPRequest = z.infer<typeof validateOTPRequestSchema>

export const validateOTPResponseSchema = z.object({
	isError: z.boolean(),
	OtpToken: z.number(),
	Errors: z.array(z.any()).nullable(),
	OTP: z.null(),
	LoginResponse: z
		.object({
			Message: z.string(),
			IsError: z.boolean(),
			ChangePasswordYn: z.null(),
			ErrorMessage: z.array(z.any()).nullable(),
			Result: z.object({
				Token: z.string(),
				LoginId: z.string(),
				OaCode: z.string(),
				UserName: z.string(),
				UserMail: z.string(),
				UserMobile: z.string(),
				UserType: z.string(),
				SubUserType: z.string(),
				BankCode: z.string(),
				CountryId: z.null(),
				CurrencyId: z.string(),
				CustomerCode: z.null(),
				CustomerName: z.string(),
				AttachedCompanies: z.null(),
				LoginBranchDetails: z.array(
					z.object({
						BranchCode: z.string(),
						BrokerBranchCode: z.string().nullable(),
						BrokerBranchName: z.string().nullable(),
						BranchName: z.string(),
						RegionCode: z.string().nullable(),
						RegionName: z.null(),
						InsuranceId: z.string().nullable(),
						CompanyName: z.string().nullable(),
						CompanyLogo: z.null(),
						AttachedBranchCode: z.null(),
						AttachedBranchName: z.null(),
						AttachedRegionCode: z.null(),
						AttachedRegionName: z.null(),
						AttachedCompanyId: z.null(),
						AttachedCompanyName: z.null(),
						AttachedCompanyLogo: z.null(),
						CurrencyId: z.string().nullable(),
						SourceType: z.string().nullable(),
						DepartmentCode: z.null()
					})
				),
				BrokerCompanyProducts: z.array(
					z.object({
						ProductId: z.string(),
						OldProductName: z.string(),
						ProductName: z.string(),
						ProductIconId: z.string(),
						ProductIconName: z.null(),
						PackageYn: z.string(),
						DisplayOrder: z.number()
					})
				)
			}),
			ErroCode: z.number(),
			AdditionalInfo: z.null()
		})
		.nullable()
})

export type ValidateOTPResponse = z.infer<typeof validateOTPResponseSchema>

export const insuranceTypeSchema = z.object({
	InsuranceId: z.string(),
	ProductId: z.string(),
	BranchCode: z.string(),
	LoginId: z.string()
})

export type InsuranceClassTypeRequest = z.infer<typeof insuranceTypeSchema>

export const insuranceTypeListSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z.array(
		z.object({
			Code: z.string(),
			CodeDesc: z.string(),
			IndustryType: z.string().nullable(),
			Status: z.string()
		})
	),
	ErroCode: z.number()
})

export type InsuranceClassTypeList = z.infer<typeof insuranceTypeListSchema>

export const premiumCalcRequestSchema = z.object({
	InsuranceId: z.string(),
	BranchCode: z.string(),
	AgencyCode: z.string(),
	SectionId: z.string(),
	ProductId: z.string(),
	MSRefNo: z.string(),
	VehicleId: z.string(),
	CdRefNo: z.string(),
	DdRefNo: z.string(),
	VdRefNo: z.string(),
	CreatedBy: z.string(),
	productId: z.string(),
	RequestReferenceNo: z.string(),
	EffectiveDate: z.string(),
	PolicyEndDate: z.string(),
	CoverModification: z.string()
})

export type PremiumCalcRequest = z.infer<typeof premiumCalcRequestSchema>

export const premiumCalcDataSchema = z.object({
	CoverList: z.array(
		z.object({
			CoverId: z.string(),
			CalcType: z.string(),
			CoverName: z.string(),
			CoverDesc: z.string(),
			MinimumPremium: z.number(),
			CoverToolTip: z.string(),
			IsSubCover: z.string().nullable(),
			SumInsured: z.number(),
			SumInsuredLc: z.number(),
			Rate: z.number(),
			SubCoverId: z.string().nullable(),
			SubCoverDesc: z.string().nullable(),
			SubCoverName: z.string().nullable(),
			SectionId: z.string(),
			Discounts: z.string().nullable(),
			Taxes: z.array(
				z.object({
					isTaxExempted: z.string(),
					TaxId: z.string(),
					TaxRate: z.number(),
					TaxAmount: z.number(),
					TaxDesc: z.string(),
					TaxExemptType: z.string().nullable(),
					TaxExemptCode: z.string(),
					TaxCalcType: z.string(),
					RegulatoryCode: z.string(),
					EndtTypeId: z.string().nullable(),
					EndtTypeCount: z.number(),
					DependentYN: z.string(),
					TaxExemptedAllowed: z.string(),
					MinimumTaxAmount: z.number(),
					MinimumTaxAmountLC: z.number(),
					TaxAmountLc: z.number(),
					TaxFor: z.string()
				})
			),
			SubCovers: z.string().nullable(),
			FactorTypeId: z.string(),
			DependentCoverYN: z.string(),
			DependentCoverId: z.string(),
			Exception: z.string().nullable(),
			Loadings: z.string().nullable(),
			CoverageType: z.string(),
			isSelected: z.string(),
			Notsutable: z.boolean(),
			PremiumBeforeDiscountLC: z.number(),
			PremiumAfterDiscountLC: z.number(),
			PremiumExcluedTaxLC: z.number(),
			PremiumIncludedTaxLC: z.number(),
			PremiumBeforeDiscount: z.number(),
			PremiumAfterDiscount: z.number(),
			PremiumExcluedTax: z.number(),
			PremiumIncludedTax: z.number(),
			ExchangeRate: z.number(),
			Currency: z.string(),
			isReferal: z.string(),
			ReferalDescription: z.string(),
			ProRata: z.number(),
			RegulatorSumInsured: z.number(),
			RegulatorRate: z.number().nullable(),
			UserOpt: z.string().nullable(),
			CoverBasedOn: z.string(),
			RegulatoryCode: z.string(),
			InsuranceId: z.string().nullable(),
			BranchCode: z.string().nullable(),
			AgencyCode: z.string().nullable(),
			ProductId: z.string().nullable(),
			MSRefNo: z.string().nullable(),
			VehicleId: z.string().nullable(),
			CdRefNo: z.string().nullable(),
			VdRefNo: z.string().nullable(),
			CreatedBy: z.string().nullable(),
			RequestReferenceNo: z.string().nullable(),
			MultiSelectYn: z.string(),
			SectionName: z.string().nullable(),
			ExcessPercent: z.number(),
			ExcessAmount: z.number(),
			ExcessDesc: z.string(),
			MinimumPremiumYn: z.string(),
			ProRataApplicable: z.string(),
			Endorsements: z.string().nullable(),
			EndtCount: z.number(),
			EffectiveDate: z.string(),
			PolicyEndDate: z.string(),
			Status: z.string(),
			DiffPremiumIncludedTax: z.string().nullable(),
			DiffPremiumIncludedTaxLC: z.string().nullable(),
			CoverageLimit: z.number(),
			MinSumInsured: z.number(),
			PolicyPeriod: z.number().nullable(),
			IsTaxExcempted: z.string(),
			FreeCoverLimit: z.number()
		})
	),
	RequestReferenceNo: z.string(),
	CustomerReferenceNo: z.string().nullable(),
	VehicleId: z.string(),
	MSRefNo: z.string(),
	CdRefNo: z.string(),
	VdRefNo: z.string(),
	Response: z.string(),
	CreatedBy: z.string(),
	InsuranceId: z.string(),
	ProductId: z.string(),
	SectionId: z.string(),
	UWReferral: z.string().nullable(),
	updateas: z.string().nullable(),
	MasterReferral: z.string().nullable()
})

export type PremiumCalcData = z.infer<typeof premiumCalcDataSchema>

export const viewPremiumCalcSchema = z.object({
	ProductId: z.string(),
	RequestReferenceNo: z.string()
})

export type ViewPremiumCalcRequest = z.infer<typeof viewPremiumCalcSchema>

export const ViewPremiumCalDataSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z.array(
		z.object({
			VehicleId: z.string(),
			RequestReferenceNo: z.string(),
			CustomerReferenceNo: z.string(),
			MSRefNo: z.string(),
			CdRefNo: z.string(),
			VdRefNo: z.string(),
			CreatedBy: z.string(),
			InsuranceId: z.string(),
			ProductId: z.string(),
			SectionId: z.string(),
			LocationName: z.string().nullable(),
			BranchCode: z.string(),
			HavePromoCode: z.string(),
			PromoCode: z.string().nullable(),
			Currency: z.string(),
			ExchangeRate: z.string(),
			ActualPremiumLc: z.string(),
			AcctualPremiumFc: z.string(),
			OverallPremiumLc: z.string(),
			OverallPremiumFc: z.string(),
			PolicyStartDate: z.string(),
			PolicyEndDate: z.string(),
			CoverList: z.array(
				z.object({
					CoverId: z.string(),
					CalcType: z.string(),
					CoverName: z.string(),
					CoverDesc: z.string(),
					MinimumPremium: z.number(),
					CoverToolTip: z.string().nullable(),
					IsSubCover: z.string(),
					SumInsured: z.number(),
					SumInsuredLc: z.number(),
					Rate: z.number(),
					SubCoverId: z.string().nullable(),
					SubCoverDesc: z.string().nullable(),
					SubCoverName: z.string().nullable(),
					SectionId: z.string(),
					Discounts: z.string().nullable(),
					Taxes: z.array(
						z.object({
							isTaxExempted: z.string(),
							TaxId: z.string(),
							TaxRate: z.number(),
							TaxAmount: z.number(),
							TaxDesc: z.string(),
							TaxExemptType: z.string().nullable(),
							TaxExemptCode: z.string(),
							TaxCalcType: z.string(),
							RegulatoryCode: z.string().nullable(),
							EndtTypeId: z.string().nullable(),
							EndtTypeCount: z.string().nullable(),
							DependentYN: z.string(),
							TaxExemptedAllowed: z.string().nullable(),
							MinimumTaxAmount: z.number(),
							MinimumTaxAmountLC: z.number(),
							TaxAmountLc: z.number(),
							TaxFor: z.null()
						})
					),
					SubCovers: z.string().nullable(),
					FactorTypeId: z.string(),
					DependentCoverYN: z.string(),
					DependentCoverId: z.string(),
					Exception: z.string().nullable(),
					Loadings: z.string().nullable(),
					CoverageType: z.string(),
					isSelected: z.string(),
					Notsutable: z.boolean(),
					PremiumBeforeDiscountLC: z.number(),
					PremiumAfterDiscountLC: z.number(),
					PremiumExcluedTaxLC: z.number(),
					PremiumIncludedTaxLC: z.number(),
					PremiumBeforeDiscount: z.number(),
					PremiumAfterDiscount: z.number(),
					PremiumExcluedTax: z.number(),
					PremiumIncludedTax: z.number(),
					ExchangeRate: z.number(),
					Currency: z.string(),
					isReferal: z.string(),
					ReferalDescription: z.string(),
					ProRata: z.number(),
					RegulatorSumInsured: z.number(),
					RegulatorRate: z.number(),
					UserOpt: z.string(),
					CoverBasedOn: z.string(),
					RegulatoryCode: z.string(),
					InsuranceId: z.string(),
					BranchCode: z.string().nullable(),
					AgencyCode: z.string().nullable(),
					ProductId: z.string(),
					MSRefNo: z.string(),
					VehicleId: z.string(),
					CdRefNo: z.string(),
					VdRefNo: z.string(),
					CreatedBy: z.string(),
					RequestReferenceNo: z.string(),
					MultiSelectYn: z.string(),
					SectionName: z.string(),
					ExcessPercent: z.number(),
					ExcessAmount: z.number(),
					ExcessDesc: z.string(),
					MinimumPremiumYn: z.string(),
					ProRataApplicable: z.string(),
					Endorsements: z.string().nullable(),
					EndtCount: z.number(),
					EffectiveDate: z.string(),
					PolicyEndDate: z.string(),
					Status: z.string(),
					DiffPremiumIncludedTax: z.number(),
					DiffPremiumIncludedTaxLC: z.string().nullable(),
					CoverageLimit: z.number(),
					MinSumInsured: z.string().nullable(),
					PolicyPeriod: z.string().nullable(),
					IsTaxExcempted: z.string().nullable(),
					FreeCoverLimit: z.number()
				})
			),
			UWReferral: z.array(z.any()).nullable(),
			MasterReferral: z.array(z.any()).nullable(),
			Status: z.string(),
			AdminRemarks: z.string().nullable(),
			RejectReason: z.string().nullable(),
			GroupId: z.number(),
			GroupMember: z.number(),
			ManufactureYear: z.string(),
			RiskDetails: z.object({
				RiskId: z.string(),
				Accident: z.string(),
				Gpstrackinginstalled: z.string(),
				Windscreencoverrequired: z.string(),
				Insurancetype: z.string(),
				InsuranceTypeDesc: z.string(),
				MotorCategory: z.string().nullable(),
				MotorCategoryDesc: z.string().nullable(),
				Motorusage: z.string(),
				Registrationnumber: z.string(),
				Chassisnumber: z.string(),
				Vehiclemake: z.string(),
				VehiclemakeDesc: z.string(),
				Vehcilemodel: z.string(),
				VehcilemodelDesc: z.string(),
				VehicleType: z.string(),
				VehicleTypeDesc: z.string(),
				ModelNumber: z.string().nullable(),
				EngineNumber: z.string(),
				FuelType: z.string().nullable(),
				FuelTypeDesc: z.string(),
				RegistrationYear: z.string().nullable(),
				SeatingCapacity: z.number(),
				CubicCapacity: z.number(),
				Color: z.string().nullable(),
				ColorDesc: z.string(),
				Grossweight: z.number(),
				Tareweight: z.string().nullable(),
				Actualpremium: z.string().nullable(),
				CoverNoteNo: z.string().nullable(),
				Stickerno: z.string().nullable(),
				WindScreenSumInsured: z.string().nullable(),
				AcccessoriesSumInsured: z.number().nullable(),
				AccessoriesInformation: z.string().nullable(),
				NumberOfAxels: z.string().nullable(),
				AxelDistance: z.string().nullable(),
				SumInsured: z.number(),
				OverRidePercentage: z.string().nullable(),
				TppdFreeLimit: z.string().nullable(),
				TppdIncreaeLimit: z.string().nullable(),
				InsurerSettlement: z.string().nullable(),
				PolicyType: z.string(),
				PolicyTypeDesc: z.string(),
				RadioOrCasseteplayer: z.string().nullable(),
				RoofRack: z.string().nullable(),
				SpotFogLamp: z.string().nullable(),
				TrailerDetails: z.string().nullable(),
				InsuranceClass: z.string(),
				OwnerCategory: z.string(),
				ManufactureAge: z.number(),
				RegistrationAge: z.string().nullable(),
				NcdYears: z.number(),
				NcdYn: z.string(),
				ManufactureYear: z.string(),
				CollateralYn: z.string().nullable(),
				BorrowerType: z.string().nullable(),
				CollateralName: z.string().nullable(),
				FirstLossPayee: z.string().nullable(),
				FleetOwnerYn: z.string(),
				NoOfComprehensives: z.string().nullable(),
				ClaimRatio: z.string(),
				CityLimit: z.string().nullable(),
				DocumentsTitle: z.string().nullable(),
				SavedFrom: z.string(),
				DriverDetails: z.string().nullable(),
				SectionId: z.string(),
				SectionName: z.string(),
				SectionDetails: z.string().nullable(),
				EndorsementYn: z.string(),
				EndtCount: z.string().nullable(),
				EffectiveDate: z.string().nullable(),
				PremiumLc: z.string().nullable(),
				PremiumFc: z.string().nullable(),
				OverAllPremiumFc: z.string().nullable(),
				OverAllPremiumLc: z.string().nullable(),
				CommissionAmount: z.string().nullable(),
				CommissionPercentage: z.string(),
				VatCommission: z.string(),
				BorrowerTypeDesc: z.string(),
				BankCode: z.string().nullable(),
				BankName: z.string().nullable(),
				FinalyseYn: z.string()
			}),
			EmiYn: z.string().nullable(),
			InstallmentPeriod: z.string().nullable(),
			InstallmentMonth: z.string().nullable(),
			DueAmount: z.string().nullable(),
			ReferalRemarks: z.string().nullable(),
			ManualReferalYn: z.string().nullable(),
			SectionName: z.string(),
			EndorsementYn: z.string(),
			EndtCount: z.string().nullable(),
			EffectiveDate: z.string().nullable(),
			EndtTypeMaster: z.string().nullable(),
			AccessoriesSumInsured: z.number(),
			CommissionPercentage: z.string(),
			VatCommission: z.string(),
			PolicyNo: z.string().nullable(),
			OriginalPolicyNo: z.string().nullable(),
			SourceType: z.string(),
			FinalizeYn: z.string(),
			OriginalRiskId: z.null()
		})
	),
	ErroCode: z.number()
})

export type ViewPremiumCalData = z.infer<typeof ViewPremiumCalDataSchema>

export const SaveCustomerDetailsSchema = z.object({
	BrokerBranchCode: z.string(),
	CustomerReferenceNo: z.string().nullable(),
	InsuranceId: z.string(),
	BranchCode: z.string().optional(),
	ProductId: z.string(),
	AppointmentDate: z.string(),
	BusinessType: z.null(),
	CityCode: z.string(),
	CityName: z.string(),
	ClientName: z.string(),
	Clientstatus: z.string(),
	CreatedBy: z.string(),
	DobOrRegDate: z.string(),
	Email1: z.string(),
	Email2: z.null(),
	Email3: z.null(),
	Fax: z.null(),
	Gender: z.string(),
	IdNumber: z.string(),
	IdType: z.string(),
	IsTaxExempted: z.string(),
	Language: z.string(),
	MobileNo1: z.string(),
	MobileNo2: z.string().nullable(),
	MobileNo3: z.null(),
	Nationality: z.string(),
	Occupation: z.string(),
	OtherOccupation: z.string(),
	Placeofbirth: z.string(),
	PolicyHolderType: z.string(),
	PolicyHolderTypeid: z.string(),
	PreferredNotification: z.string(),
	RegionCode: z.string(),
	MobileCode1: z.string(),
	WhatsappCode: z.string(),
	MobileCodeDesc1: z.string(),
	WhatsappDesc: z.string(),
	WhatsappNo: z.string(),
	StateCode: z.string(),
	StateName: z.null(),
	Status: z.string(),
	Type: z.string().nullable(),
	TaxExemptedId: z.null(),
	TelephoneNo1: z.string(),
	PinCode: z.string().nullable(),
	TelephoneNo2: z.null(),
	TelephoneNo3: z.null(),
	VrTinNo: z.null(),
	Title: z.string(),
	Address1: z.string(),
	SaveOrSubmit: z.string(),
	Zone: z.string()
})

export type SaveCustomerDetailRequest = z.infer<typeof SaveCustomerDetailsSchema>

export const SaveCustomerDetailsResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z.object({ Response: z.string(), SuccessId: z.string() }).nullable(),
	ErroCode: z.number()
})
export type SaveCustomerDetail = z.infer<typeof SaveCustomerDetailsResponseSchema>

export const SaveVehicleRequestSchema = z.object({
	Insuranceid: z.string(),
	BranchCode: z.string(),
	Chassisnumber: z.string(),
	Color: z.string(),
	CreatedBy: z.string(),
	EngineNumber: z.string(),
	Grossweight: z.null(),
	ManufactureYear: z.string(),
	Motorusage: z.string().nullable(),
	NumberOfAxels: z.null(),
	OwnerCategory: z.string(),
	Registrationnumber: z.string(),
	ResEngineCapacity: z.string(),
	ResOwnerName: z.string(),
	ResStatusCode: z.string(),
	ResStatusDesc: z.string(),
	SeatingCapacity: z.string(),
	Tareweight: z.null(),
	Vehcilemodel: z.string(),
	VehicleType: z.string(),
	Vehiclemake: z.string()
})

export type SaveVehicleRequest = z.infer<typeof SaveVehicleRequestSchema>

export const SaveVehicleResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z
		.object({
			Response: z.string(),
			RequestReferenceNo: z.string().nullable(),
			Error: z.string().nullable(),
			ShowVehicleInfo: z.object({
				ReqRegNumber: z.string(),
				ReqChassisNumber: z.string(),
				ReqRequestId: z.string().nullable(),
				ReqCompanyCode: z.string().nullable(),
				ReqSystemCode: z.string().nullable(),
				ReqMotorCategory: z.string().nullable(),
				ReqMsgSignature: z.string().nullable(),
				EntryDate: z.string(),
				Status: z.string(),
				CreatedBy: z.string(),
				ResResponseId: z.string().nullable(),
				ResRequestId: z.string().nullable(),
				ResStatusCode: z.string(),
				ResStatusDesc: z.string(),
				MotorCategory: z.string().nullable(),
				Registrationnumber: z.string(),
				Chassisnumber: z.string(),
				Vehiclemake: z.string(),
				Vehcilemodel: z.string(),
				VehicleType: z.string(),
				Color: z.string(),
				EngineNumber: z.string(),
				ResEngineCapacity: z.string(),
				FuelType: z.string().nullable(),
				NumberOfAxels: z.string().nullable(),
				AxelDistance: z.string().nullable(),
				SeatingCapacity: z.string(),
				ManufactureYear: z.string(),
				Tareweight: z.string().nullable(),
				Grossweight: z.string().nullable(),
				Motorusage: z.string().nullable(),
				ResOwnerName: z.string(),
				OwnerCategory: z.string(),
				ResMsgSignature: z.string().nullable(),
				SavedFrom: z.string(),
				PolicyYn: z.string(),
				PolicyHolderInfo: z.string().nullable(),
				PolicyStartDate: z.string().nullable(),
				PolicyEndDate: z.string().nullable(),
				CURRENCY_CODE: z.string().nullable(),
				PRODUCT_CODE: z.string().nullable(),
				RISK_CODE: z.string().nullable(),
				SUM_INSURED: z.string().nullable(),
				ErrorMessage: z.string().nullable(),
				PolicyType: z.string().nullable(),
				MotorCategoryDesc: z.string(),
				Gvm: z.string().nullable(),
				currentLicenseExpiryDate: z.string().nullable(),
				roadWorthinessExpiryDate: z.string().nullable(),
				firstRegDate: z.string().nullable()
			})
		})
		.nullable(),
	ErroCode: z.number()
})

export type SaveVehicleResponse = z.infer<typeof SaveVehicleResponseSchema>

export const OccupationListRequestSchema = z.object({
	InsuranceId: z.string(),
	BranchCode: z.string(),
	ProductId: z.string(),
	TitleType: z.string()
})

export type OccupationListRequest = z.infer<typeof OccupationListRequestSchema>

export const OccupationListResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z.array(
		z.object({
			Code: z.string(),
			CodeDesc: z.string(),
			Status: z.string(),
			CategoryId: z.string(),
			CategoryDesc: z.string(),
			TitleType: z.string()
		})
	),
	ErroCode: z.number()
})

export type OccupationListResponse = z.infer<typeof OccupationListResponseSchema>

export const RegionListRequestSchema = z.object({ CountryId: z.string() })
export type RegionListRequest = z.infer<typeof RegionListRequestSchema>

export const RegionListResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z.array(
		z.object({
			TitleType: z.string().nullable(),
			Code: z.string(),
			CodeDesc: z.string(),
			Status: z.string(),
			BodyType: z.null(),
			RiskId: z.null()
		})
	),
	ErroCode: z.number()
})
export type RegionListResponse = z.infer<typeof RegionListResponseSchema>

export const ColorListRequestSchema = z.object({
	InsuranceId: z.string(),
	BranchCode: z.string()
})
export type ColorListRequest = z.infer<typeof ColorListRequestSchema>

export const ColorListResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z.array(
		z.object({
			TitleType: z.null(),
			Code: z.string(),
			CodeDesc: z.string(),
			Status: z.string(),
			BodyType: z.null(),
			RiskId: z.null()
		})
	),
	ErroCode: z.number()
})
export type ColorListResponse = z.infer<typeof ColorListResponseSchema>

export const DocumentTypeRequestSchema = z.object({
	InsuranceId: z.string(),
	ProductId: z.string(),
	SectionId: z.string()
})

export type DocumentTypeRequest = z.infer<typeof DocumentTypeRequestSchema>

export const DocumentTypeResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z.array(
		z.object({ Code: z.string(), CodeDesc: z.string(), MandatoryStatus: z.string() })
	),
	ErroCode: z.number()
})

export type DocumentTypeResponse = z.infer<typeof DocumentTypeResponseSchema>

export const buyPolicySchema = z.object({
	RequestReferenceNo: z.string(),
	CreatedBy: z.string(),
	ProductId: z.string(),
	ManualReferralYn: z.string(),
	ReferralRemarks: z.string().nullable(),
	Vehicles: z.array(
		z.object({
			Covers: z.array(
				z.object({
					CoverId: z.string(),
					SubCoverId: z.string().nullable(),
					SubCoverYn: z.string()
				})
			),
			Id: z.string(),
			SectionId: z.string()
		})
	)
})

export type BuyPolicyRequest = z.infer<typeof buyPolicySchema>

export const buyPolicyResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z
		.object({
			Response: z.string(),
			RequestReferenceNo: z.string(),
			QuoteNo: z.string(),
			CustomerId: z.string()
		})
		.nullable(),
	ErroCode: z.number()
})

export type BuyPolicy = z.infer<typeof buyPolicyResponseSchema>

export const viewQuote = z.object({
	QuoteNo: z.string()
})

export type ViewQuoteRequest = z.infer<typeof viewQuote>

export const viewQuoteResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.any()).nullable(),
	Result: z.object({
		QuoteDetails: z.object({
			QuoteNo: z.string(),
			RequestReferenceNo: z.string(),
			CustomerId: z.string(),
			CustomerReferenceNo: z.any().nullable(),
			CompanyId: z.string(),
			BranchCode: z.string(),
			ProductId: z.string(),
			SectionId: z.string(),
			AmendId: z.string(),
			LoginId: z.string(),
			ApplicationId: z.string(),
			ApplicationNo: z.string(),
			AgencyCode: z.string(),
			AcExecutiveId: z.any().nullable(),
			BrokerCode: z.string(),
			EffectiveDate: z.string(),
			ExpiryDate: z.string(),
			Status: z.string(),
			QuoteCreatedDate: z.string(),
			EntryDate: z.string(),
			InceptionDate: z.string(),
			LapsedDate: z.any().nullable(),
			LapsedRemarks: z.any().nullable(),
			LapsedUpdatedBy: z.any().nullable(),
			Currency: z.string(),
			Remarks: z.any().nullable(),
			AdminRemarks: z.any().nullable(),
			ReferalRemarks: z.any().nullable(),
			VehicleNo: z.string(),
			ExchangeRate: z.string(),
			NoOfVehicles: z.string(),
			PremiumFc: z.string(),
			OverallPremiumFc: z.string(),
			VatPremiumFc: z.string(),
			VatPercent: z.string(),
			PremiumLc: z.string(),
			OverallPremiumLc: z.string(),
			VatPremiumLc: z.string(),
			FinalizeYn: z.string(),
			Tax1: z.string(),
			Tax2: z.string(),
			Tax3: z.string(),
			EmiYn: z.string(),
			InstallmentPeriod: z.string(),
			InstallmentMonth: z.string(),
			DueAmount: z.any().nullable(),
			TinyUrl: z.any().nullable(),
			ManualReferalYn: z.string(),
			SubUserType: z.string(),
			ProductName: z.string(),
			CompanyName: z.string(),
			HavePromoCode: z.string(),
			PromoCode: z.any().nullable(),
			BrokerBranchCode: z.string(),
			AdminLoginId: z.any().nullable(),
			UserType: z.string(),
			BdmCode: z.any().nullable(),
			SourceType: z.string(),
			CustomerCode: z.string(),
			BrokerBranchName: z.string(),
			BranchName: z.string(),
			PrevPaymentType: z.any().nullable(),
			PrevPaymentTypeDesc: z.any().nullable(),
			EndtStatus: z.string(),
			EndtTypeId: z.any().nullable(),
			policyNo: z.string(),
			Endtcategdesc: z.any().nullable(),
			Endorsementremarks: z.any().nullable(),
			Endorsementeffdate: z.any().nullable(),
			Endtprevpolicyno: z.any().nullable(),
			Endtprevquoteno: z.any().nullable(),
			Endtcount: z.number(),
			EndtTypeDesc: z.string(),
			IsChargeOrRefund: z.string(),
			OriginalPolicyNo: z.string(),
			EndtPremium: z.number(),
			EndtPremiumTax: z.number(),
			TotalEndtPremium: z.number(),
			CommissionPercentage: z.string(),
			VatCommission: z.string(),
			MerchantReference: z.any().nullable(),
			DebitNoteNo: z.any().nullable(),
			CreditNo: z.any().nullable(),
			StickerNumber: z.null()
		}),
		CustomerDetails: z.object({
			CustomerId: z.string(),
			CustomerReferenceNo: z.string(),
			PolicyHolderTypeid: z.string(),
			AppointmentDate: z.any().nullable(),
			PreferredNotification: z.string(),
			IdType: z.string(),
			IdNumber: z.string(),
			Age: z.string(),
			Gender: z.string(),
			Occupation: z.string(),
			BusinessType: z.any().nullable(),
			RegionCode: z.string(),
			IsTaxExempted: z.string(),
			ClientName: z.string(),
			Address1: z.string(),
			Address2: z.any().nullable(),
			Title: z.string(),
			TitleDesc: z.string(),
			Clientstatus: z.string(),
			ClientStatusDesc: z.string(),
			PolicyHolderType: z.string(),
			IdTypeDesc: z.string(),
			DobOrRegDate: z.string(),
			Nationality: z.string(),
			Placeofbirth: z.string(),
			GenderDesc: z.string(),
			OccupationDesc: z.string(),
			BusinessTypeDesc: z.any().nullable(),
			Vrngst: z.any().nullable(),
			StateCode: z.string(),
			StateName: z.any().nullable(),
			CityCode: z.string().nullable(),
			CityName: z.string(),
			Street: z.any().nullable(),
			Fax: z.any().nullable(),
			TelephoneNo1: z.string(),
			TelephoneNo2: z.any().nullable(),
			TelephoneNo3: z.any().nullable(),
			MobileNo1: z.string(),
			MobileNo2: z.string(),
			MobileNo3: z.any().nullable(),
			Email1: z.string(),
			Email2: z.any().nullable(),
			Email3: z.any().nullable(),
			Language: z.string(),
			LanguageDesc: z.string(),
			TaxExemptedId: z.any().nullable(),
			CreatedBy: z.string(),
			Status: z.string(),
			UpdatedDate: z.string(),
			UpdatedBy: z.string(),
			EntryDate: z.string(),
			InsuranceId: z.string(),
			BranchCode: z.string(),
			BrokerBranchCode: z.string(),
			ProductId: z.any().nullable(),
			VrTinNo: z.any().nullable(),
			PinCode: z.string()
		}),
		RiskDetails: z.array(
			z.object({
				RiskId: z.string(),
				Accident: z.string(),
				Gpstrackinginstalled: z.string(),
				Windscreencoverrequired: z.string(),
				Insurancetype: z.string(),
				InsuranceTypeDesc: z.string(),
				MotorCategory: z.any().nullable(),
				MotorCategoryDesc: z.any().nullable(),
				Motorusage: z.string(),
				Registrationnumber: z.string(),
				Chassisnumber: z.string(),
				Vehiclemake: z.string(),
				VehiclemakeDesc: z.string(),
				Vehcilemodel: z.string(),
				VehcilemodelDesc: z.string(),
				VehicleType: z.string(),
				VehicleTypeDesc: z.string(),
				ModelNumber: z.any().nullable(),
				EngineNumber: z.string(),
				FuelType: z.any().nullable(),
				FuelTypeDesc: z.string(),
				RegistrationYear: z.any().nullable(),
				SeatingCapacity: z.number(),
				CubicCapacity: z.number(),
				Color: z.any().nullable(),
				ColorDesc: z.string(),
				Grossweight: z.number(),
				Tareweight: z.any().nullable(),
				Actualpremium: z.any().nullable(),
				CoverNoteNo: z.any().nullable(),
				Stickerno: z.any().nullable(),
				WindScreenSumInsured: z.any().nullable(),
				AcccessoriesSumInsured: z.number().nullable(),
				AccessoriesInformation: z.any().nullable(),
				NumberOfAxels: z.any().nullable(),
				AxelDistance: z.any().nullable(),
				SumInsured: z.number(),
				OverRidePercentage: z.any().nullable(),
				TppdFreeLimit: z.any().nullable(),
				TppdIncreaeLimit: z.any().nullable(),
				InsurerSettlement: z.any().nullable(),
				PolicyType: z.string(),
				PolicyTypeDesc: z.string(),
				RadioOrCasseteplayer: z.any().nullable(),
				RoofRack: z.any().nullable(),
				SpotFogLamp: z.any().nullable(),
				TrailerDetails: z.any().nullable(),
				InsuranceClass: z.string(),
				OwnerCategory: z.string(),
				ManufactureAge: z.number(),
				RegistrationAge: z.any().nullable(),
				NcdYears: z.number(),
				NcdYn: z.string(),
				ManufactureYear: z.string(),
				CollateralYn: z.any().nullable(),
				BorrowerType: z.any().nullable(),
				CollateralName: z.any().nullable(),
				FirstLossPayee: z.any().nullable(),
				FleetOwnerYn: z.string(),
				NoOfComprehensives: z.any().nullable(),
				ClaimRatio: z.string(),
				CityLimit: z.any().nullable(),
				DocumentsTitle: z.string(),
				SavedFrom: z.string(),
				DriverDetails: z.array(
					z.object({
						DriverId: z.string(),
						DriverName: z.string(),
						DriverDob: z.string(),
						DriverType: z.string(),
						LicenseNo: z.string(),
						EntryDate: z.string(),
						CreatedBy: z.string()
					})
				),
				SectionId: z.string(),
				SectionName: z.string(),
				SectionDetails: z.array(
					z.object({
						SectionId: z.string(),
						SectionName: z.string(),
						PremiumAfterDiscount: z.string(),
						PremiumAfterDiscountLc: z.string(),
						PremiumBeforeDiscount: z.string(),
						PremiumBeforeDiscountLc: z.string(),
						PremiumExcluedTax: z.string(),
						PremiumExcluedTaxLc: z.string(),
						PremiumIncludedTax: z.string(),
						PremiumIncludedTaxLc: z.string(),
						Covers: z.array(
							z.object({
								CoverId: z.string(),
								Rate: z.number(),
								CoverName: z.string(),
								CoverDesc: z.string(),
								IsSubCover: z.string(),
								SumInsured: z.number(),
								SumInsuredLc: z.number(),
								SubCovers: z.any().nullable(),
								DependentCoverYN: z.string(),
								DependentCoverId: z.string(),
								CoverageType: z.string(),
								isSelected: z.string(),
								PremiumBeforeDiscountLC: z.number(),
								PremiumAfterDiscountLC: z.number(),
								PremiumExcluedTaxLC: z.number(),
								PremiumIncludedTaxLC: z.number(),
								PremiumBeforeDiscount: z.number(),
								PremiumAfterDiscount: z.number(),
								PremiumExcluedTax: z.number(),
								PremiumIncludedTax: z.number(),
								RegulatoryCode: z.string(),
								ExcessAmount: z.string(),
								ExcessPercent: z.string(),
								ExcessDesc: z.string(),
								MultiSelectYn: z.string(),
								SectionName: z.any().nullable(),
								MinimumPremiumYn: z.string()
							})
						)
					})
				),
				EndorsementYn: z.string(),
				EndtCount: z.any().nullable(),
				EffectiveDate: z.any().nullable(),
				PremiumLc: z.number(),
				PremiumFc: z.number(),
				OverAllPremiumFc: z.number(),
				OverAllPremiumLc: z.number(),
				CommissionAmount: z.string(),
				CommissionPercentage: z.string(),
				VatCommission: z.string(),
				BorrowerTypeDesc: z.string(),
				BankCode: z.any().nullable(),
				BankName: z.any().nullable(),
				FinalyseYn: z.string()
			})
		),
		DocumentDetails: z.array(
			z.object({
				DocumentTitle: z.string(),
				RiskId: z.string(),
				SectionId: z.string()
			})
		),
		TotalAccessoriesSumInsured: z.number()
	}),
	ErroCode: z.number()
})

export type ViewQuoteRes = z.infer<typeof viewQuoteResponseSchema>

export const uploadDocResSchema = z.object({
	Message: z.string().nullable(),
	IsError: z.boolean(),
	ErrorMessage: z.any().nullable(),
	Result: z.string(),
	ErroCode: z.number()
})
export type UploadDocs = z.infer<typeof uploadDocResSchema>

export const getBankReqSchema = z.object({ InsuranceId: z.string(), BranchCode: z.string() })

export type GetBankRequest = z.infer<typeof getBankReqSchema>

export const getBankResSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.any().nullable(),
	Result: z.array(
		z.object({
			TitleType: z.string().nullable(),
			Code: z.string(),
			CodeDesc: z.string(),
			Status: z.string(),
			BodyType: z.string().nullable(),
			RiskId: z.string().nullable()
		})
	),
	ErroCode: z.number()
})

export type getBankRes = z.infer<typeof getBankResSchema>

export const paymentTypesRequestSchema = z.object({
	BranchCode: z.string(),
	InsuranceId: z.string(),
	UserType: z.string(),
	SubUserType: z.string(),
	ProductId: z.string(),
	CreatedBy: z.string(),
	AgencyCode: z.string()
})

export type PaymentTypeRequest = z.infer<typeof paymentTypesRequestSchema>

export const paymentTypesResSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.any().nullable(),
	Result: z.array(
		z.object({
			Code: z.string(),
			CodeDesc: z.string(),
			Type: z.string().nullable()
		})
	),
	ErroCode: z.number()
})

export type PaymentTypeRes = z.infer<typeof paymentTypesResSchema>

export const whiteBookResponseSchema = z.object({
	'VIN/Chassis Number': z.string(),
	'Registration Mark': z.string(),
	'Engine Number': z.string(),
	Make: z.string(),
	Model: z.string(),
	'Model Number': z.string(),
	Colour: z.string(),
	'Vehicle Category': z.string(),
	'Propelled By': z.string(),
	'Net Weight': z.string(),
	'GVM kg': z.string(),
	Class: z.string(),
	'Engine Capacity': z.string(),
	'Seating Capacity': z.string().nullable(),
	'Registration Authority': z.string(),
	'Year Of Make': z.string(),
	'First Registration Date': z.string(),
	'Customs Clearance Number': z.string(),
	'Interpol Number': z.string()
})

export type WhiteBookResponse = z.infer<typeof whiteBookResponseSchema>

export const saveDriverRequestSchema = z.array(
	z.object({
		CreatedBy: z.string(),
		DriverDob: z.string(),
		DriverName: z.string(),
		DriverType: z.string(),
		LicenseNo: z.string(),
		QuoteNo: z.string(),
		RiskId: z.string(),
		RequestReferenceNo: z.string(),
		MaritalStatus: z.string().nullable(),
		CountryId: z.string().nullable(),
		StateId: z.string().nullable(),
		CityId: z.string().nullable(),
		AreaGroup: z.string().nullable(),
		DriverExperience: z.string().nullable(),
		LicenseIssueDt: z.string().nullable(),
		Gender: z.string().nullable()
	})
)

export type SaveDriverRequest = z.infer<typeof saveDriverRequestSchema>

export const saveDriverResSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.any().nullable(),
	Result: z.object({
		Response: z.string()
	}),
	ErroCode: z.number()
})

export type SaveDriverRes = z.infer<typeof saveDriverResSchema>

export const typeRequestSchema = z.object({
	InsuranceId: z.string(),
	ItemType: z.string(),
	BranchCode: z.string(),
	ItemCode: z.string(),
	TitleType: z.string()
})

export type TypeRequest = z.infer<typeof typeRequestSchema>

export const titletypeResSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.any().nullable(),
	Result: z.array(
		z.object({
			TitleType: z.string(),
			Code: z.string(),
			CodeDesc: z.string(),
			Status: z.string(),
			BodyType: z.string().nullable(),
			RiskId: z.string().nullable()
		})
	),
	ErroCode: z.number()
})

export type TypeRes = z.infer<typeof titletypeResSchema>

export const VehicleModelRequestSchema = z.object({
	InsuranceId: z.string(),
	ProductId: z.string(),
	MakeId: z.string()
})

export type VehicleModelReq = z.infer<typeof VehicleModelRequestSchema>

export const VehicleModelResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.unknown()),
	Result: z.array(
		z.object({
			VehicleId: z.string(),
			Make: z.string(),
			Modelgroup: z.string(),
			Model: z.string(),
			BodyType: z.string(),
			SourceVehicleId: z.string(),
			FileSource: z.string(),
			MakeModel: z.string(),
			EnginesizeCc: z.string(),
			WeightKg: z.string(),
			PowerKw: z.string(),
			FuelType: z.string(),
			TransmissionType: z.string(),
			IsSelecTable: z.string(),
			VehicleGroup: z.string(),
			BodyTypeId: z.number(),
			modelGroupId: z.number(),
			MakeId: z.number(),
			ProductId: z.number(),
			InsuranceId: z.string(),
			SectionId: z.number(),
			ModelId: z.number(),
			Status: z.string(),
			CreatedBy: z.null(),
			EntryDate: z.string(),
			EffectiveDateStart: z.string(),
			EffectiveDateEnd: z.string()
		})
	),
	ErroCode: z.number()
})

export type VehicleModelRes = z.infer<typeof VehicleModelResponseSchema>

export const fuelTypeReqSchema = z.object({
	InsuranceId: z.string(),
	BranchCode: z.string()
})

export type FuelTypeRequest = z.infer<typeof fuelTypeReqSchema>

export const fuelTypeResSchema = z.object({
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
			RiskId: z.string().nullable()
		})
	),
	ErroCode: z.number()
})

export type FuelTypeRes = z.infer<typeof fuelTypeResSchema>
