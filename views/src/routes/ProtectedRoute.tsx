import { FC, Fragment } from 'react'
import LoadingComponent from '../components/LoadingComponent'
import ReactIfComponent from '../components/ReactIfComponent'
import useAuth from '../hooks/useAuth'
import { ProtectedRouteProps } from '../types/Props'

const ProtectedRoute: FC<ProtectedRouteProps> = ({ child }) => {
    const auth = useAuth()

    return (
        <Fragment>
            <ReactIfComponent condition={auth.isLoaded}>
                {child}
            </ReactIfComponent>
            <ReactIfComponent condition={!auth.isLoaded}>
                <LoadingComponent />
            </ReactIfComponent>
        </Fragment>
    )
}

export default ProtectedRoute