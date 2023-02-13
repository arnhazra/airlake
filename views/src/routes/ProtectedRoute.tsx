import { FC, Fragment, useContext } from 'react'
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom'
import LoadingComponent from '../components/Loading'
import ReactIf from '../components/ReactIf'
import { GlobalContext } from '../context/globalStateProvider'
import verifyAuthService from '../services/verifyAuthService'
import { useQuery } from 'react-query'

const ProtectedRoute: FC = () => {
    const [{ userState }, dispatch] = useContext(GlobalContext)
    const location = useLocation()
    const navigate = useNavigate()

    useQuery([location.pathname, 'verifyauth-service'], () => verifyAuthService(), {
        refetchInterval: 30000,
        refetchOnWindowFocus: false,
        onSuccess(data: any) {
            try {
                dispatch('setUserState', { userid: data.data.user._id, name: data.data.user.name, isLoaded: true, isAuthorized: true })
            } catch (error) {
                dispatch('setUserState', { isLoaded: true, isAuthorized: false })
                localStorage.removeItem('accessToken')
                navigate('/')
            }
        },

        onError(err) {
            dispatch('setUserState', { isLoaded: true, isAuthorized: false })
            localStorage.removeItem('accessToken')
            navigate('/')
        },
    })

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
                <LoadingComponent />
            </ReactIf>
        </Fragment>
    )
}

export default ProtectedRoute