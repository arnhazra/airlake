//Import Statements
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'

//useAUth Hook
const useAuth = () => {
    const [state, setState] = useState({ userid: '', name: '', isLoaded: false })
    const navigate = useNavigate()

    const verifyAuth = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            const response = await axios.post(endPoints.useAuthEndpoint)
            setState({ userid: response.data.user._id, name: response.data.user.name, isLoaded: true })
        }

        catch (error: any) {
            if (error.response.status === 401) {
                localStorage.removeItem('accessToken')
                navigate('/')
            }
        }
    }

    useEffect(() => {
        verifyAuth()
        const getRealtimeData = setInterval(() => verifyAuth(), 60000)

        return () => {
            clearInterval(getRealtimeData)
        }
    }, [])

    return state
}

//Export Statement
export default useAuth