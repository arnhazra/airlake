import { FC, Fragment } from 'react'

const Loading: FC = () => {
    return (
        <div className='cover text-center'>
            <i className='fas fa-spinner fa-pulse fa-4x'></i>
        </div>
    )
}

export default Loading