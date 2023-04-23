import { FC, Fragment } from 'react'
import { Spinner } from 'react-bootstrap'

const Loading: FC = () => {
    return (
        <div className='cover text-center'>
            <Spinner animation="grow" />
        </div>
    )
}

export default Loading