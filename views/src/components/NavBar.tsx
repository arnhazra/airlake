import { Fragment, useContext } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/globalStateProvider'
import ReactIf from './ReactIf'

const NavBar = () => {
    const [{ userState }] = useContext(GlobalContext)

    return (
        <Fragment>
            <ReactIf condition={userState.isAuthorized}>
                <Navbar variant='light' expand='lg'>
                    <Container>
                        <Link to='/dataset/store'>
                            <Navbar.Brand style={{ fontSize: '20px' }}>
                                Lenstack
                            </Navbar.Brand>
                        </Link>
                        <Navbar.Toggle></Navbar.Toggle>
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='ms-auto'>
                                <Link to='/dataset/subscriptions'><Navbar.Brand>Subscriptions</Navbar.Brand></Link>
                                <Link to='/wallet/transactions'><Navbar.Brand>Wallet</Navbar.Brand></Link>
                                <Link to='/account'><Navbar.Brand>Account</Navbar.Brand></Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </ReactIf>
            <ReactIf condition={!userState.isAuthorized}>
                <Navbar variant='light' expand='lg'>
                    <Container>
                        <Link to='/'>
                            <Navbar.Brand style={{ fontSize: '20px' }}>
                                Lenstack
                            </Navbar.Brand>
                        </Link>
                        <Navbar.Toggle></Navbar.Toggle>
                        <Navbar.Collapse>
                            <Nav className='ms-auto'>
                                <Link to='/auth'><Navbar.Brand>Get Started</Navbar.Brand></Link>
                                <a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/arnhazra/'><Navbar.Brand>Creator</Navbar.Brand></a>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </ReactIf>
        </Fragment>
    )
}

export default NavBar