import { FC, Fragment } from 'react'
import LoadingComponent from '../components/Loading'
import ReactIfComponent from '../components/ReactIf'
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