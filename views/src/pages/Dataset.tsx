import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Fragment, FC } from 'react'
import Web3 from 'web3'
import LoadingComponent from '../components/Loading'
import ErrorComponent from '../components/Error'
import ReactIf from '../components/ReactIf'
import CardComponent from '../components/ProductCard'
import useDataSetStore from '../hooks/useDatasetStore'
import useViewDataSet from '../hooks/useViewDataSet'
import useIsSubscribed from '../hooks/useIsSubscribed'
import axios from 'axios'
import useViewSubscriptions from '../hooks/useViewSubscriptions'
import useFindSimilarDatasets from '../hooks/useFindSimilarDatasets'
import { tokenABI } from '../contracts/TokenABI'
import contractAddress from '../constants/Address'
import endPoints from '../constants/Endpoints'
import { GlobalContext } from '../context/globalStateProvider'
import DatasetStoreHeader from '../modules/DatasetStoreHeader'
import { toast } from 'react-hot-toast'
declare const window: any
const web3 = new Web3(Web3.givenProvider)

const ViewAllDataSetsPage: FC = () => {
    const [{ datasetRequestState }] = useContext(GlobalContext)
    const datasetStore = useDataSetStore(datasetRequestState)

    const datasetsToDisplay = datasetStore.datasets.map((dataset: any) => {
        return <CardComponent
            key={dataset._id}
            header={<p className='lead text-capitalize'>{dataset.name}</p>}
            body={<div>
                <p className='lead'>{dataset.category}</p>
                <p className='lead'>MIT License</p>
                <button className='chip'>{dataset.price === 0 ? 'FREE' : `${dataset.price} LST`}</button>
            </div>}
            footer={<Link to={`/dataset/viewone/${dataset._id}`} className='btn btnbox'>View Dataset<i className='fa-solid fa-circle-arrow-right'></i></Link>}
        />
    })

    return (
        <Fragment>
            <ReactIf condition={datasetStore.isLoaded}>
                <Container>
                    <DatasetStoreHeader datasetCount={datasetStore.datasets.length} />
                    <Row className='mt-4 mb-4'>
                        {datasetsToDisplay}
                    </Row>
                </Container>
            </ReactIf>
            <ReactIf condition={!datasetStore.isLoaded}>
                <LoadingComponent />
            </ReactIf>
        </Fragment>
    )
}

const ViewSubscriptionsPage: FC = () => {
    const datasetSubscriptions = useViewSubscriptions()

    const datasetsToDisplay = datasetSubscriptions.subscribedDatasets.map((dataset: any) => {
        return <CardComponent
            key={dataset._id}
            header={<p className='lead text-capitalize'>{dataset.name}</p>}
            body={<div>
                <p className='lead'>{dataset.category}</p>
                <p className='lead'>MIT License</p>
                <button className='chip'>SUBSCRIBED</button>
            </div>}
            footer={<Link to={`/dataset/viewone/${dataset._id}`} className='btn btnbox'>View Dataset<i className='fa-solid fa-circle-arrow-right'></i></Link>}
        />
    })

    return (
        <Fragment>
            <ReactIf condition={datasetSubscriptions.isLoaded}>
                <Container>
                    <ReactIf condition={datasetSubscriptions.subscribedDatasets.length > 0}>
                        <Row className='mt-4 mb-4'>
                            {datasetsToDisplay}
                        </Row>
                    </ReactIf>
                    <ReactIf condition={datasetSubscriptions.subscribedDatasets.length === 0}>
                        <ErrorComponent customMessage='No Subscriptions' />
                    </ReactIf>
                </Container>
            </ReactIf>
            <ReactIf condition={!datasetSubscriptions.isLoaded}>
                <LoadingComponent />
            </ReactIf>
        </Fragment>
    )
}

