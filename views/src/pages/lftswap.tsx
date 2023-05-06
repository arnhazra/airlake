import { useState, useEffect } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Fragment } from 'react'
import ReactIf from '@/components/ReactIf'
import { tokenABI } from '@/contracts/LFTABI'
import { vendorABI } from '@/contracts/VendorABI'
import Web3 from 'web3'
import axios from 'axios'
import contractAddress from '@/constants/Address'
import endPoints from '@/constants/Endpoints'
import { toast } from 'react-hot-toast'
import { NextPage } from 'next'
import Constants from '@/constants/Constants'
declare const window: any
const web3 = new Web3(Web3.givenProvider)

const LFTSwapPage: NextPage = () => {
    const [tokens, setTokens] = useState('')
    const [ether, setEther] = useState(0)
    const [account, setAccount] = useState('')
    const [step, setStep] = useState(1)
    const [txError, setTxError] = useState(false)
    const [type, setType] = useState('')

    useEffect(() => {
        setEther(Number(tokens) / 10000)
    }, [tokens])

    const connectWallet = async (type: string) => {
        try {
            if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                    setAccount(accounts[0])
                    setType(type)
                } catch (err) {
                    toast.error(Constants.MetaMaskConnectionError)
                }
            } else {
                toast.error(Constants.MetamaskInstallNotification)
            }
        } catch (error) {
            toast.error(Constants.MetamaskInstallNotification)
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
                lftAmount: tokens,
                ethAmount: ether,
                txHash: request.transactionHash
            }
            await axios.post(endPoints.createTransactionEndpoint, obj)
            setStep(3)
            toast.success(Constants.TokenPurchaseSuccess)
        } catch (err) {
            setTxError(true)
            setStep(3)
            toast.error(Constants.TokenPurchaseFailure)
        }
    }

    const sellCoin = async () => {
        try {
            setStep(2)
            const accounts = await web3.eth.getAccounts()

            // Approve the contract to spend the tokens
            const tokenContract = new web3.eth.Contract(tokenABI as any, contractAddress.tokenContractAddress)
            let request = await tokenContract.methods.approve(contractAddress.vendorContractAddress, web3.utils.toWei(tokens, 'ether')).send({ from: accounts[0] })

            // Trigger the selling of tokens
            const vendor = new web3.eth.Contract(vendorABI as any, contractAddress.vendorContractAddress)
            request = await vendor.methods.sellTokens(web3.utils.toWei(tokens, 'ether')).send({ from: accounts[0] })

            const obj = {
                fromAddress: request.from || '0x',
                transactionType: 'Sell',
                lftAmount: tokens,
                ethAmount: ether,
                txHash: request.transactionHash
            }
            await axios.post(endPoints.createTransactionEndpoint, obj)
            setStep(3)
            toast.success(Constants.TokenSellSuccess)
        } catch (err) {
            setTxError(true)
            setStep(3)
            toast.error(Constants.TokenSellFailure)
        }
    }

    return (
        <Fragment>
            <div className='box'>
                <ReactIf condition={account === ''}>
                    <p className='branding'>Swap LFT</p>
                    <button className='btn btn-block' onClick={() => connectWallet('buy')}>Buy LFT<i className='fa-solid fa-circle-arrow-up'></i></button>
                    <button className='btn btn-block' onClick={() => connectWallet('sell')}>Sell LFT<i className='fa-solid fa-circle-arrow-down'></i></button>
                </ReactIf>
                <ReactIf condition={account !== ''}>
                    <ReactIf condition={type === 'buy'}>
                        <ReactIf condition={step === 1}>
                            <p className='branding'>Buy LFT</p>
                            <FloatingLabel controlId='floatingAmount' label='Amount of tokens'>
                                <Form.Control autoFocus type='email' placeholder='Amount of tokens' onChange={(e: any) => setTokens(e.target.value)} required />
                            </FloatingLabel>
                            <p id='alert'>ETH equivalent: {ether}</p>
                            <button className='btn btn-block' onClick={buyCoin}>Buy<i className='fa-solid fa-circle-arrow-right'></i></button>
                        </ReactIf>
                        <ReactIf condition={step === 2}>
                            <p className='branding'>Transaction Status</p>
                            <div className='text-center mt-4'>
                                <i className='fa-solid fa-circle-notch fa-spin text-center fa-4x color-gold'></i>
                                <p className='lead text-center mt-4'>Processing</p>
                            </div>
                        </ReactIf>
                        <ReactIf condition={step === 3}>
                            <p className='branding'>Transaction Status</p>
                            <ReactIf condition={!txError}>
                                <div className='text-center'>
                                    <i className='fa-solid fa-circle-check fa-4x'></i>
                                    <p className='lead text-center mt-4'>Success</p>
                                </div>
                            </ReactIf>
                            <ReactIf condition={txError}>
                                <div className='text-center'>
                                    <i className='fa-solid fa-circle-xmark fa-4x'></i>
                                    <p className='lead text-center mt-4'>Failed</p>
                                </div>
                            </ReactIf>
                        </ReactIf>
                    </ReactIf>
                    <ReactIf condition={type === 'sell'}>
                        <ReactIf condition={step === 1}>
                            <p className='branding'>Sell LFT</p>
                            <FloatingLabel controlId='floatingAmount' label='Amount of tokens'>
                                <Form.Control autoFocus type='email' placeholder='Amount of tokens' onChange={(e: any) => setTokens(e.target.value)} required />
                            </FloatingLabel>
                            <p id='alert'>ETH equivalent: {ether}</p>
                            <button className='btn btn-block' onClick={sellCoin}>Sell<i className='fa-solid fa-circle-arrow-right'></i></button>
                        </ReactIf>
                        <ReactIf condition={step === 2}>
                            <p className='branding'>Transaction Status</p>
                            <div className='text-center mt-4'>
                                <i className='fa-solid fa-circle-notch fa-spin text-center fa-4x color-gold'></i>
                                <p className='lead text-center mt-4'>Processing</p>
                            </div>
                        </ReactIf>
                        <ReactIf condition={step === 3}>
                            <p className='branding'>Transaction Status</p>
                            <ReactIf condition={!txError}>
                                <div className='text-center'>
                                    <i className='fa-solid fa-circle-check fa-4x'></i>
                                    <p className='lead text-center mt-4'>Success</p>
                                </div>
                            </ReactIf>
                            <ReactIf condition={txError}>
                                <div className='text-center'>
                                    <i className='fa-solid fa-circle-xmark fa-4x'></i>
                                    <p className='lead text-center mt-4'>Failed</p>
                                </div>
                            </ReactIf>
                        </ReactIf>
                    </ReactIf>
                </ReactIf>
            </div>
        </Fragment>
    )
}

export default LFTSwapPage