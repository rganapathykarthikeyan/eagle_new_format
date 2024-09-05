import { assets } from '@/assets'

export const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
]

export const pricingData = [
	{
		name: 'Basic',
		price: 0,
		WorkSpace: {
			seats: 'Up to 3',
			objects: 'Up to 3'
		},
		Automation: {
			credits: '200'
		},
		EmailCalendar: {
			storage: 'Up to 1GB'
		}
	},
	{
		name: 'Evolution',
		price: 39,
		WorkSpace: {
			seats: 'Unlimited',
			objects: 'Up to 8'
		},
		Automation: {
			credits: '2000'
		},
		EmailCalendar: {
			storage: 'Up to 5GB'
		}
	},
	{
		name: 'Evolution +',
		price: 59,
		WorkSpace: {
			seats: 'Unlimited',
			objects: 'Up to 12'
		},
		Automation: {
			credits: '4000'
		},
		EmailCalendar: {
			storage: 'Up to 25GB'
		}
	},
	{
		name: 'Enterprise',
		price: 129,
		WorkSpace: {
			seats: 'Unlimited',
			objects: 'Unlimited'
		},
		Automation: {
			credits: '5000+'
		},
		EmailCalendar: {
			storage: 'Price per use'
		}
	}
]

export const createAccountOptions = [
	{
		id: 1,
		optionName: 'Setup your account Manually',
		optionDescription:
			'You can get everything you want if you work hard, trust the process, and stick to the plan.'
	},
	{
		id: 2,
		optionName: 'Set up your account quickly with AI',
		optionDescription:
			'You can get everything you want if you work hard, trust the process, and stick to the plan.'
	}
]

export const onBoardingOptions = [
	{
		id: 1,
		optionName: 'Setup your account Manually',
		optionDescription:
			'You can get everything you want if you work hard, trust the process, and stick to the plan.'
	},
	{
		id: 2,
		optionName: 'Set up your account quickly with AI',
		optionDescription:
			'You can get everything you want if you work hard, trust the process, and stick to the plan.'
	}
]

export const coverTypesHome = [
	{
		title: 'Building + Contents Cover',
		image: assets.images.homeCov1,
		Building: true,
		Content: true,
		Building1: true,
		Content1: true,
		Building2: true,
		Content2: true
	},
	{
		title: 'Building Cover Only',
		image: assets.images.homeCov2,
		Building: true,
		Content: false,
		Building1: true,
		Content1: false,
		Building2: true,
		Content2: false
	},
	{
		title: 'Contents Cover Only',
		image: assets.images.homeCov3,
		Building: false,
		Content: true,
		Building1: false,
		Content1: true,
		Building2: false,
		Content2: true
	}
]
