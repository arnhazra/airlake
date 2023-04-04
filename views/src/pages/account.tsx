import { Fragment, useContext } from 'react'
import { GlobalContext } from '@/context/globalStateProvider'
import { NextPage } from 'next'
import moment from 'moment'
import endPoints from '@/constants/Endpoints'
import ReactIf from '@/components/ReactIfComponent'
import { Container, Table } from 'react-bootstrap'
import Constants from '@/constants/Constants'
import Link from 'next/link'
import Loading from '@/components/LoadingComponent'
import useFetchRealtime from '@/hooks/useFetchRealtime'
import HTTPMethods from '@/constants/HTTPMethods'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const AccountPage: NextPage = () => {
    const [{ userState }] = useContext(GlobalContext)
    const router = useRouter()
    const transactions = useFetchRealtime('transactions', endPoints.getTransactionsEndpoint, HTTPMethods.POST)

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
                <td>{tx.transactionType} ELT</td>
                <td>{tx.eltAmount} ELT</td>
                <td>{tx.ethAmount} ETH</td>
                <td>{moment(tx.date).format('MMM, Do YYYY, h:mm a')}</td>
                <td><a href={`${endPoints.etherScanEndpoint}/${tx.txHash}`} target='_blank' rel='noopener noreferrer' className='link-table'>View on EtherScan</a></td>
            </tr>
        )
    })

    return (
        <Fragment>
            <ReactIf condition={!transactions.isLoading}>
                <Container>
                    <div className='jumbotron mt-4 pl-5'>
                        <p className='display-6'>Account</p>
                        <div className='info'>
                            <p className='lead'>Signed in as {userState.name}</p>
                            <p className='lead'>{Constants.Info}</p>
                            <p className='lead'>{Constants.Warning}</p>
                            <Link href='/eltswap' className='btn chip'>Swap ELT<i className='fa-solid fa-circle-arrow-right'></i></Link>
                            <button className='btn chip ' onClick={signOutFromThisDevice}>Sign Out<i className='fa-solid fa-circle-arrow-right'></i></button><br />
                            <button className='btn chip ' onClick={signOutFromAllDevices}>Sign Out From All Devices<i className='fa-solid fa-circle-arrow-right'></i></button>
                        </div>
                    </div>
                    <ReactIf condition={transactions?.data?.transactions?.length > 0}>
                        <p className='lead text-center text-white mb-4'>Transactions</p>
                        <Table responsive hover variant='dark'>
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>ELT Amount</th>
                                    <th>ETH Amount</th>
                                    <th>Transaction Time</th>
                                    <th>EtherScan Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionsToDisplay}
                            </tbody>
                        </Table>
                    </ReactIf>
                </Container>
            </ReactIf>
            <ReactIf condition={transactions.isLoading}>
                <Loading />
            </ReactIf>
        </Fragment >
    )
}

export default AccountPage