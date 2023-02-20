import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'
import { UseDataSetLibrary } from '../types/States'

const useDataSetLibrary = ({ searchInput, selectedFilter, selectedSortOption }: UseDataSetLibrary) => {
    const [state, setState] = useState({ datasets: [], isLoaded: false })
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                const response = await axios.post(endPoints.datasetLibraryEndpoint, { selectedSortOption, selectedFilter, searchInput })
                setState({ datasets: response.data.datasets, isLoaded: true })
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
    }, [selectedSortOption, selectedFilter, searchInput])

    return state
}

export default useDataSetLibrary