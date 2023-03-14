import { FC, Fragment } from 'react'
import NavBar from './NavBarComponent'

const SuspenseLoading: FC = () => {
    return (
        <Fragment>
            <NavBar />
            <div className='cover text-center'>
                <i className='fas fa-spinner fa-pulse fa-6x'></i>
            </div>
        </Fragment>
    )
}

export default SuspenseLoading