//Import Statements
import { Navigate, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Fragment } from 'react'
import NavComponent from '../components/NavComponent'
import Constants from '../constants/Constants'
import ReactIfComponent from '../components/ReactIfComponent'

//Home Page
const HomePage = () => {
    //JSX
    return (
        <Fragment>
            <NavComponent />
            <ReactIfComponent condition={localStorage.hasOwnProperty('accessToken')}>
                <Navigate replace to='/wallet/transactions' />
            </ReactIfComponent>
            <ReactIfComponent condition={!localStorage.hasOwnProperty('accessToken')}>
                <Container>
                    <div className='cover covertext'>
                        <p className='display-4 fw-bold'>{Constants.HomeHeader1} <br /> {Constants.HomeHeader2}</p>
                        <p className='lead my-4 fw-bold'>
                            {Constants.HomeIntro3} <br />
                            {Constants.HomeIntro1} <br />
                            {Constants.HomeIntro2} <br />
                        </p>
                        <Link to='/auth' className='btn'>Get Started<i className='fa-solid fa-circle-arrow-right'></i></Link>
                    </div>
                </Container>
            </ReactIfComponent>

        </Fragment>
    )
}

export { HomePage }