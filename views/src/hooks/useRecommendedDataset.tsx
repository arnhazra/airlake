import { useState, useEffect } from 'react'
import axios from 'axios'
import endPoints from '../constants/Endpoints'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const useRecommendedDataset = () => {
    const [state, setState] = useState({ id: '', name: '', description: '', category: '', price: 0, isLoaded: false })
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                const response = await axios.post(`${endPoints.getRecommendedDatasetEndpoint}`)
                const { _id, name, description, category, price } = response.data.recommendedDataset
                setState({ ...state, id: _id, name: name, description: description, category: category, price: price, isLoaded: true })
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

export default useRecommendedDataset