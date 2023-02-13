import axios from 'axios'
import endPoints from '../constants/Endpoints'

const verifyAuthService = async () => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        const response = await axios.post(endPoints.verifyAuthEndpoint)
        return response
    }

    catch (error: any) {
        return error
    }
}

export default verifyAuthService