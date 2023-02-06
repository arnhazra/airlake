import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'

const useFilterCategories = () => {
    const [state, setState] = useState({ categories: [], isLoaded: false })
    const navigate = useNavigate()

    const getFilterCategories = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            const response = await axios.post(endPoints.datasetFilterCategoriesEndpoint)
            setState({ ...state, categories: response.data.categories, isLoaded: true })
        }

        catch (error: any) {
            if (error.response.status === 401) {
                localStorage.removeItem('accessToken')
                navigate('/')
            }
        }
    }

    useEffect(() => {
        getFilterCategories()
    }, [])

    return state
}

export default useFilterCategories