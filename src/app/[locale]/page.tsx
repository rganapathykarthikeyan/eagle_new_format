import { Header } from '@/components/header'
import { HeroContent } from '@/components/hero'
import { ChatBot } from '@/components/support'
import initTranslations from '../i18next'
import TranslationsProvider from '@/components/common/translations-provider'

const i18nNamespaces: string[] = ['hero']

export default async function Page({
	params: { locale }
}: {
	params: {
		locale: string
	}
}) {
	const { resources } = await initTranslations(locale, i18nNamespaces)

	return (
		<TranslationsProvider
			locale={locale}
			namespaces={i18nNamespaces}
			resources={resources}>
			<main className='flex h-screen w-full flex-col overflow-y-scroll'>
				<Header />
				<HeroContent />
				<div className='absolute bottom-10 right-10'>
					<ChatBot />
				</div>
			</main>
		</TranslationsProvider>
	)
}
