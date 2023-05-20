import React, { Fragment, useState } from 'react'
import { NextPage } from 'next'
import Show from '@/components/Show'
import LFTSwap from '@/utils/LFTSwap'
import WalletHome from '@/utils/WalletHome'

const WalletPage: NextPage = () => {
    const [component, setComponent] = useState('walletBalance')

    return (
        <Fragment>
            <Show when={component === 'walletBalance'}>
                <WalletHome onButtonClick={(): void => setComponent('lftSwap')} />
            </Show>
            <Show when={component === 'lftSwap'}>
                <LFTSwap onButtonClick={(): void => setComponent('walletBalance')} />
            </Show>
        </Fragment>
    )
}

export default WalletPage