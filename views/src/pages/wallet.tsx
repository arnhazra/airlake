import { Container, Table } from 'react-bootstrap'
import { Fragment } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Loading from '@/components/LoadingComponent'
import ReactIf from '@/components/ReactIfComponent'
import moment from 'moment'
import endPoints from '@/constants/Endpoints'
import useTransactionData from '@/hooks/useTransactionData'
import Constants from '@/constants/Constants'

const WalletTransactionsPage: NextPage = () => {
    const transactions = useTransactionData()

    const transactionsToDisplay = transactions.transactions.map((tx: any) => {
        return (
            <tr key={tx._id}>
                <td>{tx.transactionType} LST</td>
                <td>{tx.lstAmount} LST</td>
                <td>{tx.ethAmount} ETH</td>
                <td>{moment(tx.date).format('MMM, Do YYYY, h:mm a')}</td>
                <td><a href={`${endPoints.etherScanEndpoint}/${tx.txHash}`} target='_blank' rel='noopener noreferrer' className='link-table'>View on EtherScan</a></td>
            </tr>
        )
    })

    return (
        <Fragment>
            <ReactIf condition={transactions.isLoaded}>
                <Container>
                    <div className='jumbotron mt-4 pl-5'>
                        <p className='display-4'>Wallet</p>
                        <div className='info'>
                            <p className='lead'>{Constants.Info}</p>
                            <p className='lead'>{Constants.Warning}</p>
                            <Link href='/buycoin' className='btn'>Buy LST<i className='fa-solid fa-circle-arrow-right'></i></Link>
                            <Link href='/sellcoin' className='btn'>Sell LST<i className='fa-solid fa-circle-arrow-right'></i></Link>
                        </div>
                    </div>
                    <ReactIf condition={transactions.transactions.length > 0}>
                        <Table responsive hover variant='dark'>
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>LST Amount</th>
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
            <ReactIf condition={!transactions.isLoaded}>
                <Loading />
            </ReactIf>
        </Fragment >
    )
}

export default WalletTransactionsPage