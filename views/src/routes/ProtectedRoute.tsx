import { FC, Fragment, useContext, useEffect } from 'react'
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import ReactIf from '../components/ReactIf'
import { GlobalContext } from '../context/globalStateProvider'
import axios from 'axios'
import endPoints from '../constants/Endpoints'
import toast from 'react-hot-toast'

const ProtectedRoute: FC = () => {
    const [{ userState }, dispatch] = useContext(GlobalContext)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
                const response = await axios.post(endPoints.verifyAuthEndpoint)
                dispatch('setUserState', { userid: response.data.user._id, name: response.data.user.name, isLoaded: true, isAuthorized: true })
            }

            catch (error: any) {
                if (error.response) {
                    if (error.response.status === 401) {
                        localStorage.removeItem('accessToken')
                        dispatch('setUserState', { isLoaded: true, isAuthorized: false })
                        navigate('/')
                    }

                    else {
                        dispatch('setUserState', { isLoaded: true })
                        toast.error('Something went wrong')
                    }
                }

                else {
                    localStorage.removeItem('accessToken')
                    dispatch('setUserState', { isLoaded: true, isAuthorized: false })
                    navigate('/')
                }
            }
        })()
    }, [location.pathname])


    return (
        <Fragment>
            <ReactIf condition={userState.isLoaded}>
                <ReactIf condition={userState.isAuthorized}>
                    <Outlet />
                </ReactIf>
                <ReactIf condition={!userState.isAuthorized}>
                    <Navigate to='/' />
                </ReactIf>
            </ReactIf>
            <ReactIf condition={!userState.isLoaded}>
                <Loading />
            </ReactIf>
        </Fragment>
    )
}

export default ProtectedRoute