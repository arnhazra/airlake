import { FC, Fragment, useContext } from 'react'
import { Col, FloatingLabel, Row, Form } from 'react-bootstrap'
import Loading from './LoadingComponent'
import ReactIf from './ReactIfComponent'
import { GlobalContext } from '@/context/globalStateProvider'
import useFetch from '@/hooks/useFetch'
import endPoints from '@/constants/Endpoints'
import HTTPMethods from '@/constants/HTTPMethods'

const DataPlatformNav: FC = () => {
    const filters = useFetch('filters', endPoints.datasetFiltersEndpoint, HTTPMethods.POST)
    const [{ datasetRequestState }, dispatch] = useContext(GlobalContext)

    const filterCategoriesToDisplay = filters?.data?.filterCategories?.map((category: string) => {
        return <option className='options' key={category} value={category}>{category}</option>
    })

    return (
        <Fragment>
            <ReactIf condition={!filters?.isLoading}>
                <Row className='g-2 mt-4'>
                    <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                        <FloatingLabel controlId='floatingSelectGrid' label='Select Filter Category'>
                            <Form.Select defaultValue={datasetRequestState.selectedFilter} onChange={(e): void => dispatch('setDatasetRequestState', { selectedFilter: e.target.value })}>
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
            </ReactIf>
            <ReactIf condition={filters?.isLoading}>
                <Loading />
            </ReactIf>
        </Fragment>
    )
}

export default DataPlatformNav