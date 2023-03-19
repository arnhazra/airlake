import { Container, Table } from 'react-bootstrap'
import { Fragment } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Loading from '@/components/LoadingComponent'
import ReactIf from '@/components/ReactIfComponent'
import moment from 'moment'
import endPoints from '@/constants/Endpoints'
import useTransactionData from '@/hooks/useTransactionData'
import useLivePrice from '@/hooks/useLivePrice'
import Constants from '@/constants/Constants'

const WalletTransactionsPage: NextPage = () => {
    const transactions = useTransactionData()
    const liveprice = useLivePrice()

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
            <ReactIf condition={transactions.isLoaded && liveprice.isLoaded}>
                <Container>
                    <div className='jumbotron mt-4 pl-5'>
                        <p className='display-4'>Wallet</p>
                        <div key={'liveprice'}>
                            <Table responsive hover variant='light'>
                                <thead>
                                    <tr>
                                        <th>Crypto</th>
                                        <th>INR</th>
                                        <th>USD</th>
                                        <th>EUR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ETH</td>
                                        <td>{liveprice.inr}</td>
                                        <td>{liveprice.usd}</td>
                                        <td>{liveprice.eur}</td>
                                    </tr>
                                    <tr>
                                        <td>LST</td>
                                        <td>{(liveprice.inr / 10000).toFixed(3)}</td>
                                        <td>{(liveprice.usd / 10000).toFixed(3)}</td>
                                        <td>{(liveprice.eur / 10000).toFixed(3)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className='info'>
                            <p className='lead'>{Constants.Info}</p>
                            <p className='lead'>{Constants.Warning}</p>
                            <Link href='/buycoin' className='btn'>Buy LST<i className='fa-solid fa-circle-arrow-right'></i></Link>
                            <Link href='/sellcoin' className='btn'>Sell LST<i className='fa-solid fa-circle-arrow-right'></i></Link>
                        </div>
                    </div>
                    <ReactIf condition={transactions.transactions.length > 0}>
                        <Table responsive hover variant='light'>
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
            <ReactIf condition={!transactions.isLoaded || !liveprice.isLoaded}>
                <Loading />
            </ReactIf>
        </Fragment >
    )
}

export default WalletTransactionsPage