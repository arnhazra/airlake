import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Fragment } from 'react'
import Web3 from 'web3'
import Loading from '@/components/LoadingComponent'
import Error from '@/components/ErrorComponent'
import ReactIf from '@/components/ReactIfComponent'
import useViewDataset from '@/hooks/useViewDataset'
import useIsSubscribed from '@/hooks/useIsSubscribed'
import axios from 'axios'
import useFindSimilarDatasets from '@/hooks/useFindSimilarDatasets'
import { tokenABI } from '@/contracts/TokenABI'
import contractAddress from '@/constants/Address'
import endPoints from '@/constants/Endpoints'
import { toast } from 'react-hot-toast'
import DatasetCard from '@/components/DatasetCardComponent'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Constants from '@/constants/Constants'
declare const window: any
const web3 = new Web3(Web3.givenProvider)

const ViewOneDatasetPage: NextPage = () => {
    const [hasClickedSubscribed, setClickedSubscribed] = useState(false)
    const router = useRouter()
    const { id } = router.query
    const dataset = useViewDataset({ id })
    const subscriptionStatus = useIsSubscribed({ id, hasClickedSubscribed })
    const similarDatasets = useFindSimilarDatasets({ id })
    const [account, setAccount] = useState('')

    const subscribe = async () => {
        if (dataset.price === 0) {
            try {
                await axios.post(`${endPoints.subscribeEndpoint}`, { datasetId: id })
                setClickedSubscribed(true)
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
                        await contract.methods.transfer(contractAddress.tokenContractAddress, web3.utils.toWei(dataset.price.toString(), 'ether')).send({ from: account })
                        await axios.post(`${endPoints.subscribeEndpoint}`, { datasetId: id })
                        setClickedSubscribed(true)
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

    const similarDatasetsToDisplay = similarDatasets.similarDatasets.map((dataset: any) => {
        return <DatasetCard key={dataset._id} id={dataset._id} category={dataset.category} name={dataset.name} price={dataset.price} />
    })

    return (
        <Fragment>
            <ReactIf condition={dataset.isLoaded && subscriptionStatus.isLoaded}>
                <ReactIf condition={!dataset.hasError}>
                    <Container className='mt-4'>
                        <div className='jumbotron'>
                            <p className='display-6 text-capitalize'>{dataset.name}</p>
                            <p className='smalltext'>{dataset.description}</p>
                            <div className='chip-grid'>
                                <button className='btn chip'>{dataset.category}</button>
                                <button className='btn chip'>{dataset.price === 0 ? 'FREE' : `${dataset.price} ELT`}</button>
                                <button className='btn chip'>{dataset.dataLength} Datapoints</button><br />
                            </div>
                            <ReactIf condition={!subscriptionStatus.isSubscribed}>
                                <button className='btn chip' onClick={subscribe}>
                                    Subscribe<i className='fa-solid fa-circle-plus'></i>
                                </button>
                            </ReactIf>
                            <ReactIf condition={!subscriptionStatus.isSubscribed}>
                                <a target='_blank' rel='noreferrer' href={`${endPoints.datasetPreview}/${id}`} className='btn chip'>Data Preview</a>
                            </ReactIf>
                            <ReactIf condition={subscriptionStatus.isSubscribed}>
                                <a target='_blank' rel='noreferrer' href={`${endPoints.datasetFullview}/${id}/${subscriptionStatus.subscriptionId}`} className='btn chip'>Data Fullview</a>
                            </ReactIf>
                        </div>
                        <Row>
                            <p className='lead text-center text-white mb-4'>Similar Datasets</p>
                            {similarDatasetsToDisplay}
                        </Row>
                    </Container>
                </ReactIf>
                <ReactIf condition={dataset.hasError}>
                    <Error />
                </ReactIf>
            </ReactIf>
            <ReactIf condition={!dataset.isLoaded || !subscriptionStatus.isLoaded}>
                <Loading />
            </ReactIf>
        </Fragment >
    )
}

export default ViewOneDatasetPage