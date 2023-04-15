import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Fragment } from 'react'
import Web3 from 'web3'
import Loading from '@/components/Loading'
import ReactIf from '@/components/ReactIf'
import axios from 'axios'
import { tokenABI } from '@/contracts/TokenABI'
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
declare const window: any
const web3 = new Web3(Web3.givenProvider)

const ViewOneDatasetPage: NextPage = () => {
    const router = useRouter()
    const { id: datasetId } = router.query
    const [eventId, setEventId] = useState(Math.random().toString())
    const [account, setAccount] = useState('')
    const dataset = useFetch('view dataset', endPoints.datasetViewEndpoint, HTTPMethods.POST, { datasetId })
    const similarDatasets = useFetch('similar datasets', endPoints.findsimilarDatasets, HTTPMethods.POST, { datasetId })
    const subscriptionStatus = useFetch('subscription status', endPoints.checkSubscriptionEndpoint, HTTPMethods.POST, { datasetId }, eventId)

    const subscribe = async () => {
        if (dataset.data.price === 0) {
            try {
                await axios.post(`${endPoints.subscribeEndpoint}`, { datasetId })
                setEventId(Math.random().toString())
            } catch (error) {
                toast.error(Constants.ToastError)
            }
        }

        else {
            try {
                if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
                    try {
                        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                        setAccount(accounts[0])
                        const contract = new web3.eth.Contract(tokenABI as any, contractAddress.tokenContractAddress)
                        await contract.methods.transfer(contractAddress.tokenContractAddress, web3.utils.toWei(dataset.data.price.toString(), 'ether')).send({ from: account })
                        await axios.post(`${endPoints.subscribeEndpoint}`, { datasetId })
                        setEventId(Math.random().toString())
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
    }

    const similarDatasetsToDisplay = similarDatasets?.data?.similarDatasets?.map((dataset: any) => {
        return <DatasetCard key={dataset._id} id={dataset._id} category={dataset.category} name={dataset?.name} price={dataset?.price} />
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
                            <p className='display-6 text-capitalize'>{dataset?.data?.name}</p>
                            <p className='lead'>{dataset?.data?.description}</p>
                            <div>
                                <button className='btn'>{dataset?.data?.category} <i className="fa-solid fa-layer-group"></i></button>
                                <button className='btn'>{dataset?.data?.price === 0 ? 'FREE' : `${dataset?.data?.price} LST`} <i className="fa-brands fa-connectdevelop"></i></button>
                            </div>
                            <ReactIf condition={!subscriptionStatus?.data?.isSubscribed}>
                                <button className='btn' onClick={subscribe}>
                                    Subscribe<i className='fa-solid fa-circle-plus'></i>
                                </button>
                                <button className='btn' onClick={copyMetadataAPI}>Metadata API <i className="fa-solid fa-copy"></i></button>
                            </ReactIf>
                            <ReactIf condition={subscriptionStatus?.data?.isSubscribed}>
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

export default ViewOneDatasetPage