'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
// import { setScrollTo } from '@/redux/slices'
import { useEffect, useRef, useState } from 'react'
// import { BodyType } from './body-type'
// import { FuelType } from './fuel-type'
// import { SelectMark } from './select-mark'
// import { SelectModel } from './select-model'
// import { VehicleUsage } from './vehicle-usage'
// import { CarSeating } from './car-seating'
// import TariffZone from './tariff-zone'
import { CustomerInfo } from './customer-info'
import { VehcileBaseInfo } from './vehicle-base-info'
// import { VehcileValuesInfo } from './vehicle-values-info'
import { useGuestLoginMutation } from '@/redux/api/commonApi'
import { setGuestLoginDetails } from '@/redux/slices'
import ClipLoader from 'react-spinners/ClipLoader'
// import { AdditionalValuesInfo } from './additonal-values-info'

export function DetailsPage() {
	// const router = useRouter()
	const dispatch = useAppDispatch()
	const [guestLogin] = useGuestLoginMutation()

	const vehicleData = useAppSelector((state) => state.carInsurance)
	const customerName = useAppSelector((state) => state.customerDetails.name)
	const customerNumber = useAppSelector((state) => state.customerDetails.mobile)
	const appData = useAppSelector((state) => state.apps)
	const [token, setToken] = useState<string>('')

	const pageEnd = useRef<HTMLDivElement>(null)
	// const specificRef = useRef<HTMLDivElement>(null)

	function scrollToBottom() {
		pageEnd.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const [count, setCount] = useState<number>(1)

	// function next() {
	// 	router.push('/car-insurance/2')
	// }

	useEffect(() => {
		if (
			(vehicleData.mark !== '' && vehicleData.model !== '' && vehicleData.color !== '',
			vehicleData.seat !== 0)
		) {
			scrollToBottom()
		}
	}, [vehicleData, customerName, customerNumber])

	useEffect(() => {
		if (appData.token !== '') {
			setToken(appData.token)
		}
	}, [appData.token])

	function goNext() {
		setCount((prev) => prev + 1)
	}

	// useEffect(() => {
	// 	if (appData.scrollTo !== 0) {
	// 		// if (appData.scrollTo === 1 || appData.scrollTo === 4) {
	// 		// 	specificRef.current?.scrollIntoView({
	// 		// 		behavior: 'smooth',
	// 		// 		block: 'end'
	// 		// 	})
	// 		// } else {
	// 		specificRef.current?.scrollIntoView({
	// 			behavior: 'smooth',
	// 			block: 'center'
	// 		})
	// 		// }

	// 		dispatch(setScrollTo(0))
	// 	}
	// }, [appData, dispatch])

	function loginAsGuest() {
		const res = guestLogin()
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				const pos = value.data.data.Result.BrokerCompanyProducts.findIndex(
					(item) => item.ProductName === 'Motor '
				)
				const details = {
					token: value.data.data.Result.Token,
					loginId: value.data.data.Result.LoginId,
					userType: value.data.data.Result.UserType,
					subUserType: value.data.data.Result.SubUserType,
					brokerCode: value.data.data.Result.LoginBranchDetails[0].BrokerBranchCode,
					insuranceID: value.data.data.Result.LoginBranchDetails[0].InsuranceId,
					branchCode: value.data.data.Result.LoginBranchDetails[0].BranchCode,
					productId:
						pos !== -1
							? value.data.data.Result.BrokerCompanyProducts[pos].ProductId
							: '5',
					CustomerCode: value.data.data.Result.CustomerCode,
					agencyCode: value.data.data.Result.OaCode,
					countryCode: value.data.data.Result.CountryId
				}
				dispatch(setGuestLoginDetails(details))
				setToken(value.data.data.Result.Token)
			}
		})
	}

	useEffect(() => {
		if (appData.token === '') {
			loginAsGuest()
		}
	}, [])

	return (
		<section className='flex min-h-[90svh] items-center justify-end overflow-hidden'>
			<section className='flex h-full w-full flex-col items-center gap-20 overflow-hidden px-4 pt-4 font-roboto lg:px-14 lg:pb-8 lg:pt-14'>
				{token === '' && (
					<div className='flex w-full flex-row justify-center'>
						<ClipLoader color='#0C7BC4' />
					</div>
				)}
				{token !== '' && (
					<div className='flex h-full w-full items-center justify-center'>
						<VehcileBaseInfo goNext={goNext} />
					</div>
				)}
				{/* {vehicleData.mark !== '' && count > 1 && <VehcileValuesInfo goNext={goNext} />} */}
				{vehicleData.mark !== '' && count > 1 && <CustomerInfo goNext={goNext} />}

				{/* <div className='flex flex-row items-start justify-start gap-8'>
					<Button
						className='py-8'
						size='icon'
						variant='transparent'
						onClick={goBack}>
						<ArrowLeft
							height={32}
							width={32}
						/>
					</Button>
					<div className='flex flex-col gap-4'>
						<h1 className='font-jakarta text-2xl font-semibold md:text-[40px]'>
							Vehicle Details
						</h1>
						<p className='w-4/5 text-xs font-medium text-gray-500 md:text-sm'>
							Please fill out the form with accurate details about your vehicle.
							Ensure all information provided is correct and up-to-date.
						</p>
					</div>
				</div> */}
				{/* {customerName !== '' && (
					<div
						ref={appData.scrollTo === 1 ? specificRef : undefined}
						className='flex flex-col gap-6'>
						<VehicleUsage />
					</div>
				)}
				{vehicleData.vehicleUsage !== '' && (
					<div
						ref={appData.scrollTo === 2 ? specificRef : undefined}
						className='flex flex-col gap-6'>
						<BodyType />
					</div>
				)}
				{vehicleData.bodyType !== '' && (
					<div
						ref={appData.scrollTo === 3 ? specificRef : undefined}
						className='flex flex-col gap-6'>
						<SelectMark />
					</div>
				)}
				{vehicleData.mark !== '' && (
					<div
						ref={appData.scrollTo === 4 ? specificRef : undefined}
						className='flex flex-col gap-6'>
						<SelectModel />
					</div>
				)}
				{vehicleData.model && (
					<div ref={appData.scrollTo === 5 ? specificRef : undefined}>
						<FuelType />
					</div>
				)} */}
				{/* 
				{customerNumber !== '' && (
					<Button
						className='w-full'
						variant='greenbtn'
						onClick={next}>
						Next
					</Button>
				)} */}
				<div ref={pageEnd}></div>
			</section>
		</section>
	)
}
