import { FC, Fragment, useContext } from 'react'
import { Col, FloatingLabel, Row, Form } from 'react-bootstrap'
import Loading from './LoadingComponent'
import ReactIf from './ReactIfComponent'
import { GlobalContext } from '@/context/globalStateProvider'
import useSortAndFilters from '@/hooks/useSortAndFilters'

const DatasetLibraryNav: FC = () => {
    const sortAndFilters = useSortAndFilters()
    const [{ datasetRequestState }, dispatch] = useContext(GlobalContext)

    const filterCategoriesToDisplay = sortAndFilters.filterCategories.map((category: string) => {
        return <option className='options' key={category} value={category}>{category}</option>
    })

    const sortOptionsToDisplay = sortAndFilters.sortOptions.map((option: string) => {
        return <option className='options' key={option} value={option}>{option}</option>
    })

    return (
        <Fragment>
            <ReactIf condition={sortAndFilters.isLoaded}>
                <Row className='g-2 mt-4'>
                    <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                        <FloatingLabel controlId='floatingSelectGrid' label='Select Category'>
                            <Form.Select defaultValue={datasetRequestState.selectedFilter} aria-label='Floating label select example' onChange={(e): void => dispatch('setDatasetRequestState', { selectedFilter: e.target.value })}>
                                {filterCategoriesToDisplay}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                        <FloatingLabel controlId='floatingSelectGrid' label='Sort By'>
                            <Form.Select defaultValue={datasetRequestState.selectedSortOption} aria-label='Floating label select example' onChange={(e): void => dispatch('setDatasetRequestState', { selectedSortOption: e.target.value })}>
                                {sortOptionsToDisplay}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
            </ReactIf>
            <ReactIf condition={!sortAndFilters.isLoaded}>
                <Loading />
            </ReactIf>
        </Fragment>
    )
}

export default DatasetLibraryNav