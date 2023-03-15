import axios from 'axios'
import endPoints from '@/constants/Endpoints'

const signOutService = () => {
    return axios.post(endPoints.signOutEndpoint)
}

export default signOutService