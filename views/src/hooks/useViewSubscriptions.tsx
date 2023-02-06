import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'

const useViewSubscriptions = () => {
    const [state, setState] = useState({ subscribedDatasets: [], isLoaded: false })
    const navigate = useNavigate()

    const getDataSetStoreData = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            const response = await axios.post(endPoints.datasetSubscriptionEndpoint)
            setState({ ...state, subscribedDatasets: response.data.subscribedDatasets, isLoaded: true })
        }

        catch (error: any) {
            if (error.response.status === 401) {
                localStorage.removeItem('accessToken')
                navigate('/')
            }
        }
    }

    useEffect(() => {
        getDataSetStoreData()
    }, [])

    return state
}

export default useViewSubscriptions