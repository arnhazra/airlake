import React, { FC, useEffect, useState, useContext } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Fragment } from 'react'
import Show from '@/components/Show'
import { tokenABI } from '@/contracts/tokenABI'
import Web3 from 'web3'
import axios from 'axios'
import contractAddress from '@/constants/Address'
import endPoints from '@/constants/Endpoints'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/Constants'
import { AppContext } from '@/context/appStateProvider'
import { Modal } from 'react-bootstrap'
import { anftABI } from '@/contracts/nftABI'

interface UnsubscribeModalProps {
    isOpened: boolean,
    refundAmount: number
    tokenId: any
    closeModal: () => void
}

const UnsubscribeModal: FC<UnsubscribeModalProps> = ({ isOpened, closeModal, refundAmount, tokenId }) => {
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

    const unsubscribe = async () => {
        try {
            setTxProcessing(true)
            const { privateKey } = userState
            const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)

            const nftcontract = new web3Provider.eth.Contract(anftABI as any, contractAddress.nftContractAddress)
            const sellNFTData = nftcontract.methods.sellNFT(tokenId).encodeABI()

            const sellNFTTx = {
                from: walletAddress,
                to: contractAddress.nftContractAddress,
                data: sellNFTData,
                gasPrice: await web3Provider.eth.getGasPrice(),
                gas: 500000,
            }

            const signedsellNFTTx = await web3Provider.eth.accounts.signTransaction(sellNFTTx, privateKey)
            if (signedsellNFTTx.rawTransaction) {
                await web3Provider.eth.sendSignedTransaction(signedsellNFTTx.rawTransaction)
            }

            const tokenContract = new web3Provider.eth.Contract(tokenABI as any, contractAddress.tokenContractAddress)
            const mintCustomAmountData = tokenContract.methods.mintCustomAmount(web3Provider.utils.toWei(refundAmount.toString(), 'ether')).encodeABI()

            const mintCustomAmountTx = {
                from: walletAddress,
                to: contractAddress.tokenContractAddress,
                data: mintCustomAmountData,
                gasPrice: await web3Provider.eth.getGasPrice(),
                gas: 500000,
            }

            const signedMintCustomAmountTx = await web3Provider.eth.accounts.signTransaction(mintCustomAmountTx, privateKey)
            if (signedMintCustomAmountTx.rawTransaction) {
                await web3Provider.eth.sendSignedTransaction(signedMintCustomAmountTx.rawTransaction)
            }

            await axios.post(`${endPoints.unsubscribeEndpoint}`)
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
                    <Modal.Title>Unsubscribe</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <Fragment>
                        <Show when={step === 1}>
                            <FloatingLabel controlId='floatingAmount' label={`${refundAmount} AFT`}>
                                <Form.Control disabled defaultValue={`${refundAmount} AFT`} autoComplete={'off'} autoFocus type='number' placeholder={`${refundAmount} AFT`} />
                            </FloatingLabel><br />
                            <button className='btn btn-block' type='submit' disabled={isTxProcessing} onClick={unsubscribe}>
                                <Show when={!isTxProcessing}>Get Refund<i className='fa-solid fa-circle-arrow-right'></i></Show>
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

export default UnsubscribeModal