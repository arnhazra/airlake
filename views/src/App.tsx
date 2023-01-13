import { Fragment } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { AuthPage, SignOutPage } from './pages/Auth'
import { BuyCoin, SellCoin, WalletTransactionPage } from './pages/Wallet'
import ErrorComponent from './components/ErrorComponent'

//UI Router
const Router = () => {
	return (
		<Fragment>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/auth' element={<AuthPage />} />
					<Route path='/auth/signout' element={<SignOutPage />} />
					<Route path='/wallet/transactions' element={<WalletTransactionPage />} />
					<Route path='/wallet/buy' element={<BuyCoin />} />
					<Route path='/wallet/sell' element={<SellCoin />} />
					<Route path='*' element={<ErrorComponent />} />
				</Routes>
			</BrowserRouter>
		</Fragment>
	)
}

export default Router