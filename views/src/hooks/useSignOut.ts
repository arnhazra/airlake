import axios from 'axios'
import endPoints from '@/constants/Endpoints'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import Constants from '@/constants/Constants'

const useSignOut = () => {
    const router = useRouter()

    const signOutFromThisDevice = () => {
        localStorage.removeItem('accessToken')
        router.push('/')
    }

    const signOutFromAllDevices = async () => {
        try {
            await axios.post(endPoints.signOutEndpoint)
            localStorage.removeItem('accessToken')
            router.push('/')
        } catch (error) {
            toast.error(Constants.ToastError)
        }
    }

    return { signOutFromThisDevice, signOutFromAllDevices }
}

export default useSignOut