import { Fragment, useContext } from 'react'
import { GlobalContext } from '@/context/globalStateProvider'
import { NextPage } from 'next'
import useSignOut from '@/hooks/useSignOut'

const AccountPage: NextPage = () => {
    const [{ userState }] = useContext(GlobalContext)
    const signout = useSignOut()

    return (
        <Fragment>
            <div className='box'>
                <p className='branding'>Account</p>
                <p className='boxtext'>Access your account information and manage your preference</p>
                <p className='boxtext'>Signed in as {userState.name}</p>
                <button className='mt-2 btn btnbox' onClick={signout.signOutFromThisDevice}>Sign Out<i className='fa-solid fa-circle-arrow-right'></i></button><br />
                <p className='all-device-signout' onClick={signout.signOutFromAllDevices}>Sign Out From All Devices</p>
            </div>
        </Fragment>
    )
}

export default AccountPage