import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'
import { UseDataSetStore } from '../types/States'
import { GlobalContext } from '../context/globalStateProvider'

const useDataSetStore = ({ searchInput, selectedFilter, selectedSortOption }: UseDataSetStore) => {
    const [state, setState] = useState({ isLoaded: false })
    const navigate = useNavigate()
    const [, dispatch] = useContext(GlobalContext)

    useEffect(() => {
        (async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                const response = await axios.post(endPoints.datasetStoreEndpoint, { selectedSortOption, selectedFilter, searchInput })
                setState({ isLoaded: true })
                dispatch('setDatasetResponseState', { datasets: response.data.datasets })
            }

            catch (error: any) {
                if (error.response.status === 401) {
                    localStorage.removeItem('accessToken')
                    navigate('/')
                }

                else {
                    setState({ isLoaded: true })
                    toast.error('Something went wrong')
                }
            }
        })()
    }, [selectedSortOption, selectedFilter, searchInput])

    return state
}

export default useDataSetStore