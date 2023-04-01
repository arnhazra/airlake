import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import endPoints from '@/constants/Endpoints'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/Constants'

const useViewSubscriptions = () => {
    const [state, setState] = useState({ subscribedDatasets: [], isLoaded: false })
    const router = useRouter()

    const getSubscriptionsData = async () => {
        try {
            const response = await axios.post(endPoints.datasetSubscriptionEndpoint)
            setState({ ...state, subscribedDatasets: response.data.subscribedDatasets, isLoaded: true })
        }

        catch (error: any) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('accessToken')
                router.push('/')
            }

            setState({ ...state, isLoaded: true })
            toast.error(Constants.ToastError)
        }
    }

    useEffect(() => {
        getSubscriptionsData()
    }, [])

    return state
}

export default useViewSubscriptions