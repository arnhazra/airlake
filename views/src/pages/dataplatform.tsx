import { useContext, useRef } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Fragment } from 'react'
import Loading from '@/components/LoadingComponent'
import ReactIf from '@/components/ReactIfComponent'
import { GlobalContext } from '@/context/globalStateProvider'
import DataPlatformNav from '@/components/DataPlatformNavComponent'
import DatasetCard from '@/components/DatasetCardComponent'
import { NextPage } from 'next'
import useFetch from '@/hooks/useFetch'
import endPoints from '@/constants/Endpoints'
import HTTPMethods from '@/constants/HTTPMethods'

const DataPlatformPage: NextPage = () => {
    const [{ datasetRequestState }, dispatch] = useContext(GlobalContext)
    const dataPlatform = useFetch('data platform', endPoints.dataplatformEndpoint, HTTPMethods.POST, datasetRequestState)
    console.log(dataPlatform)

    const datasetsToDisplay = dataPlatform?.data?.datasets?.map((dataset: any) => {
        return <DatasetCard key={dataset._id} id={dataset._id} category={dataset.category} name={dataset.name} price={dataset.price} />
    })

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
            <ReactIf condition={!dataPlatform.isLoading}>
                <Container>
                    <DataPlatformNav />
                    <Row className='mt-4 mb-4'>
                        {datasetsToDisplay}
                    </Row>
                    <div className='text-center'>
                        <button className='btn' onClick={prevPage} disabled={datasetRequestState.offset === 0}><i className='fa-solid fa-circle-arrow-left'></i></button>
                        <button className='btn' onClick={nextPage} disabled={dataPlatform?.data?.datasets?.length !== 24}><i className='fa-solid fa-circle-arrow-right'></i></button>
                    </div>
                </Container>
            </ReactIf>
            <ReactIf condition={dataPlatform.isLoading}>
                <Loading />
            </ReactIf>
        </Fragment>
    )
}

export default DataPlatformPage