const ViewOneDataSetPage: FC = () => {
    const [hasClickedSubscribed, setClickedSubscribed] = useState(false)
    let { datasetId } = useParams()
    const dataset = useViewDataSet({ id: datasetId })
    const subscriptionStatus = useIsSubscribed({ id: datasetId, hasClickedSubscribed })
    const similarDatasets = useFindSimilarDatasets({ id: datasetId })
    const [account, setAccount] = useState('')

    const subscribe = async () => {
        if (dataset.price === 0) {
            await axios.post(`${endPoints.subscribeEndpoint}/${datasetId}`)
            setClickedSubscribed(true)
        }

        else {
            try {
                if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
                    try {
                        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                        setAccount(accounts[0])
                        const contract = new web3.eth.Contract(tokenABI as any, contractAddress.tokenContractAddress)
                        await contract.methods.transfer(contractAddress.tokenContractAddress, web3.utils.toWei(dataset.price.toString(), 'ether')).send({ from: account })
                        await axios.post(`${endPoints.subscribeEndpoint}/${datasetId}`)
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
        return <CardComponent
            key={dataset._id}
            header={<p className='lead text-capitalize'>{dataset.name}</p>}
            body={<div>
                <p className='lead'>{dataset.category}</p>
                <p className='lead'>MIT License</p>
                <button className='chip'>{dataset.price === 0 ? 'FREE' : `${dataset.price} LST`}</button>
            </div>}
            footer={<Link to={`/dataset/viewone/${dataset._id}`} className='btn btnbox'>View Dataset<i className='fa-solid fa-circle-arrow-right'></i></Link>}
        />
    })

    return (
        <Fragment>
            <ReactIf condition={dataset.isLoaded && subscriptionStatus.isLoaded}>
                <ReactIf condition={!dataset.hasError}>
                    <Container className='mt-4'>
                        <div className='jumbotron'>
                            <p className='display-6 fw-bold text-capitalize'>{dataset.name}</p>
                            <p className='lead'>{dataset.description}</p>
                            <div className='chip-grid'>
                                <button className='chip'>{dataset.category}</button>
                                <button className='chip'>{dataset.price === 0 ? 'FREE' : `${dataset.price} LST`}</button>
                                <button className='chip'>{dataset.dataLength} Datapoints</button><br />
                            </div>
                            {account && <button disabled={subscriptionStatus.isSubscribed} className='btn' onClick={subscribe}>
                                {subscriptionStatus.isSubscribed ? 'Subscribed' : 'Subscribe'}
                                {subscriptionStatus.isSubscribed ? <i className='fa-solid fa-circle-check fa-white'></i> : <i className='fa-solid fa-circle-plus'></i>}
                            </button>}
                            {!subscriptionStatus.isSubscribed && <a target='_blank' rel='noreferrer' href={window.location.hostname === 'localhost' ? `http://localhost:7000/api/dataset/data/preview/${datasetId}` : `/api/dataset/data/preview/${datasetId}`} className='btn'>View Preview<i className='fa-solid fa-circle-arrow-right'></i></a>}
                            {subscriptionStatus.isSubscribed && <a target='_blank' rel='noreferrer' href={window.location.hostname === 'localhost' ? `http://localhost:7000/api/dataset/data/view/${datasetId}/${subscriptionStatus.subscriptionId}` : `/api/dataset/data/view/${datasetId}/${subscriptionStatus.subscriptionId}`} className='btn'>View Dataset<i className='fa-solid fa-circle-arrow-right'></i></a>}
                        </div>
                        <Row>
                            <p className='lead text-center fw-bold text-white mb-4'>Similar Datasets</p>
                            {similarDatasetsToDisplay}
                        </Row>
                    </Container>
                </ReactIf>
                <ReactIf condition={dataset.hasError}>
                    <ErrorComponent />
                </ReactIf>
            </ReactIf>
            <ReactIf condition={!dataset.isLoaded || !subscriptionStatus.isLoaded}>
                <LoadingComponent />
            </ReactIf>
        </Fragment >
    )
}

export { ViewAllDataSetsPage, ViewSubscriptionsPage, ViewOneDataSetPage } 