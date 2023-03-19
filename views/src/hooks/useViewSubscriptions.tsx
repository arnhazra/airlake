import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import endPoints from '@/constants/Endpoints'
import { toast } from 'react-hot-toast'

const useViewSubscriptions = () => {
    const [state, setState] = useState({ subscribedDatasets: [], isLoaded: false })
    const router = useRouter()

    const getDatasetLibraryData = async () => {
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
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        getDatasetLibraryData()
    }, [])

    return state
}

export default useViewSubscriptions