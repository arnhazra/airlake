import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'

const useSignOut = () => {
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                await axios.post(endPoints.signOutEndpoint)
                localStorage.removeItem('accessToken')
                navigate('/')
            }

            catch (error) {
                localStorage.removeItem('accessToken')
                navigate('/')
            }
        })()
    }, [])
}

export default useSignOut