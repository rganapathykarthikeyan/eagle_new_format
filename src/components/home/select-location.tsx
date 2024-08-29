'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
import { useState } from 'react'
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { X } from 'lucide-react'
import { useAppDispatch } from '@/redux/hooks'
import { addNewAddress } from '@/redux/slices'
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
	const [selectedLocation, setSelectedLocation] = useState<{ value: string; label: string }>()

	const [selectedLocationList, setSelectedLocationList] = useState<
		{
			value: string
			label: string
		}[]
	>([])

	const dispatch = useAppDispatch()

	function onAdd() {
		if (selectedLocation) {
			setSelectedLocationList((pre) => [...pre, selectedLocation])
		} else {
			alert('Select a location')
		}
	}

	function onRemove(curLocation: { value: string; label: string }) {
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

	useGSAP(() => {
		gsap.from('.locationHome', { y: 80, opacity: 0, duration: 0.8 })
		gsap.to('.locationTitle', { duration: 0.8, text: 'Select your Location' })
		gsap.to('.locationSubTitle', {
			duration: 0.8,
			text: 'Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.',
			delay: 0.5
		})
	})

	return (
		<section className='flex flex-col gap-10 px-4 py-10 font-jakarta lg:px-32 lg:py-12'>
			<div className='flex w-full flex-col items-center gap-4'>
				<div className='flex flex-row -space-x-7'>
					<div className='h-10 w-10 rounded-full bg-black'></div>
					<div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg font-medium text-white'>
						1
					</div>
				</div>
				<h1 className='locationTitle text-center font-inter text-2xl font-bold text-blue-825 lg:text-4xl'></h1>
				<p className='locationSubTitle w-4/5 text-center font-roboto text-xs text-gray-500 lg:text-sm'></p>
			</div>
			<div className='locationHome flex flex-row gap-3'>
				<Select
					value={selectedLocation?.value}
					onValueChange={(e) => {
						const pos = dummyLocationList.findIndex((item) => {
							return item.value === e
						})

						if (pos !== -1) {
							setSelectedLocation(dummyLocationList[pos])
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
				<Button
					variant='greenbtn'
					onClick={onAdd}>
					Add
				</Button>
			</div>
			<div className='flex flex-row gap-2'>
				{selectedLocationList.map((selectedLocations, index) => {
					return (
						<div
							key={index}
							className='flex flex-row items-center gap-2 rounded-3xl border p-1'>
							<span className='font-dmsan text-sm'>{selectedLocations.label}</span>
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
			{selectedLocationList.length !== 0 && (
				<Button
					variant='greenbtn'
					onClick={saveCurrentLocations}>
					Confirm & Continue
				</Button>
			)}
		</section>
	)
}
