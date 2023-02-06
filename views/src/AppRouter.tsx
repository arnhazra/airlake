import { Fragment } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { AuthPage, SignOutPage } from './pages/Auth'
import { BuyCoin, SellCoin, WalletTransactionsPage } from './pages/Wallet'
import ErrorComponent from './components/ErrorComponent'
import { ViewAllDataSetsPage, ViewOneDataSetPage } from './pages/Dataset'
import { AccountPage } from './pages/Account'

const AppRouter = () => {
	return (
		<Fragment>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/auth' element={<AuthPage />} />
					<Route path='/auth/signout' element={<SignOutPage />} />
					<Route path='/dataset/store' element={<ViewAllDataSetsPage />} />
					<Route path='/dataset/viewone/:id' element={<ViewOneDataSetPage />} />
					<Route path='/wallet/transactions' element={<WalletTransactionsPage />} />
					<Route path='/wallet/buy' element={<BuyCoin />} />
					<Route path='/wallet/sell' element={<SellCoin />} />
					<Route path='/account' element={<AccountPage />} />
					<Route path='*' element={<ErrorComponent />} />
				</Routes>
			</BrowserRouter>
		</Fragment>
	)
}

export default AppRouter