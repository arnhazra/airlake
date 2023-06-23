import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap'
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
    const [selectedPlan, setSelectedPlan] = useState('Pro')
    const [isSubscribeModalOpened, setSubscribeModalOpened] = useState(false)
    const [isUnsubscribeModalOpened, setUnsubscribeModalOpened] = useState(false)
    const [tokenId, setTokenId] = useState('')

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
    }

    const hideUnsubscribeModal = () => {
        setUnsubscribeModalOpened(false)
    }

    return (
        <Fragment>
            <div className="box">
                <p className='branding'>Subscribe</p>
                <p className='boxtext'>Choose your Plan</p>
                <ButtonGroup className='btn-group-card'>
                    <Button className={selectedPlan === 'Free' ? 'btn-grp-btn-sel' : 'btn-grp-btn'} onClick={(): void => setSelectedPlan('Free')}>FREE</Button>
                    <Button className={selectedPlan === 'Pro' ? 'btn-grp-btn-sel' : 'btn-grp-btn'} onClick={(): void => setSelectedPlan('Pro')}>PRO</Button>
                </ButtonGroup>
                <div>
                    <Show when={selectedPlan === 'Free'}>
                        <p className='branding text-center'><i className='fa-brands fa-ethereum'></i>0</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Metadata API</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Lifetime Free</p>
                        <Show when={userState.subscriptionKey.length === 0}>
                            <Button disabled className='btn-block'>Current Plan <i className='fa-solid fa-circle-check'></i></Button>
                        </Show>
                        <Show when={userState.subscriptionKey.length > 0}>
                            <Button className='btn-block' onClick={() => setUnsubscribeModalOpened(true)}>Downgrade</Button>
                        </Show>
                    </Show>
                    <Show when={selectedPlan === 'Pro'}>
                        <p className='branding text-center'><i className='fa-brands fa-ethereum'></i>{subPlanState.proSubscriptionPrice}/mo</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Data API</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Premium Features</p>
                        <Show when={userState.subscriptionKey.length === 0}>
                            <Button className='btn-block' onClick={() => setSubscribeModalOpened(true)}>Pay & Subscribe</Button>
                        </Show>
                        <Show when={userState.subscriptionKey.length > 0}>
                            <Button disabled className='btn-block'>Current Plan <i className='fa-solid fa-circle-check'></i></Button>
                        </Show>
                    </Show>
                </div>
            </div>
            <SubscribeModal price={Number(subPlanState.proSubscriptionPrice) * 10000} isOpened={isSubscribeModalOpened} closeModal={() => { hideSubscribeModal() }} />
            <UnsubscribeModal tokenId={tokenId} refundAmount={Number(subPlanState.proSubscriptionPrice) * 5000} isOpened={isUnsubscribeModalOpened} closeModal={() => { hideUnsubscribeModal() }} />
        </Fragment>
    )
}

export default HomePage