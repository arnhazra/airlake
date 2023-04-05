import Layout from '@/layouts/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.sass'
import '@/styles/media.sass'
import '@/styles/cards.sass'
import '@/styles/navbar.sass'
import '@/styles/button.sass'
import type { AppProps } from 'next/app'
import axios from 'axios'
import GlobalStateProvider from '@/context/globalStateProvider'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

axios.interceptors.request.use((request) => {
	request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
	return request
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStateProvider>
				<Head>
					<title>Evolake</title>
					<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
					<meta name='theme-color' content='#121212' />
					<meta httpEquiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
					<meta name='description' content='Evolake' />
				</Head>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</GlobalStateProvider >
		</QueryClientProvider>
	)
}
