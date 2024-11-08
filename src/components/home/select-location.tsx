'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
import { useEffect, useState } from 'react'
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { Search, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addNewAddress, setGuestLoginDetails } from '@/redux/slices'
import { Dialog, DialogContent } from '../ui/dialog'
import { ManualAddressDialog } from './manual-address-dialog'
import { cn } from '@/lib'
import { useGuestLoginMutation } from '@/redux/api/homeApi'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

gsap.registerPlugin(TextPlugin)

const dummyLocationList = [
	{
		value: 'Chennai',
		label: 'Chennai'
	},
	{
		value: 'Selam',
		label: 'Selam'
	},
	{
		value: 'Kanyakumari',
		label: 'Kanyakumari'
	},
	{
		value: 'Madurai',
		label: 'Madurai'
	},
	{
		value: 'Tirunelveli',
		label: 'Tirunelveli'
	}
]

export function SelectLocation() {
	const [selectedLocation, setSelectedLocation] = useState<{
		value: string
		label: string
	}>()
	const token = useAppSelector((state) => state.apps.token)

	const [guestLogin] = useGuestLoginMutation()

	const [showDialog, setShowDialog] = useState<boolean>(false)

	const [oOrT, setOOrT] = useState<string>('Owner')

	const [selectedLocationList, setSelectedLocationList] = useState<
		{
			value: string
			label: string
			ownerOrTenant: string
		}[]
	>([])

	const dispatch = useAppDispatch()

	function loginAsGuest() {
		const res = guestLogin()
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				const details = {
					token: value.data.data.Result.Token,
					loginId: value.data.data.Result.LoginId,
					userType: value.data.data.Result.UserType,
					subUserType: value.data.data.Result.SubUserType,
					brokerCode: value.data.data.Result.LoginBranchDetails[0].BrokerBranchCode,
					insuranceID: value.data.data.Result.LoginBranchDetails[0].InsuranceId,
					branchCode: value.data.data.Result.LoginBranchDetails[0].BranchCode,
					productId: value.data.data.Result.BrokerCompanyProducts[0].ProductId,
					CustomerCode: value.data.data.Result.CustomerCode,
					agencyCode: value.data.data.Result.OaCode,
					countryCode: value.data.data.Result.CountryId
				}

				dispatch(setGuestLoginDetails(details))
			}
		})
	}

	useEffect(() => {
		if (token === '') {
			loginAsGuest()
		}
	}, [])

	function onAdd() {
		if (selectedLocation) {
			setSelectedLocationList((pre) => [...pre, { ...selectedLocation, ownerOrTenant: oOrT }])
		} else {
			alert('Select a location')
		}
	}

	function onAddManual(ManualAdd: { value: string; label: string; ownerOrTenant: string }) {
		setSelectedLocationList((pre) => [...pre, ManualAdd])
	}

	function onRemove(curLocation: { value: string; label: string; ownerOrTenant: string }) {
		const pos = selectedLocationList.findIndex((location) => {
			return location.value === curLocation.value
		})
		const updatedList = [...selectedLocationList]
		updatedList.splice(pos, 1)

		setSelectedLocationList(updatedList)
	}

	function saveCurrentLocations() {
		dispatch(addNewAddress(selectedLocationList))
	}

	function setManualLocation(totalAddress: {
		value: string
		label: string
		ownerOrTenant: string
	}) {
		onAddManual(totalAddress)
		setShowDialog(false)
	}

	useGSAP(() => {
		gsap.from('.locationHome', { y: 80, opacity: 0, duration: 0.8 })
		gsap.to('.locationTitle', { duration: 0.8, text: 'Find Your Perfect Home Insurance' })
		gsap.to('.locationSubTitle', {
			duration: 0.8,
			text: 'THE BEST WAY TO',
			delay: 0.5
		})
	})

	return (
		<section className='flex min-h-screen w-full items-center justify-center bg-[#0000008f] lg:min-h-[90svh]'>
			<section className='flex w-full flex-col gap-10 px-4 py-10 font-jakarta lg:w-3/4 lg:px-32 lg:py-12'>
				<div className='flex w-full flex-col items-center gap-4'>
					<p className='locationSubTitle w-4/5 text-center font-manrope text-xs text-white lg:text-xs'></p>
					<h1 className='locationTitle text-center font-inter text-2xl font-bold text-white lg:text-5xl'></h1>
				</div>
				<div className='locationHome flex flex-col'>
					<div className='flex w-fit flex-row gap-3 rounded-t-xl bg-white p-3'>
						<div
							className={cn(
								'flex flex-row items-center gap-2 text-xs font-medium text-gray-325 lg:text-sm',
								{
									'border-b border-gray-750 text-black': oOrT === 'Owner'
								}
							)}
							onClick={() => {
								setOOrT('Owner')
							}}>
							<h4 className='cursor-pointer'>Owner</h4>
						</div>
						<div
							className={cn(
								'flex flex-row items-center gap-2 text-xs font-medium text-gray-325 lg:text-sm',
								{
									'border-b border-gray-750 text-black': oOrT === 'Tenant'
								}
							)}
							onClick={() => {
								setOOrT('Tenant')
							}}>
							<h4 className='cursor-pointer'>Tenant</h4>
						</div>
					</div>
					<div className='flex w-full flex-row gap-3 rounded-b-xl rounded-se-xl bg-white p-3'>
						<div className='flex w-full flex-col items-end'>
							<Select
								value={selectedLocation?.value}
								onValueChange={(e) => {
									const pos = dummyLocationList.findIndex((item) => {
										return item.value === e
									})

									if (pos !== -1) {
										setSelectedLocation({
											...dummyLocationList[pos]
										})
									}
								}}>
								<SelectTrigger className='border-gray-360 border shadow-inputShadowDrop'>
									<SelectValue placeholder='Select Location' />
								</SelectTrigger>
								<SelectContent>
									{dummyLocationList.map((location, index) => {
										return (
											<SelectItem
												key={index}
												value={location.value}>
												{location.label}
											</SelectItem>
										)
									})}
								</SelectContent>
							</Select>
							{/* <span
								className='cursor-pointer text-sm font-bold text-blue-300'
								onClick={() => {
									setShowDialog(true)
								}}>
								Can&apos;t find your Address
							</span> */}
						</div>
						<Button
							variant='transparent'
							onClick={onAdd}>
							Add
						</Button>
						<Button
							variant='destructive'
							onClick={() => {
								setShowDialog(true)
							}}>
							<Search
								color='white'
								size={20}
							/>
						</Button>
					</div>
				</div>
				<div className='flex flex-row flex-wrap gap-2'>
					{selectedLocationList.map((selectedLocations, index) => {
						return (
							<div
								key={index}
								className='flex flex-row items-center gap-2 rounded-3xl border bg-white p-1'>
								<span className='font-dmsan text-xs lg:text-sm'>
									{selectedLocations.label} | {selectedLocations.ownerOrTenant}
								</span>
								<X
									className='cursor-pointer'
									size={12}
									onClick={() => {
										onRemove(selectedLocations)
									}}
								/>
							</div>
						)
					})}
				</div>
				{/* <GooglePlacesAutocomplete
				selectProps={{
					value,
					onChange: setValue
				}}
			/> */}
				<Dialog
					open={showDialog}
					onOpenChange={(e) => {
						setShowDialog(e)
					}}>
					<DialogContent>
						<ManualAddressDialog setManualLocation={setManualLocation} />
					</DialogContent>
				</Dialog>
				<div className='flex w-full flex-row justify-center'>
					{selectedLocationList.length !== 0 && (
						<Button
							className='w-1/2'
							variant='greenbtn'
							onClick={saveCurrentLocations}>
							Confirm & Continue
						</Button>
					)}
				</div>
			</section>
		</section>
	)
}
