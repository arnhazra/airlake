import React, { FC, useEffect, useState, useContext } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Fragment } from 'react'
import Show from '@/components/Show'
import { tokenABI } from '@/contracts/LFTABI'
import Web3 from 'web3'
import axios from 'axios'
import contractAddress from '@/constants/Address'
import endPoints from '@/constants/Endpoints'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/Constants'
import { AppContext } from '@/context/appStateProvider'
import { Modal } from 'react-bootstrap'
import { lnftABI } from '@/contracts/LNFTABI'

interface SubscribeModalProps {
    isOpened: boolean,
    price: number
    closeModal: () => void
}

const SubscribeModal: FC<SubscribeModalProps> = ({ isOpened, closeModal, price }) => {
    const web3Provider = new Web3(endPoints.infuraEndpoint)
    const [step, setStep] = useState(1)
    const [isTxProcessing, setTxProcessing] = useState(false)
    const [txError, setTxError] = useState(false)
    const [{ userState }] = useContext(AppContext)

    useEffect(() => {
        setStep(1)
        setTxProcessing(false)
        setTxError(false)
    }, [isOpened])

    const subscribe = async () => {
        try {
            setTxProcessing(true)
            const { privateKey } = userState
            const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
            const tokenId = Math.floor(1000000 + Math.random() * 9000000)

            const tokenContract = new web3Provider.eth.Contract(
                tokenABI as any,
                contractAddress.tokenContractAddress
            )
            const approvalData = tokenContract.methods.approve(
                contractAddress.nftContractAddress,
                web3Provider.utils.toWei(price.toString(), 'ether')
            ).encodeABI()

            const approvalTx = {
                from: walletAddress,
                to: contractAddress.tokenContractAddress,
                data: approvalData,
                gasPrice: await web3Provider.eth.getGasPrice(),
                gas: await tokenContract.methods
                    .approve(contractAddress.nftContractAddress, web3Provider.utils.toWei(price.toString(), 'ether'))
                    .estimateGas({ from: walletAddress }),
            }

            const signedApprovalTx = await web3Provider.eth.accounts.signTransaction(approvalTx, privateKey)
            if (signedApprovalTx.rawTransaction) {
                await web3Provider.eth.sendSignedTransaction(signedApprovalTx.rawTransaction)
            }

            const nftcontract = new web3Provider.eth.Contract(lnftABI as any, contractAddress.nftContractAddress)
            const mintNftData = nftcontract.methods.mintNft(tokenId).encodeABI()
            const purchaseNftData = nftcontract.methods
                .purchaseNft(tokenId, web3Provider.utils.toWei(price.toString(), 'ether'))
                .encodeABI()

            const mintNftTx = {
                from: walletAddress,
                to: contractAddress.nftContractAddress,
                data: mintNftData,
                gasPrice: await web3Provider.eth.getGasPrice(),
                gas: 500000,
            }

            const signedMintNftTx = await web3Provider.eth.accounts.signTransaction(mintNftTx, privateKey)
            if (signedMintNftTx.rawTransaction) {
                await web3Provider.eth.sendSignedTransaction(signedMintNftTx.rawTransaction)
            }

            const purchaseNftTx = {
                from: walletAddress,
                to: contractAddress.nftContractAddress,
                data: purchaseNftData,
                gasPrice: await web3Provider.eth.getGasPrice(),
                gas: 500000,
            }

            const signedPurchaseNftTx = await web3Provider.eth.accounts.signTransaction(purchaseNftTx, privateKey)
            if (signedPurchaseNftTx.rawTransaction) {
                await web3Provider.eth.sendSignedTransaction(signedPurchaseNftTx.rawTransaction)
            }

            await axios.post(`${endPoints.subscribeEndpoint}`, { tokenId })
            setTxProcessing(false)
            setTxError(false)
            setStep(2)
            toast.success(Constants.TransactionSuccess)
        } catch (error) {
            setTxProcessing(false)
            setTxError(true)
            setStep(2)
            toast.error(Constants.TransactionError)
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
                    <Modal.Title>Subscribe</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <Fragment>
                        <Show when={step === 1}>
                            <FloatingLabel controlId='floatingAmount' label={`${price} LFT`}>
                                <Form.Control disabled defaultValue={`${price} LFT`} autoComplete={'off'} autoFocus type='number' placeholder={`${price} LFT`} />
                            </FloatingLabel><br />
                            <button className='btn btn-block' type='submit' disabled={isTxProcessing} onClick={subscribe}>
                                <Show when={!isTxProcessing}>Pay & Subscribe<i className='fa-solid fa-circle-arrow-right'></i></Show>
                                <Show when={isTxProcessing}><i className='fa-solid fa-circle-notch fa-spin'></i> Processing Tx</Show>
                            </button>
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

export default SubscribeModal