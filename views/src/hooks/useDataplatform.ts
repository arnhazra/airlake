import { useContext, useEffect, useState } from 'react'
import endPoints from '@/constants/Endpoints'
import { GlobalContext } from '@/context/globalStateProvider'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/Constants'
import HTTPMethods from '@/constants/HTTPMethods'

const useDataplatform = () => {
    const [datasets, setDatasets] = useState<any[]>([])
    const [isLoaded, setLoaded] = useState(false)
    const router = useRouter()
    const [{ datasetRequestState }] = useContext(GlobalContext)

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios({ method: HTTPMethods.POST, url: endPoints.dataplatformEndpoint, data: datasetRequestState })
                setDatasets([...datasets, ...data.datasets])
                setLoaded(true)
            }

            catch (error: any) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('accessToken')
                    router.push('/')
                }

                setLoaded(true)
                toast.error(`${Constants.ToastError} fetching data platform`)
            }
        })()
    }, [datasetRequestState])

    return { datasets, isLoaded }
}

export default useDataplatform