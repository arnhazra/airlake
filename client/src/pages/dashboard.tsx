import { Fragment, useContext, useState, useEffect } from 'react'
import { AppContext } from '@/context/appStateProvider'
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
import Web3 from 'web3'
import contractAddress from '@/constants/Address'
import jwtDecode from 'jwt-decode'

const DashboardPage: NextPage = () => {
    const web3Provider = new Web3(endPoints.infuraEndpoint)
    const [{ userState }] = useContext(AppContext)
    const [etherBalance, setEther] = useState('0')
    const [walletLoading, setWalletLoading] = useState(true)
    const [accountAddress, setAccountAddress] = useState('')
    const router = useRouter()
    const transactions = useFetchRealtime('transactions', endPoints.getTransactionsEndpoint, HTTPMethods.POST)
    const [tokenId, setTokenId] = useState('')
    const [expiry, setExpiry] = useState(0)

    useEffect(() => {
        try {
            const decodedSubId: any = jwtDecode(userState.subscriptionKey)
            setTokenId(decodedSubId.tokenId)
            console.log(decodedSubId)
            setExpiry(decodedSubId.exp)
        } catch (error) {
            setTokenId('')
        }
    }, [userState.subscriptionKey])

    useEffect(() => {
        (async () => {
            try {
                const { privateKey } = userState
                const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
                setAccountAddress(walletAddress)
                const ethBalanceInWei = await web3Provider.eth.getBalance(walletAddress)
                const ethBalance = web3Provider.utils.fromWei(ethBalanceInWei, 'ether')
                setEther(ethBalance)
                setWalletLoading(false)
            } catch (error) {
                setWalletLoading(false)
                toast.error(Constants.ErrorMessage)
            }
        })()
    }, [userState])

    const signOut = async () => {
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
                <td>{tx.transactionType}</td>
                <td>{tx.ethAmount} MATIC</td>
                <td>{moment(tx.date).format('MMM, Do YYYY, h:mm a')}</td>
                <td><a href={`${endPoints.polygonScanEndpoint}/${tx.txHash}`} target='_blank' rel='noopener noreferrer' className='link-table'>View on Polygonscan</a></td>
            </tr>
        )
    })

    const showWalletAddress = (address: string) => {
        const displayAddress = `(${address.substring(0, 4)}...${address.substring(address.length - 4)})`
        return displayAddress
    }

    const copyWalletAddress = (): void => {
        navigator.clipboard.writeText(`${accountAddress}`)
        toast.success('Copied to Clipboard')
    }

    return (
        <Fragment>
            <Show when={!transactions.isLoading && !walletLoading}>
                <Container>
                    <Row className='mt-4'>
                        <Col xs={12} sm={6} md={6} lg={4} xl={4} className='mb-2'>
                            <div className='jumbotron'>
                                <p className='branding'>Subscription <i className='fa-solid fa-circle-plus'></i></p>
                                <p className='smalltext'>Active plan {userState.subscriptionKey.length > 0 && `valid till ${moment.unix(expiry).format('DD MMM, YYYY')}`}</p>
                                <h4>
                                    {userState.subscriptionKey.length === 0 ? 'FREE' : 'PRO '}
                                    <Show when={userState.subscriptionKey.length > 0}>
                                        <Link title='Access NFT' target='_blank' passHref href={`https://mumbai.polygonscan.com/token/${contractAddress.nftContractAddress}?a=${tokenId}`}>
                                            <i className="fa-solid fa-cubes"></i>
                                        </Link>
                                    </Show>
                                </h4>
                                <Link className='btn btn-block' href={'/subscribe'}>View Benefits <i className='fa-solid fa-circle-arrow-right'></i></Link>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={4} xl={4} className='mb-2'>
                            <div className='jumbotron'>
                                <p className='branding'>Wallet <i className='fa-solid fa-wallet'></i></p>
                                <p className='smalltext' title={accountAddress}>Address : {showWalletAddress(accountAddress)}<i className='fa-solid fa-copy' onClick={copyWalletAddress}></i></p>
                                <h4>
                                    <i className='fa-brands fa-ethereum'></i>{Number(etherBalance).toFixed(3)} MATIC
                                </h4>
                                <Link className='btn btn-block' href={'https://faucet.polygon.technology/'} passHref target='_blank'>Fund my wallet<i className='fa-solid fa-circle-arrow-right'></i></Link>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={4} xl={4} className='mb-2'>
                            <div className='jumbotron'>
                                <p className='branding'>Account <i className='fa-solid fa-address-card'></i></p>
                                <p className='smalltext'>Signed in As</p>
                                <h4>{userState.name}</h4>
                                <button className='btn btn-block' onClick={signOut}>Sign Out<i className='fa-solid fa-circle-arrow-right'></i></button><br />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Show when={transactions?.data?.transactions?.length > 0}>
                        <p className='lead text-center text-white mb-4'>Transactions</p>
                        <Table responsive hover variant='light'>
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>MATIC Amount</th>
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
            <Show when={transactions.isLoading || walletLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default DashboardPage