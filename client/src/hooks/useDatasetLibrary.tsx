import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import endPoints from '../constants/Endpoints'
import { UseDatasetLibrary } from '../types/States'
import { useRouter } from 'next/router'

const useDatasetLibrary = ({ searchInput, selectedFilter, selectedSortOption }: UseDatasetLibrary) => {
    const [state, setState] = useState({ datasets: [], isLoaded: false })
    const router = useRouter()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(endPoints.datasetLibraryEndpoint, { selectedSortOption, selectedFilter, searchInput })
                setState({ datasets: response.data.datasets, isLoaded: true })
            }

            catch (error: any) {
                if (error.response.status === 401) {
                    localStorage.removeItem('accessToken')
                    router.push('/')
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

export default useDatasetLibrary