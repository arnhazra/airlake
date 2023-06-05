import { useContext } from 'react'
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import { Fragment } from 'react'
import Loading from '@/components/Loading'
import Show from '@/components/Show'
import { GlobalContext } from '@/context/globalStateProvider'
import DatasetCard from '@/components/DatasetCard'
import { NextPage } from 'next'
import useFetch from '@/hooks/useFetch'
import endPoints from '@/constants/Endpoints'
import HTTPMethods from '@/constants/HTTPMethods'
import Error from '@/components/ErrorComp'

const DataPlatformPage: NextPage = () => {
    const [{ datasetRequestState }, dispatch] = useContext(GlobalContext)
    const filters = useFetch('filters', endPoints.datasetFiltersEndpoint, HTTPMethods.POST)
    const dataPlatform = useFetch('data platform', endPoints.findDatasetsEndpoint, HTTPMethods.POST, datasetRequestState)

    const filterCategoriesToDisplay = filters?.data?.filterCategories?.map((category: string) => {
        return <option className='options' key={category} value={category}>{category}</option>
    })

    const datasetsToDisplay = dataPlatform?.data?.datasets?.map((dataset: any) => {
        return <DatasetCard key={dataset._id} id={dataset._id} category={dataset.category} name={dataset.name} rating={dataset.rating} />
    })

    const noDatasetsToDisplay = <Error customMessage='No Datasets' />

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
            <Show when={!dataPlatform.isLoading && !filters.isLoading}>
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
                                    <option className='options' key={'nameAscending'} value={'name'}>Name Ascending</option>
                                    <option className='options' key={'nameDescending'} value={'-name'}>Name Descending</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className='mt-4 mb-4'>
                        {dataPlatform?.data?.datasets?.length ? datasetsToDisplay : noDatasetsToDisplay}
                    </Row>
                    <div className='text-center'>
                        {datasetRequestState.offset !== 0 && <button className='btn' onClick={prevPage}>Show Prev<i className='fa-solid fa-circle-arrow-left'></i></button>}
                        {dataPlatform?.data?.datasets?.length === 24 && <button className='btn' onClick={nextPage}>Show Next<i className='fa-solid fa-circle-arrow-right'></i></button>}
                    </div>
                </Container>
            </Show>
            <Show when={dataPlatform.isLoading || filters.isLoading}>
                <Loading />
            </Show>
        </Fragment >
    )
}

export default DataPlatformPage