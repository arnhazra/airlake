import { useState, useEffect } from 'react'
import axios from 'axios'
import endPoints from '../constants/Endpoints'
import { useNavigate } from 'react-router-dom'
import { GenericIdType } from '../types/States'

const useFindSimilarDatasets = ({ id }: GenericIdType) => {
    const [state, setState] = useState({ similarDatasets: [], isLoaded: false, hasError: false })
    const navigate = useNavigate()

    const findSimilarDatasets = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            const response = await axios.post(`${endPoints.findsimilarDatasets}/${id}`)
            setState({ ...state, similarDatasets: response.data.similarDatasets, isLoaded: true })
        }

        catch (error: any) {
            if (error.response.status === 401) {
                localStorage.removeItem('accessToken')
                navigate('/')
            }

            else {
                setState({ ...state, isLoaded: true, hasError: true })
            }
        }
    }

    useEffect(() => {
        findSimilarDatasets()
    }, [])

    return state
}

export default useFindSimilarDatasets