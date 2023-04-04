import axios, { Method } from 'axios'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/Constants'

function useFetch(queryKey: string, queryUrl: string, method: Method, params?: object) {
    const router = useRouter()

    const fetchDataFunction = async () => {
        const { data } = await axios(queryUrl, { method, params })
        return data
    }

    const { data, isLoading } = useQuery(
        queryKey,
        () => fetchDataFunction(),
        {
            enabled: true,
            retry: 3,
            refetchOnWindowFocus: false,
            retryDelay: 2500,
            onError(err: any) {
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('accessToken')
                    router.push('/')
                }

                toast.error(`${Constants.ToastError} fetching ${queryKey}`)
            },
        }
    )

    return { data, isLoading }
}

export default useFetch