import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'

const useIsSubscribed = ({ id }: any) => {
    const [state, setState] = useState({ isSubscribed: false, isLoaded: false })
    const navigate = useNavigate()

    const checkIfSubscribed = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            const response = await axios.post(`/api/subscription/issubscribed/${id}`)
            setState({ isSubscribed: response.data.isSubscribed, isLoaded: true })
        }

        catch (error: any) {
            if (error.response.status === 401) {
                localStorage.removeItem('accessToken')
                navigate('/')
            }
        }
    }

    useEffect(() => {
        checkIfSubscribed()
    }, [])

    return state
}

export default useIsSubscribed