import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'
import { toast } from 'react-hot-toast'

const useViewSubscriptions = () => {
    const [state, setState] = useState({ subscribedDatasets: [], isLoaded: false })
    const navigate = useNavigate()

    const getDatasetLibraryData = async () => {
        try {
            const response = await axios.post(endPoints.datasetSubscriptionEndpoint)
            setState({ ...state, subscribedDatasets: response.data.subscribedDatasets, isLoaded: true })
        }

        catch (error: any) {
            if (error.response.status === 401) {
                localStorage.removeItem('accessToken')
                navigate('/')
            }

            else {
                setState({ ...state, isLoaded: true })
                toast.error('Something went wrong')
            }
        }
    }

    useEffect(() => {
        getDatasetLibraryData()
    }, [])

    return state
}

export default useViewSubscriptions