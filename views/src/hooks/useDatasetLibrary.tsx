import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'
import { UseDatasetLibrary } from '../types/States'

const useDatasetLibrary = ({ searchQuery, selectedFilter, selectedSortOption }: UseDatasetLibrary) => {
    const [state, setState] = useState({ datasets: [], isLoaded: false })
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(endPoints.datasetLibraryEndpoint, { selectedSortOption, selectedFilter, searchQuery })
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
    }, [selectedSortOption, selectedFilter, searchQuery])

    return state
}

export default useDatasetLibrary