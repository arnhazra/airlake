import { Fragment, useContext } from 'react'
import { GlobalContext } from '@/context/globalStateProvider'
import { NextPage } from 'next'
import endPoints from '@/constants/Endpoints'
import Show from '@/components/Show'
import { Container } from 'react-bootstrap'
import Constants from '@/constants/Constants'
import Link from 'next/link'
import Loading from '@/components/Loading'
import useFetchRealtime from '@/hooks/useFetchRealtime'
import HTTPMethods from '@/constants/HTTPMethods'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const AccountPage: NextPage = () => {
    const [{ userState }] = useContext(GlobalContext)
    const router = useRouter()
    const transactions = useFetchRealtime('transactions', endPoints.getTransactionsEndpoint, HTTPMethods.POST)

    const signOutFromThisDevice = () => {
        localStorage.removeItem('accessToken')
        router.push('/')
    }

    const signOutFromAllDevices = async () => {
        try {
            await axios.post(endPoints.signOutEndpoint)
            localStorage.removeItem('accessToken')
            router.push('/')
        } catch (error) {
            toast.error(Constants.ToastError)
        }
    }

    return (
        <Fragment>
            <Show when={!transactions.isLoading}>
                <div className='box'>
                    <p className='branding'>Account</p>
                    <div className='info text-center'>
                        <p className='lead text-center'>Signed in as {userState.name}</p>
                        <button className='btn btn-block' onClick={signOutFromThisDevice}>Sign Out<i className='fa-solid fa-circle-arrow-right'></i></button><br />
                        <button className='btn btn-block' onClick={signOutFromAllDevices}>Sign Out From All Devices<i className="fa-solid fa-square-arrow-up-right"></i></button>
                    </div>
                </div>
            </Show>
            <Show when={transactions.isLoading}>
                <Loading />
            </Show>
        </Fragment >
    )
}

export default AccountPage