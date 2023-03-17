import NavBar from '@/components/NavBarComponent'
import { LayoutProps } from '@/types/Props'
import { Fragment, FC, useLayoutEffect } from 'react'
import ReactIf from '@/components/ReactIfComponent'
import Loading from '@/components/LoadingComponent'
import useChcekAuth from '@/hooks/useCheckAuth'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { unprotectedRoutes } from '@/constants/UnprotectedRoutes'
import useReload from '@/hooks/useReload'

const Layout: FC<LayoutProps> = ({ children }) => {
	const checkAuth = useChcekAuth()
	const router = useRouter()
	useReload()

	useLayoutEffect(() => {
		if (localStorage.hasOwnProperty('accessToken')) {
			if (unprotectedRoutes.includes(router.pathname)) {
				router.push('/dataset/library')
			}
		}
	}, [router.pathname])

	return (
		<Fragment>
			<nav>
				<NavBar />
			</nav>
			<main>
				<ReactIf condition={checkAuth.isLoaded}>
					{children}
				</ReactIf>
				<ReactIf condition={!checkAuth.isLoaded}>
					<Loading />
				</ReactIf>
				<Toaster position='bottom-center' containerClassName='toaster' />
			</main>
		</Fragment>
	)
}

export default Layout