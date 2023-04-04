import axios, { Method } from 'axios'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/Constants'

function useFetchRealtime(queryKey: string, queryUrl: string, method: Method, requestBody?: object) {
    const router = useRouter()

    const fetchDataFunction = async () => {
        const { data } = await axios({ method, url: queryUrl, data: requestBody })
        return data
    }

    const { data, isLoading } = useQuery(
        queryKey,
        () => fetchDataFunction(),
        {
            enabled: true,
            retry: 3,
            refetchOnWindowFocus: true,
            refetchInterval: 30000,
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

export default useFetchRealtime