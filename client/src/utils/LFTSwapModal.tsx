import React, { FC, useEffect, useState, useContext } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Fragment } from 'react'
import Show from '@/components/Show'
import { tokenABI } from '@/contracts/LFTABI'
import { vendorABI } from '@/contracts/VendorABI'
import Web3 from 'web3'
import axios from 'axios'
import contractAddress from '@/constants/Address'
import endPoints from '@/constants/Endpoints'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/Constants'
import { GlobalContext } from '@/context/globalStateProvider'
import { Modal } from 'react-bootstrap'

interface LFTSwapModalProps {
    isOpened: boolean,
    closeModal: () => void
}

const LFTSwapModal: FC<LFTSwapModalProps> = ({ isOpened, closeModal }) => {
    const web3Provider = new Web3(endPoints.infuraEndpoint)
    const [tokens, setTokens] = useState('')
    const [ether, setEther] = useState(0)
    const [step, setStep] = useState(1)
    const [txError, setTxError] = useState(false)
    const [type, setType] = useState('swap')
    const [{ userState }] = useContext(GlobalContext)

    useEffect(() => {
        setEther(Number(tokens) / 10000)
    }, [tokens])

    const buyCoin = async () => {
        try {
            setStep(2)
            const { privateKey } = userState
            const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
            const vendor = new web3Provider.eth.Contract(vendorABI as any, contractAddress.vendorContractAddress)
            const gasPrice = await web3Provider.eth.getGasPrice()
            const weiValue = web3Provider.utils.toWei(ether.toString(), 'ether')

            const transaction = {
                from: walletAddress,
                to: vendor.options.address,
                value: weiValue,
                gas: await vendor.methods.buyTokens().estimateGas({ from: walletAddress, value: weiValue }),
                gasPrice: gasPrice,
                data: vendor.methods.buyTokens().encodeABI(),
            }

            const signedTransaction = await web3Provider.eth.accounts.signTransaction(transaction, privateKey)
            if (signedTransaction.rawTransaction) {
                const receipt = await web3Provider.eth.sendSignedTransaction(signedTransaction.rawTransaction)
                const txObj = {
                    fromAddress: receipt.from,
                    transactionType: 'Buy',
                    lftAmount: tokens,
                    ethAmount: ether,
                    txHash: receipt.transactionHash
                }
                await axios.post(endPoints.createTransactionEndpoint, txObj)
                setStep(3)
                toast.success(Constants.TokenPurchaseSuccess)
            }
        } catch (err) {
            setTxError(true)
            setStep(3)
            toast.error(Constants.TokenPurchaseFailure)
        }
    }

    const sellCoin = async () => {
        try {
            setStep(2)
            const { privateKey } = userState
            const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
            const gasPrice = await web3Provider.eth.getGasPrice()

            const tokenContract = new web3Provider.eth.Contract(tokenABI as any, contractAddress.tokenContractAddress)
            const approvalData = tokenContract.methods.approve(contractAddress.vendorContractAddress, web3Provider.utils.toWei(tokens, 'ether')).encodeABI()
            const approvalTx = {
                from: walletAddress,
                to: contractAddress.tokenContractAddress,
                data: approvalData,
                gasPrice: gasPrice,
                gas: await tokenContract.methods.approve(contractAddress.vendorContractAddress, web3Provider.utils.toWei(tokens, 'ether')).estimateGas({ from: walletAddress })
            }

            const signedApprovalTx = await web3Provider.eth.accounts.signTransaction(approvalTx, privateKey)
            if (signedApprovalTx.rawTransaction) {
                await web3Provider.eth.sendSignedTransaction(signedApprovalTx.rawTransaction)
            }

            const vendor = new web3Provider.eth.Contract(vendorABI as any, contractAddress.vendorContractAddress)
            const sellData = vendor.methods.sellTokens(web3Provider.utils.toWei(tokens, 'ether')).encodeABI()
            const sellTx = {
                from: walletAddress,
                to: contractAddress.vendorContractAddress,
                data: sellData,
                gasPrice: gasPrice,
                gas: await vendor.methods.sellTokens(web3Provider.utils.toWei(tokens, 'ether')).estimateGas({ from: walletAddress })
            }

            const signedSellTx = await web3Provider.eth.accounts.signTransaction(sellTx, privateKey)
            if (signedSellTx.rawTransaction) {
                const sellReceipt = await web3Provider.eth.sendSignedTransaction(signedSellTx.rawTransaction)

                const obj = {
                    fromAddress: sellReceipt.from,
                    transactionType: 'Sell',
                    lftAmount: tokens,
                    ethAmount: ether,
                    txHash: sellReceipt.transactionHash
                }
                await axios.post(endPoints.createTransactionEndpoint, obj)
                setStep(3)
                toast.success(Constants.TokenSellSuccess)
            }
        } catch (err) {
            setTxError(true)
            setStep(3)
            toast.error(Constants.TokenSellFailure)
        }
    }

    return (
        <>
            <Modal centered show={isOpened} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>LFT Swap</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <Fragment>
                        <Show when={type === 'swap'}>
                            <button className='btn ' onClick={() => setType('buy')}>Buy LFT<i className='fa-solid fa-circle-arrow-up'></i></button>
                            <button className='btn ' onClick={() => setType('sell')}>Sell LFT<i className='fa-solid fa-circle-arrow-down'></i></button>
                        </Show>
                        <Show when={type === 'buy'}>
                            <Show when={step === 1}>
                                <FloatingLabel controlId='floatingAmount' label='Amount of tokens'>
                                    <Form.Control autoFocus type='email' placeholder='Amount of tokens' onChange={(e: any) => setTokens(e.target.value)} required />
                                </FloatingLabel>
                                <p id='alert'>ETH equivalent: {ether}</p>
                                <button className='btn ' onClick={buyCoin}>Buy<i className='fa-solid fa-circle-arrow-right'></i></button>
                            </Show>
                            <Show when={step === 2}>
                                <div className='text-center mt-4'>
                                    <i className='fa-solid fa-circle-notch fa-spin text-center fa-4x color-gold'></i>
                                    <p className='lead text-center mt-4'>Processing</p>
                                </div>
                            </Show>
                            <Show when={step === 3}>
                                <Show when={!txError}>
                                    <div className='text-center'>
                                        <i className='fa-solid fa-circle-check fa-4x'></i>
                                        <p className='lead text-center mt-4'>Success</p>
                                    </div>
                                </Show>
                                <Show when={txError}>
                                    <div className='text-center'>
                                        <i className='fa-solid fa-circle-xmark fa-4x'></i>
                                        <p className='lead text-center mt-4'>Failed</p>
                                    </div>
                                </Show>
                            </Show>
                        </Show>
                        <Show when={type === 'sell'}>
                            <Show when={step === 1}>
                                <FloatingLabel controlId='floatingAmount' label='Amount of tokens'>
                                    <Form.Control autoFocus type='email' placeholder='Amount of tokens' onChange={(e: any) => setTokens(e.target.value)} required />
                                </FloatingLabel>
                                <p id='alert'>ETH equivalent: {ether}</p>
                                <button className='btn ' onClick={sellCoin}>Sell<i className='fa-solid fa-circle-arrow-right'></i></button>
                            </Show>
                            <Show when={step === 2}>
                                <div className='text-center mt-4'>
                                    <i className='fa-solid fa-circle-notch fa-spin text-center fa-4x color-gold'></i>
                                    <p className='lead text-center mt-4'>Processing</p>
                                </div>
                            </Show>
                            <Show when={step === 3}>
                                <Show when={!txError}>
                                    <div className='text-center'>
                                        <i className='fa-solid fa-circle-check fa-4x'></i>
                                        <p className='lead text-center mt-4'>Success</p>
                                    </div>
                                </Show>
                                <Show when={txError}>
                                    <div className='text-center'>
                                        <i className='fa-solid fa-circle-xmark fa-4x'></i>
                                        <p className='lead text-center mt-4'>Failed</p>
                                    </div>
                                </Show>
                            </Show>
                        </Show>
                    </Fragment >
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn' onClick={closeModal}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LFTSwapModal