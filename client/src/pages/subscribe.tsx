import { Col, Container, Row } from 'react-bootstrap'
import { Fragment, useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import jwtDecode from 'jwt-decode'
import { AppContext } from '@/context/appStateProvider'
import Show from '@/components/Show'
import SubscribeModal from '@/utils/SubscribeModal'
import UnsubscribeModal from '@/utils/UnsubscribeModal'
import { useRouter } from 'next/router'

const HomePage: NextPage = () => {
    const [{ userState, subPlanState }] = useContext(AppContext)
    const [isSubscribeModalOpened, setSubscribeModalOpened] = useState(false)
    const [isUnsubscribeModalOpened, setUnsubscribeModalOpened] = useState(false)
    const [tokenId, setTokenId] = useState('')
    const router = useRouter()

    useEffect(() => {
        try {
            const decodedSubId: any = jwtDecode(userState.subscriptionKey)
            setTokenId(decodedSubId.tokenId)
        } catch (error) {
            setTokenId('')
        }
    }, [userState.subscriptionKey])

    const hideSubscribeModal = () => {
        setSubscribeModalOpened(false)
        router.push('/dashboard')
    }

    const hideUnsubscribeModal = () => {
        setUnsubscribeModalOpened(false)
        router.push('/dashboard')
    }

    return (
        <Fragment>
            <Container>
                <div className='cover'>
                    <p className='text-center display-5'>Subscribe</p>
                    <Row className='justify-content-center mt-4'>
                        <Col xs={12} sm={6} md={6} lg={4} xl={3}>
                            <div className='jumbotron'>
                                <p className='branding text-center'>Free Plan</p>
                                <p className='display-6 text-center'><i className='fa-brands fa-ethereum'></i>0</p>
                                <p className='lead'><i className='fa-solid fa-circle-check'></i>Metadata API</p>
                                <p className='lead'><i className='fa-solid fa-circle-check'></i>Lifetime Free</p>
                                <Show when={userState.subscriptionKey.length === 0}>
                                    <button disabled className='btn btn-block'>Current Plan <i className='fa-solid fa-circle-check'></i></button>
                                </Show>
                                <Show when={userState.subscriptionKey.length > 0}>
                                    <button className='btn btn-block' onClick={() => setUnsubscribeModalOpened(true)}>Downgrade</button>
                                </Show>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={4} xl={3}>
                            <div className='jumbotron'>
                                <p className='branding text-center'>Airlake Pro</p>
                                <p className='display-6 text-center'><i className='fa-brands fa-ethereum'></i>{subPlanState.proSubscriptionPrice}/mo</p>
                                <p className='lead'><i className='fa-solid fa-circle-check'></i>Data API</p>
                                <p className='lead'><i className='fa-solid fa-circle-check'></i>Premium Features</p>
                                <Show when={userState.subscriptionKey.length === 0}>
                                    <button className='btn btn-block' onClick={() => setSubscribeModalOpened(true)}>Pay & Subscribe</button>
                                </Show>
                                <Show when={userState.subscriptionKey.length > 0}>
                                    <button disabled className='btn btn-block'>Current Plan <i className='fa-solid fa-circle-check'></i></button>
                                </Show>
                            </div>
                        </Col>
                    </Row>
                </div>
                <SubscribeModal price={365} isOpened={isSubscribeModalOpened} closeModal={() => { hideSubscribeModal() }} />
                <UnsubscribeModal tokenId={tokenId} refundAmount={180} isOpened={isUnsubscribeModalOpened} closeModal={() => { hideUnsubscribeModal() }} />
            </Container>
        </Fragment >
    )
}

export default HomePage