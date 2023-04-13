import { Container, Row } from 'react-bootstrap'
import { Fragment } from 'react'
import { NextPage } from 'next'
import Loading from '@/components/Loading'
import Error from '@/components/ErrorComp'
import ReactIf from '@/components/ReactIf'
import DatasetCard from '@/components/DatasetCard'
import useFetchRealtime from '@/hooks/useFetchRealtime'
import endPoints from '@/constants/Endpoints'
import HTTPMethods from '@/constants/HTTPMethods'

const ViewSubscriptionsPage: NextPage = () => {
    const datasetSubscriptions = useFetchRealtime('subscriptions', endPoints.datasetSubscriptionEndpoint, HTTPMethods.POST)

    const datasetsToDisplay = datasetSubscriptions?.data?.subscribedDatasets?.map((dataset: any) => {
        return <DatasetCard key={dataset._id} id={dataset._id} category={dataset.category} name={dataset.name} price={dataset.price} />
    })

    return (
        <Fragment>
            <ReactIf condition={!datasetSubscriptions.isLoading}>
                <Container>
                    <ReactIf condition={datasetSubscriptions?.data?.subscribedDatasets?.length > 0}>
                        <Row className='mt-4 mb-4'>
                            {datasetsToDisplay}
                        </Row>
                    </ReactIf>
                    <ReactIf condition={datasetSubscriptions?.data?.subscribedDatasets?.length === 0}>
                        <Error customMessage='No Subscriptions' />
                    </ReactIf>
                </Container>
            </ReactIf>
            <ReactIf condition={datasetSubscriptions.isLoading}>
                <Loading />
            </ReactIf>
        </Fragment>
    )
}

export default ViewSubscriptionsPage