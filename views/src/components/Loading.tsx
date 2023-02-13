import { FC, Fragment } from 'react'

const LoadingComponent: FC = () => {
    return (
        <Fragment>
            <div className='cover text-center'>
                <i className='fas fa-spinner fa-pulse fa-6x'></i>
            </div>
        </Fragment>
    )
}

export default LoadingComponent