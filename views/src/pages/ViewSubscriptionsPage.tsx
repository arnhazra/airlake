import { Container, Row } from 'react-bootstrap'
import { Fragment, FC } from 'react'
import Loading from '../components/Loading'
import Error from '../components/Error'
import ReactIf from '../components/ReactIf'
import useViewSubscriptions from '../hooks/useViewSubscriptions'
import DatasetCard from '../components/DatasetCard'

const ViewSubscriptionsPage: FC = () => {
    const datasetSubscriptions = useViewSubscriptions()

    const datasetsToDisplay = datasetSubscriptions.subscribedDatasets.map((dataset: any) => {
        return <DatasetCard key={dataset._id} id={dataset._id} category={dataset.category} name={dataset.name} price={dataset.price} />
    })

    return (
        <Fragment>
            <ReactIf condition={datasetSubscriptions.isLoaded}>
                <Container>
                    <ReactIf condition={datasetSubscriptions.subscribedDatasets.length > 0}>
                        <Row className='mt-4 mb-4'>
                            {datasetsToDisplay}
                        </Row>
                    </ReactIf>
                    <ReactIf condition={datasetSubscriptions.subscribedDatasets.length === 0}>
                        <Error customMessage='No Subscriptions' />
                    </ReactIf>
                </Container>
            </ReactIf>
            <ReactIf condition={!datasetSubscriptions.isLoaded}>
                <Loading />
            </ReactIf>
        </Fragment>
    )
}

export default ViewSubscriptionsPage