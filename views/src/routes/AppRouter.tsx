import { FC, Fragment } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/Home'
import AuthPage from '../pages/Auth'
import { BuyCoin, SellCoin, WalletTransactionsPage } from '../pages/Wallet'
import ErrorComponent from '../components/Error'
import { ViewAllDataSetsPage, ViewOneDataSetPage, ViewSubscriptionsPage } from '../pages/Dataset'
import { AccountPage } from '../pages/Account'
import ProtectedRoute from './ProtectedRoute'
import GlobalStateProvider from '../context/globalStateProvider'
import Layout from '../layout/Layout'

const AppRouter: FC = () => {
	return (
		<Fragment>
			<GlobalStateProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<Layout />}>
							<Route path='/' element={<HomePage />} />
							<Route path='/auth' element={<AuthPage />} />
							<Route element={<ProtectedRoute />}>
								<Route path='/dataset/store' element={<ViewAllDataSetsPage />} />
								<Route path='/dataset/subscriptions' element={<ViewSubscriptionsPage />} />
								<Route path='/dataset/viewone/:datasetId' element={<ViewOneDataSetPage />} />
								<Route path='/wallet/transactions' element={<WalletTransactionsPage />} />
								<Route path='/wallet/buy' element={<BuyCoin />} />
								<Route path='/wallet/sell' element={<SellCoin />} />
								<Route path='/account' element={<AccountPage />} />
							</Route>
							<Route path='*' element={<ErrorComponent />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</GlobalStateProvider>
		</Fragment >
	)
}

export default AppRouter