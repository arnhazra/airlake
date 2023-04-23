import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
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
import { Rating } from 'react-simple-star-rating'
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

    const datasetTagsToDisplay = dataset?.data?.description?.split(' ').slice(0, 30).map((item: string) => {
        if (item.length > 4) {
            return <button className='btn tag-chip' title='tags'>{item}</button>
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
                                    <p className="lead mt-3">{dataset?.data?.description}</p>
                                    <div>{datasetTagsToDisplay}</div>
                                </Col>
                            </Row>
                            <ReactIf condition={!subscriptionStatus?.data?.isSubscribed}>
                                <button className='btn' onClick={subscribe}>
                                    Subscribe {dataset?.data?.price === 0 ? 'FREE' : `${dataset?.data?.price} LST`}<i className='fa-solid fa-circle-plus'></i>
                                </button>
                                <button className='btn' onClick={copyMetadataAPI}>Metadata API <i className="fa-solid fa-copy"></i></button>
                            </ReactIf>
                            <ReactIf condition={subscriptionStatus?.data?.isSubscribed}>
                                <button disabled className='btn'>
                                    Subscribed <i className='fa-solid fa-circle-check'></i>
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

export default ViewOneDatasetPage