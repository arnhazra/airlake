import Layout from '@/layouts/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import axios from 'axios'
import GlobalStateProvider from '@/context/globalStateProvider'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
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
			<GlobalStateProvider>
				<Head>
					<title>Lenstack</title>
					<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
					<meta name='theme-color' content='#ffffff' />
					<meta httpEquiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
					<meta name='description' content='Lenstack' />
				</Head>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</GlobalStateProvider >
		</QueryClientProvider>
	)
}
