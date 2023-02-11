import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'
import { UseDataSetStore } from '../types/States'

const useDataSetStore = ({ searchInput, selectedFilter, selectedSortOption }: UseDataSetStore) => {
    const [state, setState] = useState({ datasets: [], isLoaded: false })
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                const response = await axios.post(endPoints.datasetStoreEndpoint, { selectedSortOption, selectedFilter, searchInput })
                setState({ ...state, datasets: response.data.datasets, isLoaded: true })
            }

            catch (error: any) {
                if (error.response.status === 401) {
                    localStorage.removeItem('accessToken')
                    navigate('/')
                }
            }
        })()
    }, [selectedSortOption, selectedFilter, searchInput])

    return state
}

export default useDataSetStore