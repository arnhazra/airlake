import axios from 'axios'
import endPoints from '../constants/Endpoints'

const walletTransactionsService = (accessToken: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    const response = axios.post(endPoints.walletTransactionEndpoint)
    return response
}

export { walletTransactionsService }