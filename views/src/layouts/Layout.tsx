import NavBar from '@/components/NavBarComponent'
import { LayoutProps } from '@/types/Props'
import { Fragment, FC, useEffect } from 'react'
import ReactIf from '@/components/ReactIfComponent'
import Loading from '@/components/LoadingComponent'
import useChcekAuth from '@/hooks/useCheckAuth'
import { Toaster } from 'react-hot-toast'

const Layout: FC<LayoutProps> = ({ children }) => {
	const checkAuth = useChcekAuth()

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