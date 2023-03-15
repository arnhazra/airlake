import { Fragment, useContext } from 'react'
import signOutService from '@/services/signOutService'
import { GlobalContext } from '@/context/globalStateProvider'
import { toast } from 'react-hot-toast'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const AccountPage: NextPage = () => {
    const router = useRouter()
    const [{ userState }, dispatch] = useContext(GlobalContext)

    const signOut = () => {
        dispatch('setUserState', { isLoaded: true })
        localStorage.removeItem('accessToken')
        router.push('/')
    }

    const signOutFromAllDevices = async () => {
        try {
            await signOutService()
            dispatch('setUserState', { isLoaded: true })
            localStorage.removeItem('accessToken')
            router.push('/')
        } catch (error) {
            toast.error('Please try again')
        }
    }

    return (
        <Fragment>
            <div className='box'>
                <p className='branding'>Account</p>
                <p className='boxtext'>Access your account information and manage your preference</p>
                <p className='boxtext'>Signed in as {userState.name}</p>
                <button className='mt-2 btn btnbox' onClick={signOut}>Sign Out<i className='fa-solid fa-circle-arrow-right'></i></button><br />
                <p className='all-device-signout' onClick={signOutFromAllDevices}>Sign Out From All Devices</p>
            </div>
        </Fragment>
    )
}

export default AccountPage