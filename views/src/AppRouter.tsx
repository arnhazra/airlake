import { Fragment } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { AuthPage, SignOutPage } from './pages/Auth'
import { BuyCoin, SellCoin, WalletDashboardPage } from './pages/Wallet'
import ErrorComponent from './components/ErrorComponent'

const AppRouter = () => {
	return (
		<Fragment>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/auth' element={<AuthPage />} />
					<Route path='/wallet/dashboard' element={<WalletDashboardPage />} />
					<Route path='/wallet/buy' element={<BuyCoin />} />
					<Route path='/wallet/sell' element={<SellCoin />} />
					<Route path='/auth/signout' element={<SignOutPage />} />
					<Route path='*' element={<ErrorComponent />} />
				</Routes>
			</BrowserRouter>
		</Fragment>
	)
}

export default AppRouter