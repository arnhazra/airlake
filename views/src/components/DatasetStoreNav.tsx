import { FC, Fragment, useContext } from 'react'
import { Col, FloatingLabel, Row, Form } from 'react-bootstrap'
import Loading from './Loading'
import ReactIf from './ReactIf'
import { GlobalContext } from '../context/globalStateProvider'
import useFilterCategories from '../hooks/useFilterCategories'
import useSortOptions from '../hooks/useSortOptions'
import { DatasetStoreHeaderProps } from '../types/Props'

const DatasetStoreNav: FC<DatasetStoreHeaderProps> = ({ datasetCount }) => {
    const filterCategories = useFilterCategories()
    const sortOptions = useSortOptions()
    const [, dispatch] = useContext(GlobalContext)

    const filterCategoriesToDisplay = filterCategories.categories.map((category: string) => {
        return <option className='options' key={category} value={category}>{category}</option>
    })

    const sortOptionsToDisplay = sortOptions.options.map((option: string) => {
        return <option className='options' key={option} value={option}>{option}</option>
    })

    return (
        <Fragment>
            <ReactIf condition={filterCategories.isLoaded && sortOptions.isLoaded}>
                <Row className="g-2 mt-4">
                    <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                        <FloatingLabel controlId="floatingSelectGrid" label="Select Category">
                            <Form.Select defaultValue={"All"} aria-label="Floating label select example" onChange={(e): void => dispatch('setDatasetRequestState', { selectedFilter: e.target.value })}>
                                {filterCategoriesToDisplay}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                        <FloatingLabel controlId="floatingSelectGrid" label="Sort By">
                            <Form.Select defaultValue={"Freshness"} aria-label="Floating label select example" onChange={(e): void => dispatch('setDatasetRequestState', { selectedSortOption: e.target.value })}>
                                {sortOptionsToDisplay}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>

            </ReactIf>
            <ReactIf condition={!filterCategories.isLoaded || !sortOptions.isLoaded}>
                <Loading />
            </ReactIf>
        </Fragment>
    )
}

export default DatasetStoreNav