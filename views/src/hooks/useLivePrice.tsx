import { useState, useEffect } from 'react'
import axios from 'axios'
import endPoints from '@/constants/Endpoints'
import { LivePriceState } from '@/types/States'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

const useLivePrice = () => {
    const [state, setState] = useState<LivePriceState>({ inr: 0, usd: 0, eur: 0, isLoaded: false })
    const router = useRouter()

    const getLivePrice = async () => {
        try {
            const response = await axios.post(endPoints.walletLivePriceEndpoint)
            setState({ inr: response.data.ethereum.inr, usd: response.data.ethereum.usd, eur: response.data.ethereum.eur, isLoaded: true })
        }

        catch (error: any) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('accessToken')
                router.push('/')
            }

            setState({ inr: 0, usd: 0, eur: 0, isLoaded: true })
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        getLivePrice()
        const getRealtimeData = setInterval(() => getLivePrice(), 45000)
        return () => clearInterval(getRealtimeData)
    }, [])

    return state
}

export default useLivePrice