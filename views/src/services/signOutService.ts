import axios from 'axios'
import endPoints from '../constants/Endpoints'

const signOutService = () => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        axios.post(endPoints.signOutEndpoint)
        localStorage.removeItem('accessToken')
    }

    catch (error) {
        localStorage.removeItem('accessToken')
    }
}

export default signOutService