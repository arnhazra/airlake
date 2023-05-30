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
import { GlobalContext } from '@/context/globalStateProvider'
import { Modal } from 'react-bootstrap'
import { lnftABI } from '@/contracts/LNFTABI'

interface UnsubscribeModalProps {
    isOpened: boolean,
    dataset: any,
    datasetId: any
    tokenId: any
    closeModal: () => void
}

const UnsubscribeModal: FC<UnsubscribeModalProps> = ({ isOpened, closeModal, dataset, datasetId, tokenId }) => {
    const web3Provider = new Web3(endPoints.infuraEndpoint)
    const [step, setStep] = useState(1)
    const [isTxProcessing, setTxProcessing] = useState(false)
    const [txError, setTxError] = useState(false)
    const [{ userState }] = useContext(GlobalContext)

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

            const nftcontract = new web3Provider.eth.Contract(lnftABI as any, contractAddress.nftContractAddress)
            const sellNftData = nftcontract.methods.sellNft(tokenId).encodeABI()
            const refundAmount = (dataset?.data?.price / 2).toString()

            const sellNftTx = {
                from: walletAddress,
                to: contractAddress.nftContractAddress,
                data: sellNftData,
                gasPrice: await web3Provider.eth.getGasPrice(),
                gas: 500000,
            }

            const signedSellNftTx = await web3Provider.eth.accounts.signTransaction(sellNftTx, privateKey)
            if (signedSellNftTx.rawTransaction) {
                await web3Provider.eth.sendSignedTransaction(signedSellNftTx.rawTransaction)
            }

            const tokenContract = new web3Provider.eth.Contract(tokenABI as any, contractAddress.tokenContractAddress)
            const mintCustomAmountData = tokenContract.methods.mintCustomAmount(web3Provider.utils.toWei(refundAmount, 'ether')).encodeABI()

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

            await axios.post(`${endPoints.unsubscribeEndpoint}`, { datasetId, tokenId })
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
                            <FloatingLabel controlId='floatingAmount' label={`${dataset?.data?.price / 2} LFT`}>
                                <Form.Control disabled defaultValue={`${dataset?.data?.price / 2} LFT`} autoComplete={'off'} autoFocus type='number' placeholder={`${dataset?.data?.price / 2} LFT`} />
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