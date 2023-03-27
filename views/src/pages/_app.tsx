import Layout from '@/layouts/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.sass'
import '@/styles/media.sass'
import type { AppProps } from 'next/app'
import axios from 'axios'
import GlobalStateProvider from '@/context/globalStateProvider'
import Head from 'next/head'

axios.interceptors.request.use(
	(request) => {
		request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
		return request
	}
)

export default function App({ Component, pageProps }: AppProps) {
	return (
		<GlobalStateProvider>
			<Head>
				<title>Lenstack</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
				<meta name='theme-color' content='#121212' />
				<meta httpEquiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
				<meta name='description' content='Lenstack' />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</GlobalStateProvider >
	)
}
