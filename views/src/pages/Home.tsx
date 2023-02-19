import { Navigate, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Fragment } from 'react'
import Constants from '../constants/Constants'
import ReactIf from '../components/ReactIf'

const HomePage = () => {
    return (
        <Fragment>
            <ReactIf condition={localStorage.hasOwnProperty('accessToken')}>
                <Navigate replace to='/dataset/library' />
            </ReactIf>
            <ReactIf condition={!localStorage.hasOwnProperty('accessToken')}>
                <Container>
                    <div className='cover covertext'>
                        <p className='display-5 fw-bold'>
                            {Constants.HomeHeader1}<br />
                            {Constants.HomeHeader2}<br />
                            {Constants.HomeHeader3}
                        </p>
                        <p className='lead my-4 fw-bold'>
                            {Constants.HomeIntro1} <br />
                            {Constants.HomeIntro2} <br />
                        </p>
                        <Link to='/auth' className='btn'>Get Started<i className='fa-solid fa-circle-arrow-right'></i></Link>
                    </div>
                </Container>
            </ReactIf>
        </Fragment >
    )
}

export { HomePage }