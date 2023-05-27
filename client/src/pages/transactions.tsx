import Loading from '@/components/Loading'
import Show from '@/components/Show'
import endPoints from '@/constants/Endpoints'
import HTTPMethods from '@/constants/HTTPMethods'
import useFetchRealtime from '@/hooks/useFetchRealtime'
import moment from 'moment'
import { Fragment } from 'react'
import { Container, Table } from 'react-bootstrap'

const TokenTransactions = () => {
    const transactions = useFetchRealtime('transactions', endPoints.getTransactionsEndpoint, HTTPMethods.POST)

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
            <Show when={!transactions.isLoading}>
                <Container>
                    <Show when={transactions?.data?.transactions?.length === 0}>
                        <div className='box text-center'>
                            <p className='branding mb-4'>No Transactions</p>
                            <i className='fa-solid fa-circle-exclamation fa-4x'></i><br /><br />
                        </div>
                    </Show>
                    <Show when={transactions?.data?.transactions?.length > 0}>
                        <p className='lead text-center text-white mb-4 mt-4'>Transactions</p>
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
        </Fragment >
    )
}

export default TokenTransactions
