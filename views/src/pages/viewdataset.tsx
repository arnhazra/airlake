import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Fragment } from 'react'
import Web3 from 'web3'
import Loading from '@/components/Loading'
import ReactIf from '@/components/ReactIf'
import axios from 'axios'
import { tokenABI } from '@/contracts/LFTABI'
import { lnftABI } from '@/contracts/LNFTABI'
import contractAddress from '@/constants/Address'
import endPoints from '@/constants/Endpoints'
import { toast } from 'react-hot-toast'
import DatasetCard from '@/components/DatasetCard'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Constants from '@/constants/Constants'
import useFetch from '@/hooks/useFetch'
import HTTPMethods from '@/constants/HTTPMethods'
import Error from '@/components/ErrorComp'
import { Rating } from 'react-simple-star-rating'
import Link from 'next/link'
declare const window: any
const web3 = new Web3(Web3.givenProvider)

const ViewDatasetPage: NextPage = () => {
    const router = useRouter()
    const { id: datasetId } = router.query
    const [eventId, setEventId] = useState(Math.random().toString())
    const [account, setAccount] = useState('')
    const [isTransactionProcessing, setTransactionProcessing] = useState(false)
    const dataset = useFetch('view dataset', endPoints.datasetViewEndpoint, HTTPMethods.POST, { datasetId })
    const similarDatasets = useFetch('similar datasets', endPoints.findsimilarDatasets, HTTPMethods.POST, { datasetId })
    const subscriptionStatus = useFetch('subscription status', endPoints.checkSubscriptionEndpoint, HTTPMethods.POST, { datasetId }, eventId)

    useEffect(() => {
        const connectWallet = async () => {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                setAccount(accounts[0])
            } catch (error) {
                toast.error(Constants.MetamaskInstallNotification)
            }
        }

        connectWallet()
    }, [])


    const subscribe = async () => {
        if (dataset.data.price === 0) {
            try {
                if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
                    try {
                        setTransactionProcessing(true)
                        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                        setAccount(accounts[0])
                        const tokenId = Math.floor(1000000 + Math.random() * 9000000)
                        const nftcontract = new web3.eth.Contract(lnftABI as any, contractAddress.nftContractAddress)
                        await nftcontract.methods.mintNft(tokenId).send({ from: account, gas: 500000 })
                        await axios.post(`${endPoints.subscribeEndpoint}`, { datasetId, tokenId })
                        setEventId(Math.random().toString())
                        setTransactionProcessing(false)
                    } catch (err) {
                        setTransactionProcessing(false)
                        toast.error(Constants.MetaMaskConnectionError)
                    }
                } else {
                    setTransactionProcessing(false)
                    toast.error(Constants.MetamaskInstallNotification)
                }
            } catch (error) {
                setTransactionProcessing(false)
                toast.error(Constants.MetamaskInstallNotification)
            }
        }

        else {
            try {
                if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
                    try {
                        setTransactionProcessing(true)
                        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                        setAccount(accounts[0])
                        const tokenId = Math.floor(1000000 + Math.random() * 9000000)

                        // Approve the contract to spend the tokens
                        const tokenContract = new web3.eth.Contract(tokenABI as any, contractAddress.tokenContractAddress)
                        await tokenContract.methods.approve(contractAddress.nftContractAddress, web3.utils.toWei(dataset?.data?.price.toString(), 'ether')).send({ from: account })

                        // Spend the tokens to buy a NFT
                        const nftcontract = new web3.eth.Contract(lnftABI as any, contractAddress.nftContractAddress)
                        await nftcontract.methods.mintNft(tokenId).send({ from: account, gas: 500000 })
                        await nftcontract.methods.purchaseNft(tokenId, web3.utils.toWei(dataset?.data?.price.toString(), 'ether')).send({ from: account, gas: 500000 })

                        await axios.post(`${endPoints.subscribeEndpoint}`, { datasetId, tokenId })
                        setEventId(Math.random().toString())
                        setTransactionProcessing(false)
                    } catch (err) {
                        setTransactionProcessing(false)
                        toast.error(Constants.MetaMaskConnectionError)
                    }
                } else {
                    setTransactionProcessing(false)
                    toast.error(Constants.MetamaskInstallNotification)
                }
            } catch (error) {
                setTransactionProcessing(false)
                toast.error(Constants.MetamaskInstallNotification)
            }
        }
    }

    const unsubscribe = async () => {
        try {
            if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
                try {
                    setTransactionProcessing(true)
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                    setAccount(accounts[0])
                    const tokenId = subscriptionStatus?.data?.tokenId
                    const nftcontract = new web3.eth.Contract(lnftABI as any, contractAddress.nftContractAddress)
                    await nftcontract.methods.sellNft(tokenId).send({ from: account, gas: 500000 })
                    await axios.post(`${endPoints.unsubscribeEndpoint}`, { datasetId, tokenId })
                    setEventId(Math.random().toString())
                    setTransactionProcessing(false)
                } catch (err) {
                    setTransactionProcessing(false)
                    toast.error(Constants.MetaMaskConnectionError)
                }
            } else {
                setTransactionProcessing(false)
                toast.error(Constants.MetamaskInstallNotification)
            }
        } catch (error) {
            setTransactionProcessing(false)
            toast.error(Constants.MetamaskInstallNotification)
        }
    }

    const similarDatasetsToDisplay = similarDatasets?.data?.similarDatasets?.map((dataset: any) => {
        return <DatasetCard key={dataset._id} id={dataset._id} category={dataset.category} name={dataset?.name} price={dataset?.price} />
    })

    const datasetTagsToDisplay = dataset?.data?.description?.split(' ').slice(0, 30).map((item: string) => {
        if (item.length > 4) {
            return <button className='btn tag-chip' title='tags' key={Math.random().toString()}>{item}</button>
        }
    })

    const copyMetadataAPI = (): void => {
        navigator.clipboard.writeText(`${endPoints.metadataapi}/${datasetId}`)
        toast.success('Copied to Clipboard')
    }

    const copyDataAPI = (): void => {
        navigator.clipboard.writeText(`${endPoints.dataapi}/${datasetId}/${subscriptionStatus?.data?.subscriptionId}`)
        toast.success('Copied to Clipboard')
    }

    return (
        <Fragment>
            <ReactIf condition={!subscriptionStatus?.isLoading && !dataset?.isLoading && !similarDatasets?.isLoading}>
                <ReactIf condition={!dataset.error}>
                    <Container className='mt-4'>
                        <div className='jumbotron'>
                            <Row>
                                <DatasetCard key={dataset?.data?._id} id={dataset?.data?._id} category={dataset?.data?.category} name={dataset?.data?.name} price={dataset?.data?.price} />
                                <Col sm={6} md={8} lg={9} xl={10}>
                                    <p className='display-6 text-capitalize'>{dataset?.data?.name}</p>
                                    <p className="lead">{dataset?.data?.category}</p>
                                    <Rating initialValue={dataset?.data?.rating} allowHover={false} allowFraction size={25} readonly />
                                    <ReactIf condition={subscriptionStatus?.data?.isSubscribed}>
                                        <Link target='_blank' passHref href={`https://sepolia.etherscan.io/nft/${contractAddress.nftContractAddress}/${subscriptionStatus?.data?.tokenId}`}>
                                            <img style={{ marginLeft: '1rem' }} src="https://cdn2.iconfinder.com/data/icons/nft-flat/64/NFT_Cryptocurrency_blockchain-90-256.png" alt="NFT" height={30} width={30} />
                                        </Link>
                                    </ReactIf>
                                    <p className="lead mt-3">{dataset?.data?.description}</p>
                                    <div>{datasetTagsToDisplay}</div>
                                </Col>
                            </Row>
                            <ReactIf condition={!subscriptionStatus?.data?.isSubscribed}>
                                <ReactIf condition={!isTransactionProcessing}>
                                    <button className='btn' onClick={subscribe}>
                                        Subscribe {`${dataset?.data?.price} LFT`}<i className='fa-solid fa-circle-plus'></i>
                                    </button>
                                </ReactIf>
                                <ReactIf condition={isTransactionProcessing}>
                                    <button disabled className='btn'>
                                        Processing <i className='fas fa-circle-notch fa-spin color-gold'></i>
                                    </button>
                                </ReactIf>
                                <button className='btn' onClick={copyMetadataAPI}>Metadata API <i className="fa-solid fa-copy"></i></button>
                            </ReactIf>
                            <ReactIf condition={subscriptionStatus?.data?.isSubscribed}>
                                <button className='btn' onClick={unsubscribe}>
                                    Unsubscribe <i className="fa-solid fa-trash"></i>
                                </button>
                                <button className='btn' onClick={copyDataAPI}>Data API <i className="fa-solid fa-copy"></i></button>
                            </ReactIf>
                        </div>
                        <Row>
                            <p className='lead text-center text-white mb-4'>Similar Datasets</p>
                            {similarDatasetsToDisplay}
                        </Row>
                    </Container>
                </ReactIf>
                <ReactIf condition={dataset.error}>
                    <Error />
                </ReactIf>
            </ReactIf>
            <ReactIf condition={subscriptionStatus?.isLoading || dataset?.isLoading || similarDatasets?.isLoading}>
                <Loading />
            </ReactIf>
        </Fragment >
    )
}

export default ViewDatasetPage