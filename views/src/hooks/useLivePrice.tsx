import { useState, useEffect } from 'react'
import axios from 'axios'
import endPoints from '../constants/Endpoints'

const useLivePrice = () => {
    const [state, setState] = useState({ inr: 0, usd: 0, eur: 0, isLoaded: false })

    const getLivePrice = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            const response = await axios.post(endPoints.walletLivePriceEndpoint)
            setState({ inr: response.data.ethereum.inr, usd: response.data.ethereum.usd, eur: response.data.ethereum.eur, isLoaded: true })
        }

        catch (error: any) {
            setState({ inr: 0, usd: 0, eur: 0, isLoaded: true })
        }
    }

    useEffect(() => {
        getLivePrice()
        const getRealtimeData = setInterval(() => getLivePrice(), 55000)
        return () => clearInterval(getRealtimeData)
    }, [])

    return state
}

export default useLivePrice