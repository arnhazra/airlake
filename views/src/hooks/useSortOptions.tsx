import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'

const useSortOptions = () => {
    const [state, setState] = useState({ options: [], isLoaded: false })
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                const response = await axios.post(endPoints.datasetSortOptionsEndpoint)
                setState({ ...state, options: response.data.options, isLoaded: true })
            }

            catch (error: any) {
                if (error.response.status === 401) {
                    localStorage.removeItem('accessToken')
                    navigate('/')
                }
            }
        })()
    }, [])

    return state
}

export default useSortOptions