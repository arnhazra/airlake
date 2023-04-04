import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import endPoints from '@/constants/Endpoints'
import { UseIsSubscribed } from '@/types/States'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/Constants'

const useIsSubscribed = ({ datasetId, hasClickedSubscribed }: UseIsSubscribed) => {
    const [state, setState] = useState({ isSubscribed: false, subscriptionId: '', isLoaded: false })
    const router = useRouter()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(`${endPoints.checkSubscriptionEndpoint}`, { datasetId })
                setState({ isSubscribed: response.data.isSubscribed, subscriptionId: response.data.subscriptionId, isLoaded: true })
            }

            catch (error: any) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('accessToken')
                    router.push('/')
                }

                setState({ ...state, isLoaded: true })
                toast.error(Constants.ToastError)
            }
        })()
    }, [datasetId, hasClickedSubscribed])

    return state
}

export default useIsSubscribed