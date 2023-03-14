import { useState, useEffect } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Fragment } from 'react'
import ReactIf from '../components/ReactIfComponent'
import { vendorABI } from '../contracts/VendorABI'
import Web3 from 'web3'
import axios from 'axios'
import contractAddress from '../constants/Address'
import endPoints from '../constants/Endpoints'
import { toast } from 'react-hot-toast'
import { NextPage } from 'next'
declare const window: any
const web3 = new Web3(Web3.givenProvider)

const BuyCoinPage: NextPage = () => {
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
                    toast.error('Unable to connect to metamask')
                }
            } else {
                toast.error('Please install metamask')
            }
        } catch (error) {
            toast.error('Please install metamask')
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
                lstAmount: tokens,
                ethAmount: ether,
                txHash: request.transactionHash
            }
            await axios.post(endPoints.createTxEndpoint, obj)
            setStep(3)
            toast.success('You have successfully bought LST tokens!')
        } catch (err) {
            setTxError(true)
            setStep(3)
            toast.error('Error purchasing LST tokens')
        }
    }

    return (
        <Fragment>
            <div className='box'>
                <ReactIf condition={account !== ''}>
                    <ReactIf condition={step === 1}>
                        <p className='branding'>Buy LST</p>
                        <FloatingLabel controlId='floatingAmount' label='Amount of tokens'>
                            <Form.Control autoFocus type='email' placeholder='Amount of tokens' onChange={(e: any) => setTokens(e.target.value)} required />
                        </FloatingLabel>
                        <p id='alert'>ETH equivalent: {ether}</p>
                        <button className='btn btnbox' onClick={buyCoin}>Buy<i className='fa-solid fa-circle-arrow-right'></i></button>
                    </ReactIf>
                    <ReactIf condition={step === 2}>
                        <p className='branding'>Transaction Status</p>
                        <div className='text-center mt-4'>
                            <i className='fa-solid fa-circle-notch fa-spin text-center fa-6x'></i>
                            <p className='lead text-center mt-4'>Processing</p>
                        </div>
                    </ReactIf>
                    <ReactIf condition={step === 3}>
                        <p className='branding'>Transaction Status</p>
                        <ReactIf condition={!txError}>
                            <div className='text-center'>
                                <i className='fa-solid fa-circle-check fa-6x'></i>
                                <p className='lead text-center mt-4'>Success</p>
                            </div>
                        </ReactIf>
                        <ReactIf condition={txError}>
                            <div className='text-center'>
                                <i className='fa-solid fa-circle-xmark fa-6x'></i>
                                <p className='lead text-center mt-4'>Failed</p>
                            </div>
                        </ReactIf>
                    </ReactIf>
                </ReactIf>
                <ReactIf condition={account === ''}>
                    <p className='branding'>Connect Wallet</p>
                    <button className='btn btnbox' onClick={connectWallet}>Connect to Metamask<i className='fa-solid fa-circle-arrow-right'></i></button>
                </ReactIf>
            </div>
        </Fragment>
    )
}

export default BuyCoinPage