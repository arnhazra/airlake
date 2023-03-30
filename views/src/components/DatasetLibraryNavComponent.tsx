import { FC, Fragment, useContext } from 'react'
import { Col, FloatingLabel, Row, Form } from 'react-bootstrap'
import Loading from './LoadingComponent'
import ReactIf from './ReactIfComponent'
import { GlobalContext } from '@/context/globalStateProvider'
import useFilters from '@/hooks/useFilters'

const DatasetLibraryNav: FC = () => {
    const filters = useFilters()
    const [{ datasetRequestState }, dispatch] = useContext(GlobalContext)

    const filterCategoriesToDisplay = filters.filterCategories.map((category: string) => {
        return <option className='options' key={category} value={category}>{category}</option>
    })

    return (
        <Fragment>
            <ReactIf condition={filters.isLoaded}>
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
                                <option className='options' key={'nameAscending'} value={'nameAscending'}>Name Ascending</option>
                                <option className='options' key={'nameDescending'} value={'nameDescending'}>Name Descending</option>
                                <option className='options' key={'priceAscending'} value={'priceAscending'}>Price Ascending</option>
                                <option className='options' key={'priceDescending'} value={'priceDescending'}>Price Descending</option>
                                <option className='options' key={'freshness'} value={'freshness'}>Dataset Freshness</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
            </ReactIf>
            <ReactIf condition={!filters.isLoaded}>
                <Loading />
            </ReactIf>
        </Fragment>
    )
}

export default DatasetLibraryNav