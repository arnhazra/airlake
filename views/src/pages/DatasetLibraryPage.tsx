import { useContext } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Fragment, FC } from 'react'
import Loading from '../components/Loading'
import ReactIf from '../components/ReactIf'
import useDatasetLibrary from '../hooks/useDatasetLibrary'
import { GlobalContext } from '../context/globalStateProvider'
import DatasetLibraryNav from '../components/DatasetLibraryNav'
import DatasetCard from '../components/DatasetCard'

const DatasetLibraryPage: FC = () => {
    const [{ datasetRequestState }] = useContext(GlobalContext)
    const datasetLibrary = useDatasetLibrary(datasetRequestState)

    const datasetsToDisplay = datasetLibrary.datasets.map((dataset: any) => {
        return <DatasetCard key={dataset._id} id={dataset._id} category={dataset.category} name={dataset.name} price={dataset.price} />
    })

    return (
        <Fragment>
            <ReactIf condition={datasetLibrary.isLoaded}>
                <Container>
                    <DatasetLibraryNav datasetCount={datasetLibrary.datasets.length} />
                    <Row className='mt-4 mb-4'>
                        {datasetsToDisplay}
                    </Row>
                </Container>
            </ReactIf>
            <ReactIf condition={!datasetLibrary.isLoaded}>
                <Loading />
            </ReactIf>
        </Fragment>
    )
}

export default DatasetLibraryPage