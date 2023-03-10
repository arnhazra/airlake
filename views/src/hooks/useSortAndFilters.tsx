import { useState, useEffect } from 'react'
import axios from 'axios'
import endPoints from '../constants/Endpoints'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const useSortAndFilters = () => {
    const [state, setState] = useState({ sortOptions: [], filterCategories: [], isLoaded: false })
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(endPoints.datasetSortAndFilterOptionsEndpoint)
                setState({ ...state, sortOptions: response.data.sortOptions, filterCategories: response.data.filterCategories, isLoaded: true })
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
        })()
    }, [])

    return state
}

export default useSortAndFilters