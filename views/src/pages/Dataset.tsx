import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Fragment, FC } from 'react'
import Web3 from 'web3'
import NavComponent from '../components/NavComponent'
import LoadingComponent from '../components/LoadingComponent'
import ErrorComponent from '../components/ErrorComponent'
import ReactIfComponent from '../components/ReactIfComponent'
import CardComponent from '../components/CardComponent'
import useDataSetStore from '../hooks/useDatasetStore'
import useFilterCategories from '../hooks/useFilterCategories'
import useViewDataSet from '../hooks/useViewDataSet'
import useIsSubscribed from '../hooks/useIsSubscribed'
import axios from 'axios'
import useViewSubscriptions from '../hooks/useViewSubscriptions'
import useFindSimilarDatasets from '../hooks/useFindSimilarDatasets'
import { tokenABI } from '../contracts/TokenABI'
import contractAddress from '../constants/Address'
import endPoints from '../constants/Endpoints'
declare const window: any
const web3 = new Web3(Web3.givenProvider)

const ViewAllDataSetsPage: FC = () => {
    const [searchInput, setSearchInput] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('')
    const [sortOption, setSortOption] = useState('')
    const datasetStore = useDataSetStore({ searchInput, selectedFilter, sortOption })
    const filterCategories = useFilterCategories()

    const datasetsToDisplay = datasetStore.filteredDataSets.map((dataset: any) => {
        return <CardComponent
            key={dataset._id}
            header={<p className='lead text-capitalize'>{dataset.name}</p>}
            body={<div>
                <p className='lead'>{dataset.category}</p>
                <p className='lead'>MIT License</p>
                <button className='livebutton'>{dataset.price === 0 ? 'FREE' : `${dataset.price} FLT`}</button>
            </div>}
            footer={<Link to={`/dataset/viewone/${dataset._id}`} className='btn btnbox'>View Dataset<i className='fa-solid fa-circle-arrow-right'></i></Link>}
        />
    })

    const filterCategoriesToDisplay = filterCategories.categories.map((category: any) => {
        return <button key={category} className='livebutton' onClick={(): void => setSelectedFilter(category)}>{category}</button>
    })

    return (
        <Fragment>
            <ReactIfComponent condition={datasetStore.isLoaded && filterCategories.isLoaded}>
                <NavComponent sendSearchInput={(input): void => setSearchInput(input)} />
                <Container>
                    <div className='jumbotron mt-4'>
                        <p className='lead text-capitalize'>Filter by Category</p>
                        {filterCategoriesToDisplay}
                        <p className='mt-4 lead text-capitalize'>Sort Datasets</p>
                        <button className='livebutton' onClick={(): void => setSortOption('alphabetical')}>A - Z</button>
                        <button className='livebutton' onClick={(): void => setSortOption('reverseAlphabetical')}>Z - A</button>
                        <button className='livebutton' onClick={(): void => setSortOption('priceAscending')}>Affordable</button>
                        <button className='livebutton' onClick={(): void => setSortOption('priceDescending')}>Premium</button>
                        <button className='livebutton' onClick={(): void => setSortOption('freshness')}>Freshness</button>
                        <p className='mt-4 lead text-capitalize'>Displaying {datasetStore.filteredDataSets.length} datasets</p>
                    </div>
                    <Row className='mt-4 mb-4'>
                        {datasetsToDisplay}
                    </Row>
                </Container>
            </ReactIfComponent>
            <ReactIfComponent condition={!datasetStore.isLoaded || !filterCategories.isLoaded}>
                <LoadingComponent />
            </ReactIfComponent>
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
                <button className='livebutton'>SUBSCRIBED</button>
            </div>}
            footer={<Link to={`/dataset/viewone/${dataset._id}`} className='btn btnbox'>View Dataset<i className='fa-solid fa-circle-arrow-right'></i></Link>}
        />
    })

    return (
        <Fragment>
            <ReactIfComponent condition={datasetSubscriptions.isLoaded}>
                <NavComponent />
                <Container>
                    <ReactIfComponent condition={datasetSubscriptions.subscribedDatasets.length > 0}>
                        <Row className='mt-4 mb-4'>
                            {datasetsToDisplay}
                        </Row>
                    </ReactIfComponent>
                    <ReactIfComponent condition={datasetSubscriptions.subscribedDatasets.length === 0}>
                        <ErrorComponent customMessage='No Subscriptions' />
                    </ReactIfComponent>
                </Container>
            </ReactIfComponent>
            <ReactIfComponent condition={!datasetSubscriptions.isLoaded}>
                <LoadingComponent />
            </ReactIfComponent>
        </Fragment>
    )
}

