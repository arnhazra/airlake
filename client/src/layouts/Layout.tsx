import NavBar from '@/components/NavBar'
import { LayoutProps } from '@/types/Types'
import { Fragment, FC, useEffect } from 'react'
import Show from '@/components/Show'
import Loading from '@/components/Loading'
import useAuth from '@/hooks/useAuth'
import { Toaster } from 'react-hot-toast'
import { unprotectedRoutes } from '@/constants/UnprotectedRoutes'
import { useRouter } from 'next/router'

const Layout: FC<LayoutProps> = ({ children }) => {
	const auth = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (unprotectedRoutes.includes(router.pathname) && sessionStorage.hasOwnProperty('accessToken')) {
			router.replace('/dataplatform')
		}
	}, [router.pathname])

	return (
		<Fragment>
			<nav className='header'>
				<NavBar />
			</nav>
			<main>
				<Show when={auth.isLoaded}>
					{children}
				</Show>
				<Show when={!auth.isLoaded}>
					<Loading />
				</Show>
				<Toaster position='bottom-center' containerClassName='toaster' />
			</main>
		</Fragment>
	)
}

export default Layout