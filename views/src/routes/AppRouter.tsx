import { Fragment } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/Home'
import { AuthPage, SignOutPage } from '../pages/Auth'
import { BuyCoin, SellCoin, WalletTransactionsPage } from '../pages/Wallet'
import ErrorComponent from '../components/ErrorComponent'
import { ViewAllDataSetsPage, ViewOneDataSetPage, ViewSubscriptionsPage } from '../pages/Dataset'
import { AccountPage } from '../pages/Account'
import ProtectedRoute from './ProtectedRoute'
import DatasetStoreProvider from '../context/datasetProvider'

const AppRouter = () => {
	return (
		<Fragment>
			<BrowserRouter>
				<DatasetStoreProvider>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/auth' element={<AuthPage />} />
						<Route path='/auth/signout' element={<SignOutPage />} />
						<Route path='/dataset/store' element={<ProtectedRoute child={<ViewAllDataSetsPage />} />} />
						<Route path='/dataset/subscriptions' element={<ProtectedRoute child={<ViewSubscriptionsPage />} />} />
						<Route path='/dataset/viewone/:datasetId' element={<ProtectedRoute child={<ViewOneDataSetPage />} />} />
						<Route path='/wallet/transactions' element={<ProtectedRoute child={<WalletTransactionsPage />} />} />
						<Route path='/wallet/buy' element={<ProtectedRoute child={<BuyCoin />} />} />
						<Route path='/wallet/sell' element={<ProtectedRoute child={<SellCoin />} />} />
						<Route path='/account' element={<ProtectedRoute child={<AccountPage />} />} />
						<Route path='*' element={<ErrorComponent />} />
					</Routes>
				</DatasetStoreProvider>
			</BrowserRouter>
		</Fragment>
	)
}

export default AppRouter