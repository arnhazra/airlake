import { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Fragment } from 'react'
import NavComponent from '../components/NavComponent'
import LoadingComponent from '../components/Loading'
import ReactIfComponent from '../components/ReactIf'
import { tokenABI } from '../contracts/TokenABI'
import { vendorABI } from '../contracts/VendorABI'
import Web3 from 'web3'
import Snackbar from 'node-snackbar'
import axios from 'axios'
import moment from 'moment'
import contractAddress from '../constants/Address'
import endPoints from '../constants/Endpoints'
import useTransactionData from '../hooks/useTransactionData'
import useLivePrice from '../hooks/useLivePrice'
import { Link } from 'react-router-dom'
import Constants from '../constants/Constants'
declare const window: any
const web3 = new Web3(Web3.givenProvider)

const WalletTransactionsPage = () => {
    const transactions = useTransactionData()
    const liveprice = useLivePrice()

    const transactionsToDisplay = transactions.transactions.map((tx: any) => {
        return (
            <tr key={tx._id}>
                <td>{tx.transactionType} FLT</td>
                <td>{tx.fltAmount} FLT</td>
                <td>{tx.ethAmount} ETH</td>
                <td>{moment(tx.date).format('MMM, Do YYYY, h:mm a')}</td>
                <td><a href={`${endPoints.etherScanEndpoint}/${tx.txHash}`} target='_blank' rel='noopener noreferrer'>View on EtherScan</a></td>
            </tr>
        )
    })

    return (
        <Fragment>
            <ReactIfComponent condition={transactions.isLoaded && liveprice.isLoaded}>
                <NavComponent />
                <Container>
                    <div className='jumbotron mt-4 pl-5'>
                        <p className='display-6 fw-bold'>Wallet</p>
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
                                        <td>FLT</td>
                                        < td > {(liveprice.inr / 10000).toFixed(3)}</td>
                                        <td>{(liveprice.usd / 10000).toFixed(3)}</td>
                                        <td>{(liveprice.eur / 10000).toFixed(3)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className='info'>
                            <p className='lead'>{Constants.Info}</p>
                            <p className='lead'>{Constants.Warning}</p>
                            <Link to='/wallet/buy' className='btn'>Buy FLT<i className='fa-solid fa-circle-arrow-right'></i></Link>
                            <Link to='/wallet/sell' className='btn'>Sell FLT<i className='fa-solid fa-circle-arrow-right'></i></Link>
                        </div>
                    </div>

                    <Table responsive hover variant='light'>
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>FLT Amount</th>
                                <th>ETH Amount</th>
                                <th>Transaction Time</th>
                                <th>EtherScan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionsToDisplay}
                        </tbody>
                    </Table>
                </Container>
            </ReactIfComponent>
            <ReactIfComponent condition={!transactions.isLoaded || !liveprice.isLoaded}>
                <LoadingComponent />
            </ReactIfComponent>
        </Fragment >
    )
}

const BuyCoin = () => {
    const [tokens, setTokens] = useState('')
    const [ether, setEther] = useState(0)
    const [account, setAccount] = useState('')
    const [step, setStep] = useState(1)
    const [txError, setTxError] = useState(false)

    useEffect(() => {
        setEther(Number(tokens) / 10000)
    }, [tokens])

    const connectWallet = async () => {
        try {
            if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                    setAccount(accounts[0])
                } catch (err) {
                    Snackbar.show({ text: 'Unable to connect to metamask' })
                }
            } else {
                Snackbar.show({ text: 'Please install metamask' })
            }
        } catch (error) {
            Snackbar.show({ text: 'Please install metamask' })
        }
    }

    const buyCoin = async () => {
        try {
            setStep(2)
            const vendor = new web3.eth.Contract(vendorABI as any, contractAddress.vendorContractAddress)
            const request = await vendor.methods.buyTokens().send({
                from: account,
                value: web3.utils.toWei(ether.toString(), 'ether'),
            })
            const obj = {
                fromAddress: request.from || '0x',
                transactionType: 'Buy',
                fltAmount: tokens,
                ethAmount: ether,
                txHash: request.transactionHash
            }
            await axios.post(endPoints.createTxEndpoint, obj)
            setStep(3)
            Snackbar.show({ text: 'You have successfully bought FLT tokens!' })
        } catch (err) {
            setTxError(true)
            setStep(3)
            Snackbar.show({ text: 'Error purchasing FLT tokens' })
        }
    }

    return (
        <Fragment>
            <NavComponent />
            <div className='box'>
                <ReactIfComponent condition={account !== ''}>
                    <ReactIfComponent condition={step === 1}>
                        <p className='branding'>Buy FLT</p>
                        <input type='number' placeholder='Amount of tokens' required className='exchange__textBox' onChange={(e) => setTokens(e.target.value)} />
                        <p id='alert'>ETH equivalent: {ether}</p>
                        <button className='btn btnbox' onClick={buyCoin}>Buy<i className='fa-solid fa-circle-arrow-right'></i></button>
                    </ReactIfComponent>
                    <ReactIfComponent condition={step === 2}>
                        <p className='branding'>Transaction Status</p>
                        <div className='text-center mt-4'>
                            <i className='fa-solid fa-circle-notch fa-spin text-center fa-6x'></i>
                            <p className='lead text-center mt-4'>Processing</p>
                        </div>
                    </ReactIfComponent>
                    <ReactIfComponent condition={step === 3}>
                        <p className='branding'>Transaction Status</p>
                        <ReactIfComponent condition={!txError}>
                            <div className='text-center'>
                                <i className='fa-solid fa-circle-check fa-6x'></i>
                                <p className='lead text-center mt-4'>Success</p>
                            </div>
                        </ReactIfComponent>
                        <ReactIfComponent condition={txError}>
                            <div className='text-center'>
                                <i className='fa-solid fa-circle-xmark fa-6x'></i>
                                <p className='lead text-center mt-4'>Failed</p>
                            </div>
                        </ReactIfComponent>
                    </ReactIfComponent>
                </ReactIfComponent>
                <ReactIfComponent condition={account === ''}>
                    <p className='branding'>Connect Wallet</p>
                    <button className='btn btnbox' onClick={connectWallet}>Connect to Metamask<i className='fa-solid fa-circle-arrow-right'></i></button>
                </ReactIfComponent>
            </div>
        </Fragment>
    )
}

