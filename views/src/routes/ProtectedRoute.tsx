import { FC, Fragment, useContext, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Loading from '../components/LoadingComponent'
import ReactIf from '../components/ReactIfComponent'
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
                const response = await axios.post(endPoints.checkAuthEndpoint)
                dispatch('setUserState', { userid: response.data.user._id, name: response.data.user.name, isLoaded: true })
            }

            catch (error: any) {
                if (error.response) {
                    if (error.response.status === 401) {
                        localStorage.removeItem('accessToken')
                        dispatch('setUserState', { isLoaded: true })
                        navigate('/')
                    }

                    else {
                        dispatch('setUserState', { isLoaded: true })
                        toast.error('Something went wrong')
                    }
                }

                else {
                    localStorage.removeItem('accessToken')
                    dispatch('setUserState', { isLoaded: true })
                    navigate('/')
                }
            }
        })()
    }, [location.pathname])


    return (
        <Fragment>
            <ReactIf condition={userState.isLoaded}>
                <Outlet />
            </ReactIf>
            <ReactIf condition={!userState.isLoaded}>
                <Loading />
            </ReactIf>
        </Fragment>
    )
}

export default ProtectedRoute