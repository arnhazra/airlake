import { FC } from 'react'
import NavComponent from './NavComponent'

const LoadingComponent: FC = () => {
    return (
        <>
            <NavComponent />
            <div className='cover text-center'>
                <i className='fa-solid fa-circle-notch fa-spin fa-6x'></i>
            </div>
        </>
    )
}

export default LoadingComponent