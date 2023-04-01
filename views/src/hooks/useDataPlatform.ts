import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { DatasetRequestState } from '@/types/States'
import endPoints from '@/constants/Endpoints'
import Constants from '@/constants/Constants'

const useDataPlatform = ({ searchQuery, selectedFilter, selectedSortOption, offset }: DatasetRequestState) => {
    const [state, setState] = useState({ datasets: [], isLoaded: false })
    const router = useRouter()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(endPoints.dataplatformEndpoint, { selectedSortOption, selectedFilter, searchQuery, offset })
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
    }, [selectedSortOption, selectedFilter, searchQuery, offset])

    return state
}

export default useDataPlatform