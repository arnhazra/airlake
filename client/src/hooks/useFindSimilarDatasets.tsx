import { useState, useEffect } from 'react'
import axios from 'axios'
import endPoints from '../constants/Endpoints'
import { useNavigate } from 'react-router-dom'
import { GenericIdType } from '../types/States'
import toast from 'react-hot-toast'

const useFindSimilarDatasets = ({ id }: GenericIdType) => {
    const [state, setState] = useState({ similarDatasets: [], isLoaded: false })
    const navigate = useNavigate()

    const findSimilarDatasets = async () => {
        try {
            const response = await axios.post(`${endPoints.findsimilarDatasets}/${id}`)
            setState({ ...state, similarDatasets: response.data.similarDatasets, isLoaded: true })
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
        findSimilarDatasets()
    }, [])

    return state
}

export default useFindSimilarDatasets