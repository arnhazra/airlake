import { useContext } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Fragment } from 'react'
import Loading from '@/components/LoadingComponent'
import ReactIf from '@/components/ReactIfComponent'
import useDatasetLibrary from '@/hooks/useDatasetLibrary'
import { GlobalContext } from '@/context/globalStateProvider'
import DatasetLibraryNav from '@/components/DatasetLibraryNavComponent'
import DatasetCard from '@/components/DatasetCardComponent'
import { NextPage } from 'next'

const DatasetLibraryPage: NextPage = () => {
    const [{ datasetRequestState }, dispatch] = useContext(GlobalContext)
    const datasetLibrary = useDatasetLibrary(datasetRequestState)

    const datasetsToDisplay = datasetLibrary.datasets.map((dataset: any) => {
        return <DatasetCard key={dataset._id} id={dataset._id} category={dataset.category} name={dataset.name} price={dataset.price} />
    })

    const prevPage = () => {
        const prevDatasetReqNumber = datasetRequestState.datasetRequestNumber - 1
        dispatch('setDatasetRequestState', { datasetRequestNumber: prevDatasetReqNumber })
    }

    const nextPage = () => {
        const nextDatasetReqNumber = datasetRequestState.datasetRequestNumber + 1
        dispatch('setDatasetRequestState', { datasetRequestNumber: nextDatasetReqNumber })
    }

    return (
        <Fragment>
            <ReactIf condition={datasetLibrary.isLoaded}>
                <Container>
                    <DatasetLibraryNav />
                    <Row className='mt-4 mb-4'>
                        {datasetsToDisplay}
                    </Row>
                    <div className='text-center'>
                        <button className="btn" onClick={prevPage} disabled={datasetRequestState.datasetRequestNumber === 0}><i className='fa-solid fa-circle-arrow-left'></i>Prev Page</button>
                        <button className="btn" onClick={nextPage} disabled={datasetLibrary.datasets.length !== 12}>Next Page <i className='fa-solid fa-circle-arrow-right'></i></button>
                    </div>
                </Container>
            </ReactIf>
            <ReactIf condition={!datasetLibrary.isLoaded}>
                <Loading />
            </ReactIf>
        </Fragment>
    )
}

export default DatasetLibraryPage