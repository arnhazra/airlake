import React, { FC, useEffect, useState, useContext } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Fragment } from 'react'
import Show from '@/components/Show'
import { tokenABI } from '@/contracts/tokenABI'
import { tokenVendorABI } from '@/contracts/tokenVendorABI'
import Web3 from 'web3'
import axios from 'axios'
import contractAddress from '@/constants/Address'
import endPoints from '@/constants/Endpoints'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/Constants'
import { AppContext } from '@/context/appStateProvider'
import { Modal } from 'react-bootstrap'
import Link from 'next/link'

interface TokenSwapModalProps {
    isOpened: boolean,
    closeModal: () => void
}

const TokenSwapModal: FC<TokenSwapModalProps> = ({ isOpened, closeModal }) => {
    const web3Provider = new Web3(endPoints.infuraEndpoint)
    const [tokens, setTokens] = useState('')
    const [ether, setEther] = useState(0)
    const [step, setStep] = useState(1)
    const [isTxProcessing, setTxProcessing] = useState(false)
    const [txError, setTxError] = useState(false)
    const [type, setType] = useState('swap')
    const [{ userState }] = useContext(AppContext)

    useEffect(() => {
        setEther(Number(tokens) / 10000)
    }, [tokens])

    useEffect(() => {
        setTokens('')
        setEther(0)
        setStep(1)
        setTxProcessing(false)
        setTxError(false)
        setType('swap')
    }, [isOpened])

    const buyToken = async (e: any) => {
        e.preventDefault()
        try {
            setTxProcessing(true)
            const { privateKey } = userState
            const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
            const vendor = new web3Provider.eth.Contract(tokenVendorABI as any, contractAddress.vendorContractAddress)
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
                    transactionType: 'Subscribe',
                    ethAmount: ether,
                    txHash: receipt.transactionHash
                }
                await axios.post(endPoints.createTransactionEndpoint, txObj)
                setTxProcessing(false)
                setStep(2)
                toast.success(Constants.TokenPurchaseSuccess)
            }
        } catch (err) {
            setTxError(true)
            setTxProcessing(false)
            setStep(2)
            toast.error(Constants.TokenPurchaseFailure)
        }
    }

    const sellToken = async (e: any) => {
        e.preventDefault()
        try {
            setTxProcessing(true)
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

            const vendor = new web3Provider.eth.Contract(tokenVendorABI as any, contractAddress.vendorContractAddress)
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
                    transactionType: 'Unsubscribe',
                    ethAmount: ether,
                    txHash: sellReceipt.transactionHash
                }
                await axios.post(endPoints.createTransactionEndpoint, obj)
                setStep(2)
                setTxProcessing(false)
                toast.success(Constants.TokenSellSuccess)
            }
        } catch (err) {
            setTxError(true)
            setTxProcessing(false)
            setStep(2)
            toast.error(Constants.TokenSellFailure)
        }
    }

    const hideModal = (): void => {
        if (!isTxProcessing) {
            closeModal()
        }
    }

    return (
        <>
            <Modal backdrop='static' centered show={isOpened} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>AFT Swap</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <Fragment>
                        <Show when={type === 'swap'}>
                            <button className='btn btn-block' onClick={() => setType('buy')}>Buy AFT<i className='fa-solid fa-circle-arrow-up'></i></button>
                            <button className='btn btn-block' onClick={() => setType('sell')}>Sell AFT<i className='fa-solid fa-circle-arrow-down'></i></button>
                            <Link className='btn btn-block' href={'https://sepoliafaucet.com/'} passHref target='_blank'>Get Some Test Ethers<i className='fa-solid fa-circle-arrow-right'></i></Link>
                        </Show>
                        <Show when={type === 'buy'}>
                            <Show when={step === 1}>
                                <form onSubmit={buyToken}>
                                    <FloatingLabel controlId='floatingAmount' label='Amount of tokens'>
                                        <Form.Control disabled={isTxProcessing} autoComplete={'off'} autoFocus type='number' placeholder='Amount of tokens' onChange={(e: any) => setTokens(e.target.value)} required />
                                    </FloatingLabel>
                                    <p id='alert'>MATIC equivalent: {ether}</p>
                                    <button className='btn btn-block' type='submit' disabled={isTxProcessing}>
                                        <Show when={!isTxProcessing}>Buy<i className='fa-solid fa-circle-arrow-right'></i></Show>
                                        <Show when={isTxProcessing}><i className='fa-solid fa-circle-notch fa-spin'></i> Processing Tx</Show>
                                    </button>
                                </form>
                            </Show>
                        </Show>
                        <Show when={type === 'sell'}>
                            <Show when={step === 1}>
                                <form onSubmit={sellToken}>
                                    <FloatingLabel controlId='floatingAmount' label='Amount of tokens'>
                                        <Form.Control disabled={isTxProcessing} autoComplete={'off'} autoFocus type='number' placeholder='Amount of tokens' onChange={(e: any) => setTokens(e.target.value)} required />
                                    </FloatingLabel>
                                    <p id='alert'>MATIC equivalent: {ether}</p>
                                    <button className='btn btn-block' type='submit' disabled={isTxProcessing}>
                                        <Show when={!isTxProcessing}>Sell<i className='fa-solid fa-circle-arrow-right'></i></Show>
                                        <Show when={isTxProcessing}><i className='fa-solid fa-circle-notch fa-spin'></i> Processing Tx</Show>
                                    </button>
                                </form>
                            </Show>
                        </Show>
                        <Show when={step === 2}>
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
                    </Fragment >
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TokenSwapModal