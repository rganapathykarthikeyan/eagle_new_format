'use client'

import { useEffect, useState } from 'react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '../ui'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '../ui/command'
import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
	useGetMotorMakeListMutation,
	useGetVehicleUsageListMutation,
	useGuestLoginMutation,
	useVehicleModelMutation
} from '@/redux/api/commonApi'
import { setGuestLoginDetails, updateVehicleMark, updateVehicleUsage } from '@/redux/slices'
import { Dialog, DialogContent } from '../ui/dialog'
import { VehicleValues } from './vehicle-values'
import { type VehicleModelRes } from '@/services/models/common.models'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/all'

gsap.registerPlugin(TextPlugin)

export function CarGetDetails() {
	const [open, setOpen] = useState(false)
	const [makeOpen, setMakeOpen] = useState(false)
	const [value, setValue] = useState('')
	const [makeValue, setMakeValue] = useState('')
	const [guestLogin] = useGuestLoginMutation()
	const appData = useAppSelector((state) => state.apps)
	const [token, setToken] = useState<string>('')

	const [getMoreDetails, setMoreDetails] = useState<boolean>(false)

	const [MotorMakeList] = useGetMotorMakeListMutation()

	const [motorListArr, setmotorListArr] = useState<
		{ value: string; label: string; id: string }[]
	>([])

	const appsData = useAppSelector((state) => state.apps)
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	const [vehicleUsage] = useGetVehicleUsageListMutation()

	const [vehicleUsageList, setVehicleUsageList] = useState<
		{ value: string; label: string; id: string }[]
	>([])

	const [modelList, setModelList] = useState<VehicleModelRes>()

	const [vechicleGetDetails] = useVehicleModelMutation()

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
				setToken(value.data.data.Result.Token)
			}
		})
	}

	useEffect(() => {
		if (appData.token === '') {
			loginAsGuest()
		}
	}, [])

	useGSAP(() => {
		gsap.from('.usageList', { y: 80, opacity: 0, duration: 0.8 })
		gsap.from('.makeList', { y: 80, opacity: 0, duration: 0.8 })
		gsap.to('.usageSelectTitle', {
			duration: 0.8,
			text: 'What is the usage of the vehicle you like to insure?'
		})
		gsap.to('.makeTitle', {
			duration: 0.8,
			text: 'What is the brand of the vehicle you like to insure?',
			delay: 0.5
		})
	})

	useEffect(() => {
		if (token !== '') {
			const tempArr: { value: string; label: string; id: string }[] = []
			const request = { InsuranceId: appsData.insuranceID, BranchCode: appsData.branchCode }
			const res = vehicleUsage(request)
			res.then((value) => {
				if (value.data?.type === 'success' && value.data.data !== undefined) {
					value.data.data.Result.map((value) => {
						tempArr.push({
							value: value.CodeDesc,
							label: value.CodeDesc,
							id: value.Code
						})
					})
					setVehicleUsageList(tempArr)
				}
			})
		}
	}, [appsData.branchCode, appsData.insuranceID, vehicleUsage, token])

	useEffect(() => {
		if (token !== '') {
			const request = {
				InsuranceId: appsData.insuranceID,
				BranchCode: appsData.branchCode
			}
			const tempArr: { value: string; label: string; id: string }[] = []
			const res = MotorMakeList(request)
			res.then((value) => {
				if (value.data?.type === 'success' && value.data?.data !== undefined) {
					value.data.data!.Result.map((value) => {
						tempArr.push({
							value: value.CodeDesc,
							label: value.CodeDesc,
							id: value.Code
						})
					})
					setmotorListArr(tempArr)
				}
			})
		}
	}, [token])

	function updateUsage(id: string) {
		const pos = vehicleUsageList.findIndex((item) => {
			return item.id === id
		})

		if (pos !== -1) {
			dispatch(updateVehicleUsage({ usage: vehicleUsageList[pos].label, id: id }))
		}
	}

	function updateMark(makeID: string) {
		const markpos = motorListArr.findIndex((item) => {
			return item.id === makeID
		})

		if (markpos !== -1) {
			dispatch(updateVehicleMark({ mark: motorListArr[markpos].label, makeID: makeID }))
		}
	}

	function findLabel(valueName: string) {
		return vehicleUsageList.find((framework) => framework.value === valueName)?.label
	}

	function findMakeValue(valueMake: string) {
		return motorListArr.find((motor) => motor.value.trim() === valueMake)?.label
	}

	function getDetails() {
		const request = {
			// InsuranceId: appsData.insuranceID,
			InsuranceId: '100020',
			ProductId: '5',
			MakeId: vehicleData.makeID
		}
		const res = vechicleGetDetails(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data.data?.IsError === false) {
				setModelList(value.data.data)
			}
		})
	}

	return (
		<div className='flex h-[35vh] w-full flex-col items-center justify-around gap-16 py-20'>
			<div className='flex w-full flex-row items-start justify-around'>
				{token !== '' && (
					<>
						<div className='flex w-1/4 flex-col items-start gap-10'>
							<h1 className='usageSelectTitle text-center font-manrope text-3xl font-semibold'>
								What is the usage of the vehicle you like to insure?
							</h1>
							<div className='usageList flex w-full'>
								<Popover
									open={open}
									onOpenChange={setOpen}>
									<PopoverTrigger
										asChild
										className='h-16'>
										<Button
											aria-expanded={open}
											className='w-full justify-between'
											role='combobox'
											variant='outline'>
											{value ? findLabel(value) : 'Select Usage...'}
											<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
										</Button>
									</PopoverTrigger>
									<PopoverContent className='min-w-[400px] p-0'>
										<Command>
											<CommandInput
												className='h-12'
												placeholder='Search Usage...'
											/>
											<CommandList>
												<CommandEmpty>Usage List Loading ...</CommandEmpty>
												<CommandGroup>
													{vehicleUsageList.map((usage) => (
														<CommandItem
															key={usage.value}
															className='h-12'
															value={usage.value}
															onSelect={(currentValue) => {
																setValue(
																	currentValue === value
																		? ''
																		: currentValue
																)
																updateUsage(usage.id)
																setOpen(false)
															}}>
															{usage.label}
															<CheckIcon
																className={cn(
																	'ml-auto h-4 w-4',
																	value === usage.value
																		? 'opacity-100'
																		: 'opacity-0'
																)}
															/>
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>
						</div>
						{value !== '' && (
							<div className='flex w-1/4 flex-col items-start gap-10'>
								<h1 className='makeTitle text-center font-manrope text-3xl font-semibold'>
									What is the brand of the vehicle you like to insure?
								</h1>
								<div className='makeList flex w-full'>
									<Popover
										open={makeOpen}
										onOpenChange={setMakeOpen}>
										<PopoverTrigger
											asChild
											className='h-16'>
											<Button
												aria-expanded={open}
												className='w-full justify-between'
												role='combobox'
												variant='outline'>
												{makeValue
													? findMakeValue(makeValue)
													: 'Select Make...'}
												<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
											</Button>
										</PopoverTrigger>
										<PopoverContent className='min-w-[400px] p-0'>
											<Command>
												<CommandInput
													className='h-12'
													placeholder='Search Make...'
												/>
												<CommandList>
													<CommandEmpty>
														Make List Loading ...
													</CommandEmpty>
													<CommandGroup>
														{motorListArr.map((make) => (
															<CommandItem
																key={make.value}
																className='h-12'
																value={make.value}
																onSelect={(currentValue) => {
																	setMakeValue(
																		currentValue === makeValue
																			? ''
																			: currentValue
																	)
																	updateMark(make.id)
																	setMakeOpen(false)
																}}>
																{make.label}
																<CheckIcon
																	className={cn(
																		'ml-auto h-4 w-4',
																		value === make.value
																			? 'opacity-100'
																			: 'opacity-0'
																	)}
																/>
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</div>
							</div>
						)}
					</>
				)}
			</div>
			{token !== '' && (
				<Button
					className='rounded-3xl px-16 py-6 text-lg'
					disabled={value === '' || makeValue === ''}
					variant='greenbtn'
					onClick={() => {
						if (vehicleData.vehicleUsage !== '' && vehicleData.makeID !== '') {
							getDetails()
							setMoreDetails(true)
						} else {
							alert('Fill Details')
						}
					}}>
					Continue
				</Button>
			)}
			<Dialog
				open={getMoreDetails}
				onOpenChange={() => {
					setMoreDetails(false)
				}}>
				<DialogContent className='flex items-center justify-center overflow-hidden'>
					<VehicleValues modelList={modelList} />
				</DialogContent>
			</Dialog>
		</div>
	)
}
