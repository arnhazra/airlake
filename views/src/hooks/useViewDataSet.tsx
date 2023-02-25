import { useState, useEffect } from 'react'
import axios from 'axios'
import endPoints from '../constants/Endpoints'
import { useNavigate } from 'react-router-dom'
import { GenericIdType } from '../types/States'

const useViewDataset = ({ id }: GenericIdType) => {
    const [state, setState] = useState({ id: '', name: '', description: '', category: '', price: 0, dataLength: 0, isLoaded: false, hasError: false })
    const navigate = useNavigate()

    const getDatasetView = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            const response = await axios.post(`${endPoints.datasetViewEndpoint}/${id}`)
            const { _id, name, description, category, price } = response.data.metadata
            setState({ ...state, id: _id, name: name, description: description, category: category, price: price, dataLength: response.data.dataLength, isLoaded: true })
        }

        catch (error: any) {
            if (error.response.status === 401) {
                localStorage.removeItem('accessToken')
                navigate('/')
            }

            else {
                setState({ ...state, isLoaded: true, hasError: true })
            }
        }
    }

    useEffect(() => {
        setState({ ...state, isLoaded: false })
        getDatasetView()
    }, [id])

    return state
}

export default useViewDataset