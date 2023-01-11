import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Fragment } from 'react'
import NavComponent from '../components/NavComponent'
import useAuth from '../hooks/useAuth'
import Constants from '../constants/Constants'
import LoadingComponent from '../components/LoadingComponent'
import ReactIfComponent from '../components/ReactIfComponent'
import { tokenABI } from '../contracts/TokenABI'
import { vendorABI } from '../contracts/VendorABI'
import Web3 from 'web3'
import CardComponent from '../components/CardComponent'
import Snackbar from 'node-snackbar'
import axios from 'axios'
import moment from 'moment'
import { walletDashBoardService } from '../services/WalletService'
import contractAddress from '../constants/Address'
import endPoints from '../constants/Endpoints'
declare const window: any
const web3 = new Web3(Web3.givenProvider)

//Wallet Dashboard Page
const WalletDashboardPage = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [state, setState] = useState({ transactions: [], isLoaded: false })

    const getDashBoardData = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken') as string
            const response = await walletDashBoardService(accessToken)
            setState({ ...state, transactions: response.data.transactions, isLoaded: true })
        }

        catch (error: any) {
            if (error.response) {
                if (error.response.status === 401) {
                    localStorage.removeItem('accessToken')
                    navigate('/')
                }

                else {
                    Snackbar.show({ text: error.response.data.msg })
                }
            }
        }
    }

    useEffect(() => {
        getDashBoardData()
    }, [])

    const transactionsToDisplay = state.transactions.map((transaction: any) => {
        return <CardComponent
            key={transaction._id}
            header={transaction.flgAmount + ' FLG'}
            body={[<div key={transaction._id}><p>Transaction Type : {transaction.transactionType} FLG</p><p>ETH : {transaction.ethAmount}</p><p>Created on : {moment(transaction.date).format('MMM, Do YYYY, h:mm a')}</p></div>]}
            footer={[<a key={transaction._id} rel='noopener noreferrer' target='_blank' href={`https://goerli.etherscan.io/tx/${transaction.txHash}`} className='mt-auto btn'>View on EtherScan<i className='fa-solid fa-circle-arrow-right'></i></a>]}
        />
    })

    //JSX
    return (
        <Fragment>
            <ReactIfComponent condition={auth.isLoaded}>
                <NavComponent />
                <Container>
                    <Row className='mt-4 mb-4'>
                        <CardComponent
                            key={'userinfo'}
                            header={'Hi, ' + auth.name.split(' ')[0]}
                            body={[<div key={'userinfo'}><p>{Constants.HomeIntro3}</p><p>{Constants.CurrentRate}</p></div>]}
                            footer={[<Link key={'userinfo'} to='/wallet/buy' className='btn'>Buy FLG<i className='fa-solid fa-circle-arrow-right'></i></Link>]}
                        />
                        <CardComponent
                            key={'info'}
                            header={'Info'}
                            body={[<div key={'info'}><p>{Constants.Info}</p></div>]}
                            footer={[<Link key={'info'} to='/wallet/sell' className='btn'>Sell FLG<i className='fa-solid fa-circle-arrow-right'></i></Link>]}
                        />
                        <CardComponent
                            key={'warning'}
                            header={<>Warning<i className='fa-solid fa-triangle-exclamation'></i></>}
                            body={[<div key={'warning'} className='warning'><p>{Constants.Warning}</p></div>]}
                            footer={[<a key={'warning'} target='_blank' rel='noopener noreferrer' href='https://goerli-faucet.pk910.de/' className='btn'>Mine ETH<i className='fa-solid fa-circle-arrow-right'></i></a>]}
                        />
                    </Row>

                    <Row className='mt-4 mb-4'>
                        {transactionsToDisplay}
                    </Row>
                </Container>
            </ReactIfComponent>
            <ReactIfComponent condition={!auth.isLoaded}>
                <LoadingComponent />
            </ReactIfComponent>
        </Fragment>
    )
}

//Buy Coin Page
const BuyCoin = () => {
    const auth = useAuth()
    const [tokens, setTokens] = useState('')
    const [ether, setEther] = useState(0)
    const [account, setAccount] = useState('')
    const [step, setStep] = useState(1)
    const [pinErr, setPinErr] = useState('')
    const [txError, setTxError] = useState(false)

    useEffect(() => {
        setEther(Number(tokens) / 100000)
    }, [tokens])

    const connectWallet = async () => {
        try {
            setPinErr('')
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
            setPinErr('Metamask Error')
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
                flgAmount: tokens,
                ethAmount: ether,
                txHash: request.transactionHash
            }
            await axios.post(endPoints.createTxEndpoint, obj)
            setStep(3)
            Snackbar.show({ text: 'You have successfully bought FLG tokens!' })
        } catch (err) {
            setTxError(true)
            setStep(3)
            Snackbar.show({ text: 'Error purchasing FLG tokens' })
        }
    }

    return (
        <Fragment>
            <ReactIfComponent condition={auth.isLoaded}>
                <NavComponent />
                <div className='box'>
                    <ReactIfComponent condition={account !== ''}>
                        <ReactIfComponent condition={step === 1}>
                            <p className='branding'>Buy FLG</p>
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
            </ReactIfComponent>
            <ReactIfComponent condition={!auth.isLoaded}>
                <LoadingComponent />
            </ReactIfComponent>
        </Fragment>
    )
}

//Sell Coin Page
const SellCoin = () => {
    const auth = useAuth()
    const [tokens, setTokens] = useState('')
    const [ether, setEther] = useState(0)
    const [account, setAccount] = useState('')
    const [step, setStep] = useState(1)
    const [pinErr, setPinErr] = useState('')
    const [txError, setTxError] = useState(false)

    useEffect(() => {
        setEther(Number(tokens) / 100000)
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
            setPinErr('Metamask Error')
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
                flgAmount: tokens,
                ethAmount: ether,
                txHash: request.transactionHash
            }
            await axios.post(endPoints.createTxEndpoint, obj)
            setStep(3)
            Snackbar.show({ text: 'You have successfully bought FLG tokens!' })
        } catch (err) {
            setTxError(true)
            setStep(3)
            Snackbar.show({ text: 'Error purchasing FLG tokens' })
        }
    }

    return (
        <Fragment>
            <ReactIfComponent condition={auth.isLoaded}>
                <NavComponent />
                <div className='box'>
                    <ReactIfComponent condition={account !== ''}>
                        <ReactIfComponent condition={step === 1}>
                            <p className='branding'>Sell FLG</p>
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
            </ReactIfComponent>
            <ReactIfComponent condition={!auth.isLoaded}>
                <LoadingComponent />
            </ReactIfComponent>
        </Fragment>
    )
}

export { WalletDashboardPage, BuyCoin, SellCoin } 