import { useState, useEffect } from 'react'
import axios from 'axios'
import endPoints from '@/constants/Endpoints'
import { useRouter } from 'next/router'
import { GenericIdType } from '@/types/States'

const useViewDataset = ({ id }: GenericIdType) => {
    const [state, setState] = useState({ id: '', name: '', description: '', category: '', price: 0, dataLength: 0, isLoaded: false, hasError: false })
    const router = useRouter()

    const getDatasetView = async () => {
        try {
            const response = await axios.post(`${endPoints.datasetViewEndpoint}/${id}`)
            const { _id, name, description, category, price } = response.data.metadata
            setState({ ...state, id: _id, name: name, description: description, category: category, price: price, dataLength: response.data.dataLength, isLoaded: true })
        }

        catch (error: any) {
            if (error.response.status === 401) {
                localStorage.removeItem('accessToken')
                router.push('/')
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