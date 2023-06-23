import Layout from '@/layouts/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import axios from 'axios'
import AppStateProvider from '@/context/appStateProvider'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@/styles/global.sass'
import '@/styles/media.sass'
import '@/styles/cards.sass'
import '@/styles/navbar.sass'
import '@/styles/button.sass'
import '@/styles/form.sass'
import '@/styles/icons.sass'

axios.interceptors.request.use((request) => {
	if (localStorage.hasOwnProperty('accessToken')) {
		request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
	}
	return request
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AppStateProvider>
				<Head>
					<title>Airlake</title>
					<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
					<meta name='theme-color' content='#ffffff' />
					<meta httpEquiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
					<meta name='description' content='Airlake' />
				</Head>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AppStateProvider>
		</QueryClientProvider>
	)
}