const SellCoin = () => {
    const [tokens, setTokens] = useState('')
    const [ether, setEther] = useState(0)
    const [account, setAccount] = useState('')
    const [step, setStep] = useState(1)
    const [txError, setTxError] = useState(false)

    useEffect(() => {
        setEther(Number(tokens) / 10000)
    }, [tokens])

    const connectWallet = async () => {
        try {
            if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                    setAccount(accounts[0])
                } catch (err) {
                    Snackbar.show({ text: 'Unable to connect to metamask' })
                }
            } else {
                Snackbar.show({ text: 'Please install metamask' })
            }
        } catch (error) {
            Snackbar.show({ text: 'Please install metamask' })
        }
    }

    const sellCoin = async () => {
        try {
            setStep(2)
            const accounts = await web3.eth.getAccounts()
            const tokenContract = new web3.eth.Contract(tokenABI as any, contractAddress.tokenContractAddress)

            // Approve the contract to spend the tokens
            let request = await tokenContract.methods.approve(contractAddress.vendorContractAddress, web3.utils.toWei(tokens, 'ether')).send({ from: accounts[0] })

            // Trigger the selling of tokens
            const vendor = new web3.eth.Contract(vendorABI as any, contractAddress.vendorContractAddress)
            request = await vendor.methods.sellTokens(web3.utils.toWei(tokens, 'ether')).send({ from: accounts[0] })

            const obj = {
                fromAddress: request.from || '0x',
                transactionType: 'Sell',
                fltAmount: tokens,
                ethAmount: ether,
                txHash: request.transactionHash
            }
            await axios.post(endPoints.createTxEndpoint, obj)
            setStep(3)
            Snackbar.show({ text: 'You have successfully bought FLT tokens!' })
        } catch (err) {
            setTxError(true)
            setStep(3)
            Snackbar.show({ text: 'Error selling FLT tokens' })
        }
    }

    return (
        <Fragment>
            <NavComponent />
            <div className='box'>
                <ReactIfComponent condition={account !== ''}>
                    <ReactIfComponent condition={step === 1}>
                        <p className='branding'>Sell FLT</p>
                        <input type='number' placeholder='Amount of tokens' required className='exchange__textBox' onChange={(e) => setTokens(e.target.value)} />
                        <p id='alert'>ETH equivalent: {ether}</p>
                        <button className='btn btnbox' onClick={sellCoin}>Sell<i className='fa-solid fa-circle-arrow-right'></i></button>
                    </ReactIfComponent>
                    <ReactIfComponent condition={step === 2}>
                        <p className='branding'>Transaction Status</p>
                        <div className='text-center mt-4'>
                            <i className='fa-solid fa-circle-notch fa-spin text-center fa-6x'></i>
                            <p className='lead text-center mt-4'>Processing</p>
                        </div>
                    </ReactIfComponent>
                    <ReactIfComponent condition={step === 3}>
                        <p className='branding'>Transaction Status</p>
                        <ReactIfComponent condition={!txError}>
                            <div className='text-center'>
                                <i className='fa-solid fa-circle-check fa-6x'></i>
                                <p className='lead text-center mt-4'>Success</p>
                            </div>
                        </ReactIfComponent>
                        <ReactIfComponent condition={txError}>
                            <div className='text-center'>
                                <i className='fa-solid fa-circle-xmark fa-6x'></i>
                                <p className='lead text-center mt-4'>Failed</p>
                            </div>
                        </ReactIfComponent>
                    </ReactIfComponent>
                </ReactIfComponent>
                <ReactIfComponent condition={account === ''}>
                    <p className='branding'>Connect Wallet</p>
                    <button className='btn btnbox' onClick={connectWallet}>Connect to Metamask<i className='fa-solid fa-circle-arrow-right'></i></button>
                </ReactIfComponent>
            </div>
        </Fragment>
    )
}

export { WalletTransactionsPage, BuyCoin, SellCoin } 