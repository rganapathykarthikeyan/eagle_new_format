'use client'

import { I18nextProvider } from 'react-i18next'
import { createInstance, type Resource } from 'i18next'
import { type ReactElement } from 'react'
import initTranslations from '@/app/i18next'

export default function TranslationsProvider({
	children,
	locale,
	namespaces,
	resources
}: {
	children: ReactElement
	locale: string
	namespaces: string[]
	resources: Resource
}) {
	const i18n = createInstance()

	initTranslations(locale, namespaces, i18n, resources)

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