const ViewOneDataSetPage: FC = () => {
    let { datasetId } = useParams()
    const dataset = useViewDataSet({ id: datasetId })
    const subscriptionStatus = useIsSubscribed({ id: datasetId })
    const similarDatasets = useFindSimilarDatasets({ id: datasetId })
    const [fromAccount, setFromAccount] = useState('')

    useEffect(() => {
        async function loadAccounts() {
            const accounts = await web3.eth.getAccounts()
            setFromAccount(accounts[0])
        }
        loadAccounts()
    }, [])

    const subscribe = async () => {
        if (dataset.price === 0) {
            await axios.post(`${endPoints.subscribeEndpoint}/${datasetId}`)
        }

        else {
            const contract = new web3.eth.Contract(tokenABI as any, contractAddress.tokenContractAddress)
            await contract.methods.transfer(contractAddress.tokenContractAddress, web3.utils.toWei(dataset.price.toString(), 'ether')).send({ from: fromAccount })
            await axios.post(`${endPoints.subscribeEndpoint}/${datasetId}`)
        }
    }

    const datasetsToDisplay = similarDatasets.similarDatasets.map((dataset: any) => {
        return <CardComponent
            key={dataset._id}
            header={<p className='lead text-capitalize'>{dataset.name}</p>}
            body={<div>
                <p className='lead'>{dataset.category}</p>
                <p className='lead'>MIT License</p>
                <button className='livebutton'>{dataset.price === 0 ? 'FREE' : `${dataset.price} FLT`}</button>
            </div>}
            footer={<Link to={`/dataset/viewone/${dataset._id}`} className='btn btnbox'>View Dataset<i className='fa-solid fa-circle-arrow-right'></i></Link>}
        />
    })

    return (
        <Fragment>
            <ReactIfComponent condition={dataset.isLoaded && subscriptionStatus.isLoaded}>
                <ReactIfComponent condition={!dataset.hasError}>
                    <NavComponent />
                    <Container className='mt-4'>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={6} xl={9}>
                                <div className='jumbotron'>
                                    <p className='display-6 fw-bold text-capitalize'>{dataset.name}</p>
                                    <p className='lead'>{dataset.description}</p>
                                    {!subscriptionStatus.isSubscribed && <a target='_blank' rel="noreferrer" href={window.location.hostname === 'localhost' ? `http://localhost:7000/api/dataset/data/preview/${datasetId}` : `/api/dataset/data/preview/${datasetId}`} className='btn'>View Preview<i className='fa-solid fa-circle-arrow-right'></i></a>}
                                    {subscriptionStatus.isSubscribed && <a target='_blank' rel="noreferrer" href={window.location.hostname === 'localhost' ? `http://localhost:7000/api/dataset/data/view/${datasetId}/${subscriptionStatus.subscriptionId}` : `/api/dataset/data/view/${datasetId}/${subscriptionStatus.subscriptionId}`} className='btn'>View Dataset<i className='fa-solid fa-circle-arrow-right'></i></a>}
                                </div>
                            </Col>
                            <CardComponent
                                header={<p className='lead text-capitalize'>{dataset.name}</p>}
                                body={<div>
                                    <p className='lead'>{dataset.category}</p>
                                    <p className='lead'>{dataset.dataLength} Datapoints</p>
                                    <button className='livebutton'>{dataset.price === 0 ? 'FREE' : `${dataset.price} FLT`}</button>
                                </div>}
                                footer={<button disabled={subscriptionStatus.isSubscribed} className='btn btnbox' onClick={subscribe}>
                                    {subscriptionStatus.isSubscribed ? 'Subscribed' : 'Subscribe'}
                                    {subscriptionStatus.isSubscribed ? <i className='fa-solid fa-circle-check fa-white'></i> : <i className='fa-solid fa-circle-plus'></i>}
                                </button>}
                            />
                        </Row>
                        <Row>
                            <p className='lead text-center fw-bold text-white mb-4'>Similar Datasets</p>
                            {datasetsToDisplay}
                        </Row>
                    </Container>
                </ReactIfComponent>
                <ReactIfComponent condition={dataset.hasError}>
                    <ErrorComponent />
                </ReactIfComponent>
            </ReactIfComponent>
            <ReactIfComponent condition={!dataset.isLoaded || !subscriptionStatus.isLoaded}>
                <LoadingComponent />
            </ReactIfComponent>
        </Fragment >
    )
}

export { ViewAllDataSetsPage, ViewSubscriptionsPage, ViewOneDataSetPage } 