import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'
import { UseIsSubscribed } from '../types/States'

const useIsSubscribed = ({ id, hasClickedSubscribed }: UseIsSubscribed) => {
    const [state, setState] = useState({ isSubscribed: false, subscriptionId: '', isLoaded: false })
    const navigate = useNavigate()

    const checkIfSubscribed = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            const response = await axios.post(`${endPoints.checkSubscriptionEndpoint}/${id}`)
            setState({ isSubscribed: response.data.isSubscribed, subscriptionId: response.data.subscriptionId, isLoaded: true })
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
    }, [id, hasClickedSubscribed])

    return state
}

export default useIsSubscribed