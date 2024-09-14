import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { months } from './constants'
import { type EachHomeDetails } from '@/redux/slices'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getPolicyDateFormat(type: string, date?: Date): string {
	const now = date ? date : new Date()

	const month = months[now.getMonth()]
	const day = now.getDate()
	const year = now.getFullYear()

	const formattedDate = `${day} ${month} ${year}`
	const formattedEndDate = `${day} ${month} , ${year + 1}`

	return type === 'start' ? formattedDate : formattedEndDate
}

export function getPolicyDateFormatFromDate(date: Date): string {
	const month = months[date.getMonth()]
	const day = date.getDate()
	const year = date.getFullYear()

	const formattedDate = `${month} ${day}, ${year}`

	return formattedDate
}

export function formatDateDDMMYYYY(date: Date) {
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()

	return `${day}/${month}/${year}`
}

export function formatDateDDMMYYYYNextYear(date: Date) {
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()

	return `${day}/${month}/${year + 1}`
}

export function removeParenthesis(str: string) {
	const regex = /\(.*?\)/g
	const result = str.replace(regex, '')
	return result
}

export function getDataWithinParenthesis(str: string) {
	const regex = /\((.*?)\)/
	const match = str.match(regex)
	return match ? match[1] : ''
}

export function isValidEmail(email: string) {
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	return regex.test(email)
}

export function isKeyOfEachHomeDetails(fieldName: string): fieldName is keyof EachHomeDetails {
	const keys: (keyof EachHomeDetails)[] = [
		'homeAddress',
		'addressId',
		'ownerOrTenet',
		'BuildingSumInsured',
		'ContentSuminsured',
		'electricEquipement',
		'PersonalAccidentSi',
		'allRiskSumInsured',
		'DomesticServentSi',
		'PersonalLiabilitySi',
		'OutbuildConstructType',
		'coverType',
		'sectionType',
		'DomesticServantType',
		'RelationType',
		'ServantCount'
	]

	return keys.includes(fieldName as keyof EachHomeDetails)
}
