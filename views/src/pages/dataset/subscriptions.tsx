import { Container, Row } from 'react-bootstrap'
import { Fragment } from 'react'
import { NextPage } from 'next'
import Loading from '@/components/LoadingComponent'
import Error from '@/components/ErrorComponent'
import ReactIf from '@/components/ReactIfComponent'
import useViewSubscriptions from '@/hooks/useViewSubscriptions'
import DatasetCard from '@/components/DatasetCardComponent'

const ViewSubscriptionsPage: NextPage = () => {
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