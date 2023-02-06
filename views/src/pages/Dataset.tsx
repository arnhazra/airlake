import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Fragment, FC } from 'react'
import NavComponent from '../components/NavComponent'
import useAuth from '../hooks/useAuth'
import LoadingComponent from '../components/LoadingComponent'
import ErrorComponent from '../components/ErrorComponent'
import ReactIfComponent from '../components/ReactIfComponent'
import CardComponent from '../components/CardComponent'
import useDataSetStore from '../hooks/useDataStore'
import useFilterCategories from '../hooks/useFilterCategories'
import useViewDataSet from '../hooks/useViewDataSet'
import useIsSubscribed from '../hooks/useIsSubscribed'
import axios from 'axios'

const ViewAllDataSetsPage: FC = () => {
    const auth = useAuth()
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
                <button className='livebutton'>{dataset.price === 0 ? 'FREE' : `${dataset.price} FLG`}</button>
            </div>}
            footer={<Link to={`/dataset/viewone/${dataset._id}`} className='btn btnbox'>View Dataset<i className='fa-solid fa-circle-arrow-right'></i></Link>}
        />
    })

    const filterCategoriesToDisplay = filterCategories.categories.map((category: any) => {
        return <button key={category} className='livebutton' onClick={(): void => setSelectedFilter(category)}>{category}</button>
    })

    return (
        <Fragment>
            <ReactIfComponent condition={auth.isLoaded && datasetStore.isLoaded && filterCategories.isLoaded}>
                <NavComponent sendSearchInput={(input): void => setSearchInput(input)} />
                <Container>
                    <div className='jumbotron mt-4'>
                        <p className='lead text-capitalize'>Filter by Category</p>
                        {filterCategoriesToDisplay}
                        <p className='lead text-capitalize'>Sort Datasets</p>
                        <button className='livebutton' onClick={(): void => setSortOption('alphabetical')}>A - Z</button>
                        <button className='livebutton' onClick={(): void => setSortOption('reverseAlphabetical')}>Z - A</button>
                        <button className='livebutton' onClick={(): void => setSortOption('priceAscending')}>Low Price First</button>
                        <button className='livebutton' onClick={(): void => setSortOption('priceDescending')}>High Price First</button>
                        <button className='livebutton' onClick={(): void => setSortOption('freshness')}>Freshness</button>
                    </div>
                    <Row className='mt-4 mb-4'>
                        {datasetsToDisplay}
                    </Row>
                </Container>
            </ReactIfComponent>
            <ReactIfComponent condition={!auth.isLoaded || !datasetStore.isLoaded || !filterCategories.isLoaded}>
                <LoadingComponent />
            </ReactIfComponent>
        </Fragment>
    )
}

const ViewOneDataSetPage: FC = () => {
    const auth = useAuth()
    let { id } = useParams()
    const dataset = useViewDataSet({ id: id })
    const subscriptionStatus = useIsSubscribed({ id: id })

    const subscribe = (): void => {
        axios.post(`/api/subscription/subscribe/${id}`)
    }

    return (
        <Fragment>
            <ReactIfComponent condition={auth.isLoaded && dataset.isLoaded && subscriptionStatus.isLoaded}>
                <ReactIfComponent condition={!dataset.hasError}>
                    <NavComponent />
                    <Container className='mt-4'>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={6} xl={9}>
                                <div className='jumbotron'>
                                    <p className='display-5 fw-bold text-capitalize'>{dataset.name}</p>
                                    <p className='lead'>{dataset.description}</p>
                                </div>
                            </Col>
                            <CardComponent
                                header={<p className='lead text-capitalize'>{dataset.name}</p>}
                                body={<div>
                                    <p className='lead'>{dataset.category}</p>
                                    <button className='livebutton'>{dataset.price === 0 ? 'FREE' : `${dataset.price} FLG`}</button>
                                </div>}
                                footer={<button className='btn btnbox' onClick={(): void => subscribe()}>
                                    {subscriptionStatus.isSubscribed ? 'Subscribed' : 'Subscribe'}
                                    {subscriptionStatus.isSubscribed ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-circle-plus"></i>}
                                </button>}
                            />
                        </Row>
                        <Row>
                            <CardComponent
                                header={<p className='lead text-capitalize'>Dataset Preview</p>}
                                body={<div>
                                    <p className='lead'>{dataset.category}</p>
                                    <button className='livebutton'>{dataset.price === 0 ? 'FREE' : `${dataset.price} FLG`}</button>
                                </div>}
                                footer={<a target='_blank' href={window.location.hostname === 'localhost' ? `http://localhost:7000/api/dataset/data/preview/${id}` : `/api/dataset/data/preview/${id}`} className='btn btnbox'>View Preview<i className='fa-solid fa-circle-arrow-right'></i></a>}
                            />
                            <CardComponent
                                header={<p className='lead text-capitalize'>Dataset Stats</p>}
                                body={<div>
                                    <p className='lead'>{dataset.category}</p>
                                    <button className='livebutton'>{dataset.price === 0 ? 'FREE' : `${dataset.price} FLG`}</button>
                                </div>}
                                footer={<button className='btn btnbox'>View Full Dataset<i className='fa-solid fa-circle-arrow-right'></i></button>}
                            />
                            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                <div className='jumbotron'>
                                    <p className='display-5 fw-bold text-capitalize'>Similar Datasets</p>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </ReactIfComponent>
                <ReactIfComponent condition={dataset.hasError}>
                    <ErrorComponent />
                </ReactIfComponent>
            </ReactIfComponent>
            <ReactIfComponent condition={!auth.isLoaded || !dataset.isLoaded || !subscriptionStatus.isLoaded}>
                <LoadingComponent />
            </ReactIfComponent>
        </Fragment >
    )
}

export { ViewAllDataSetsPage, ViewOneDataSetPage } 