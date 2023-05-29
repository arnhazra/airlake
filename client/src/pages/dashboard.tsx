import { Fragment, useContext, useState } from 'react'
import { GlobalContext } from '@/context/globalStateProvider'
import { NextPage } from 'next'
import endPoints from '@/constants/Endpoints'
import Show from '@/components/Show'
import { Col, Container, Row, Table } from 'react-bootstrap'
import Constants from '@/constants/Constants'
import Link from 'next/link'
import Loading from '@/components/Loading'
import useFetchRealtime from '@/hooks/useFetchRealtime'
import HTTPMethods from '@/constants/HTTPMethods'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import moment from 'moment'
import WalletHome from '@/utils/WalletHome'
import LFTSwap from '@/utils/LFTSwap'
import useFetch from '@/hooks/useFetch'

const DashboardPage: NextPage = () => {
    const [{ userState }] = useContext(GlobalContext)
    const router = useRouter()
    const [component, setComponent] = useState('walletBalance')
    const transactions = useFetchRealtime('transactions', endPoints.getTransactionsEndpoint, HTTPMethods.POST)
    const datasetSubscriptions = useFetch('subscriptions', endPoints.datasetSubscriptionEndpoint, HTTPMethods.POST)

    const signOutFromThisDevice = () => {
        localStorage.removeItem('accessToken')
        router.push('/')
    }

    const signOutFromAllDevices = async () => {
        try {
            await axios.post(endPoints.signOutEndpoint)
            localStorage.removeItem('accessToken')
            router.push('/')
        } catch (error) {
            toast.error(Constants.ToastError)
        }
    }

    const transactionsToDisplay = transactions?.data?.transactions?.map((tx: any) => {
        return (
            <tr key={tx._id}>
                <td>{tx.transactionType} LFT</td>
                <td>{tx.lftAmount} LFT</td>
                <td>{tx.ethAmount} ETH</td>
                <td>{moment(tx.date).format('MMM, Do YYYY, h:mm a')}</td>
                <td><a href={`${endPoints.etherScanEndpoint}/${tx.txHash}`} target='_blank' rel='noopener noreferrer' className='link-table'>View on EtherScan</a></td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Container>
                <Row className='mt-4'>
                    <Col xs={12} sm={6} md={6} lg={4} xl={3} className='mb-2'>
                        <div className='jumbotron'>
                            <p className='branding'>Subscriptions <i className='fa-solid fa-circle-plus'></i></p>
                            <p className='display-6'>{datasetSubscriptions?.data?.subscribedDatasets?.length}</p>
                            <p className='lead'>NFT Count - {datasetSubscriptions?.data?.subscribedDatasets?.length}</p>
                            <Link href={'/subscriptions'} className='btn btn-block'>View Subscriptions <i className='fa-solid fa-circle-arrow-right'></i></Link>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4} xl={3} className='mb-2'>
                        <div className='jumbotron'>
                            <p className='branding'>Wallet <i className='fa-solid fa-wallet'></i></p>
                            <Show when={component === 'walletBalance'}>
                                <WalletHome onButtonClick={(): void => setComponent('lftSwap')} />
                            </Show>
                            <Show when={component === 'lftSwap'}>
                                <LFTSwap onButtonClick={(): void => setComponent('walletBalance')} />
                            </Show>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4} xl={3} className='mb-2'>
                        <div className='jumbotron'>
                            <p className='branding'>Transactions <i className='fa-solid fa-sack-dollar'></i></p>
                            <p className='display-6'>{transactions?.data?.transactions?.length}</p>
                            <p className='lead'>Buy LFT - {transactions?.data?.transactions?.filter((transaction: any) => transaction.transactionType === 'Buy').length}</p>
                            <p className='lead'>Sell LFT - {transactions?.data?.transactions?.filter((transaction: any) => transaction.transactionType === 'Sell').length}</p>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4} xl={3} className='mb-2'>
                        <div className='jumbotron'>
                            <p className='branding'>Account <i className='fa-solid fa-user-tie'></i></p>
                            <p className='lead'>Signed in as {userState.name}</p>
                            <button className='btn btn-block' onClick={signOutFromThisDevice}>Sign Out<i className='fa-solid fa-circle-arrow-right'></i></button><br />
                            <button className='btn btn-block' onClick={signOutFromAllDevices}>Sign Out From All Devices<i className='fa-solid fa-square-arrow-up-right'></i></button>
                        </div>
                    </Col>
                </Row>

            </Container>
            <Show when={!transactions.isLoading}>
                <Container>
                    <Show when={transactions?.data?.transactions?.length > 0}>
                        <p className='lead text-center text-white mb-4'>Transactions</p>
                        <Table responsive hover variant='light'>
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>LFT Amount</th>
                                    <th>ETH Amount</th>
                                    <th>Transaction Time</th>
                                    <th>EtherScan Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionsToDisplay}
                            </tbody>
                        </Table>
                    </Show>
                </Container>
            </Show>
            <Show when={transactions.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default DashboardPage