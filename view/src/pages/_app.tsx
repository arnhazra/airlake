import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.sass'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import NavBar from '@/components/NavBarComponent'
import axios from 'axios'
import GlobalStateProvider from '@/context/globalStateProvider'

axios.interceptors.request.use(
	(request) => {
		request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
		return request
	}
)

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Fragment>
			<GlobalStateProvider>
				<header>
					<title>Lenstack</title>
					<NavBar />
				</header>
				<main>
					<Component {...pageProps} />
				</main>
			</GlobalStateProvider>
		</Fragment>
	)
}
