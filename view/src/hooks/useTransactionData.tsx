import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import endPoints from '@/constants/Endpoints'
import { toast } from 'react-hot-toast'

const useTransactionData = () => {
    const [state, setState] = useState({ transactions: [], isLoaded: false })
    const router = useRouter()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(endPoints.walletTransactionEndpoint)
                setState({ ...state, transactions: response.data.transactions, isLoaded: true })
            }

            catch (error: any) {
                if (error.response.status === 401) {
                    localStorage.removeItem('accessToken')
                    router.push('/')
                }

                else {
                    setState({ ...state, isLoaded: true })
                    toast.error('Something went wrong')
                }
            }
        })()
    }, [])

    return state
}

export default useTransactionData