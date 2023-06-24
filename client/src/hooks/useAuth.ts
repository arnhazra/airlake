import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import endPoints from '@/constants/apiEndpoints'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { AppContext } from '@/context/appStateProvider'
import Constants from '@/constants/appConstants'

const useAuth = () => {
    const [, dispatch] = useContext(AppContext)
    const [state, setState] = useState({ isLoaded: false })
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            (async () => {
                try {
                    const response = await axios.post(endPoints.userDetailsEndpoint)
                    const userid = response.data.user._id
                    const { name, email, privateKey, role, subscriptionKey } = response.data.user
                    const { basicSubscriptionPrice, standardSubscriptionPrice, premiumSubscriptionPrice } = response.data.subscriptionCharges
                    const { subscriptionKeyUsage } = response.data
                    dispatch('setUserState', { userid, name, email, privateKey, role, subscriptionKey, subscriptionKeyUsage })
                    dispatch('setSubPlanState', { basicSubscriptionPrice, standardSubscriptionPrice, premiumSubscriptionPrice })
                    setState({ isLoaded: true })
                }

                catch (error: any) {
                    if (error.response) {
                        if (error.response.status === 401) {
                            localStorage.removeItem('accessToken')
                            setState({ isLoaded: true })
                            router.push('/')
                        }

                        else {
                            setState({ isLoaded: true })
                            toast.error(Constants.ToastError)
                        }
                    }

                    else {
                        setState({ isLoaded: true })
                        toast.error(Constants.ToastError)
                    }
                }
            })()
        }

        else {
            setState({ isLoaded: true })
        }
    }, [router.pathname])

    return state
}

export default useAuth