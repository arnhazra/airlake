import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import endPoints from '../constants/Endpoints'

const useTransactionData = () => {
    const [state, setState] = useState({ transactions: [], isLoaded: false })
    const navigate = useNavigate()

    const getAllTransactions = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            const response = await axios.post(endPoints.walletTransactionEndpoint)
            setState({ ...state, transactions: response.data.transactions, isLoaded: true })
        }

        catch (error: any) {
            if (error.response.status === 401) {
                localStorage.removeItem('accessToken')
                navigate('/')
            }
        }
    }

    useEffect(() => {
        getAllTransactions()
        const getRealtimeData = setInterval(() => getAllTransactions(), 30000)
        return () => clearInterval(getRealtimeData)
    }, [])

    return state
}

export default useTransactionData