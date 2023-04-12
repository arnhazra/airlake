import { useContext } from 'react'
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import { Fragment } from 'react'
import Loading from '@/components/LoadingComponent'
import ReactIf from '@/components/ReactIfComponent'
import { GlobalContext } from '@/context/globalStateProvider'
import DatasetCard from '@/components/DatasetCardComponent'
import { NextPage } from 'next'
import useFetch from '@/hooks/useFetch'
import endPoints from '@/constants/Endpoints'
import HTTPMethods from '@/constants/HTTPMethods'

const DataPlatformPage: NextPage = () => {
    const [{ datasetRequestState }, dispatch] = useContext(GlobalContext)
    const filters = useFetch('filters', endPoints.datasetFiltersEndpoint, HTTPMethods.POST)
    const dataPlatform = useFetch('data platform', endPoints.dataplatformEndpoint, HTTPMethods.POST, datasetRequestState)

    const filterCategoriesToDisplay = filters?.data?.filterCategories?.map((category: string) => {
        return <option className='options' key={category} value={category}>{category}</option>
    })

    const datasetsToDisplay = dataPlatform?.data?.datasets?.map((dataset: any) => {
        return <DatasetCard key={dataset._id} id={dataset._id} category={dataset.category} name={dataset.name} price={dataset.price} />
    })

    const prevPage = () => {
        const prevDatasetReqNumber = datasetRequestState.offset - 24
        dispatch('setDatasetRequestState', { offset: prevDatasetReqNumber })
        window.scrollTo(0, 0)
    }

    const nextPage = () => {
        const nextOffset = datasetRequestState.offset + 24
        dispatch('setDatasetRequestState', { offset: nextOffset })
        window.scrollTo(0, 0)
    }

    return (
        <Fragment>
            <ReactIf condition={!dataPlatform.isLoading && !filters.isLoading}>
                <Container>
                    <Row className='g-2 mt-4'>
                        <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                            <FloatingLabel controlId='floatingSelectGrid' label='Select Filter Category'>
                                <Form.Select defaultValue={datasetRequestState.selectedFilter} onChange={(e): void => dispatch('setDatasetRequestState', { selectedFilter: e.target.value, offset: 0 })}>
                                    {filterCategoriesToDisplay}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                            <FloatingLabel controlId='floatingSelectGrid' label='Sort By'>
                                <Form.Select defaultValue={datasetRequestState.selectedSortOption} onChange={(e): void => dispatch('setDatasetRequestState', { selectedSortOption: e.target.value })}>
                                    <option className='options' key={'freshness'} value={'-_id'}>Dataset Freshness</option>
                                    <option className='options' key={'nameAscending'} value={'name'}>Name Ascending</option>
                                    <option className='options' key={'nameDescending'} value={'-name'}>Name Descending</option>
                                    <option className='options' key={'priceAscending'} value={'price'}>Price Ascending</option>
                                    <option className='options' key={'priceDescending'} value={'-price'}>Price Descending</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className='mt-4 mb-4'>
                        {datasetsToDisplay}
                    </Row>
                    <div className='text-center'>
                        <button className='btn' onClick={prevPage} disabled={datasetRequestState.offset === 0}>Show Prev<i className='fa-solid fa-circle-arrow-left'></i></button>
                        <button className='btn' onClick={nextPage} disabled={dataPlatform?.data?.datasets?.length !== 24}>Show Next<i className='fa-solid fa-circle-arrow-right'></i></button>
                    </div>
                </Container>
            </ReactIf>
            <ReactIf condition={dataPlatform.isLoading || filters.isLoading}>
                <Loading />
            </ReactIf>
        </Fragment>
    )
}

export default DataPlatformPage