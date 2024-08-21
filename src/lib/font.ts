import {
	DM_Sans,
	Inter,
	Plus_Jakarta_Sans,
	Roboto,
	Manrope,
	DM_Serif_Display
} from 'next/font/google'

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto'
})

const inter = Inter({
	weight: ['300', '400', '500', '600', '700'],
	style: ['normal'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter'
})

const jakarta = Plus_Jakarta_Sans({
	weight: ['300', '400', '500', '600', '700'],
	style: ['normal'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-jakarta'
})

const dmsan = DM_Sans({
	weight: ['300', '400', '500', '600', '700'],
	style: ['normal'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-dmsan'
})

const manrope = Manrope({
	weight: ['300', '400', '500', '600', '700'],
	style: ['normal'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-manrope'
})

const dmserif = DM_Serif_Display({
	weight: ['400'],
	style: ['normal'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-dmserif'
})

export const fonts = [roboto, inter, jakarta, dmsan, manrope, dmserif]
