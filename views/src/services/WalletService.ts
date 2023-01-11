import axios from 'axios'
import endPoints from '../constants/Endpoints'

const walletDashBoardService = async (accessToken: string) => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        const response = await axios.post(endPoints.walletDashboardEndpoint)
        return response
    }

    catch (error: any) {
        throw error
    }
}

export { walletDashBoardService }