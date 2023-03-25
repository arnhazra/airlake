import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { DatasetRequestState } from '@/types/States'
import endPoints from '@/constants/Endpoints'
import Constants from '@/constants/Constants'

const useDatasetLibrary = ({ searchQuery, selectedFilter, selectedSortOption, datasetRequestNumber }: DatasetRequestState) => {
    const [state, setState] = useState({ datasets: [], isLoaded: false })
    const router = useRouter()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(endPoints.datasetLibraryEndpoint, { selectedSortOption, selectedFilter, searchQuery, datasetRequestNumber })
                setState({ datasets: response.data.datasets, isLoaded: true })
            }

            catch (error: any) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('accessToken')
                    router.push('/')
                }

                setState({ ...state, isLoaded: true })
                toast.error(Constants.ToastError)
            }
        })()
    }, [selectedSortOption, selectedFilter, searchQuery, datasetRequestNumber])

    return state
}

export default useDatasetLibrary