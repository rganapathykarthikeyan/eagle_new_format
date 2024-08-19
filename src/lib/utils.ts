import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { months } from './constants'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getPolicyDateFormat(type: string, date?: Date): string {
	const now = date ? date : new Date()

	const month = months[now.getMonth()]
	const day = now.getDate()
	const year = now.getFullYear()

	const formattedDate = `${month} ${day}, ${year}`
	const formattedEndDate = `${month} ${day}, ${year + 1}`

	return type === 'start' ? formattedDate : formattedEndDate
}
