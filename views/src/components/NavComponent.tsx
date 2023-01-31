import { FC } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactIfComponent from './ReactIfComponent'

const NavComponent: FC = () => {
    return (
        <>
            <ReactIfComponent condition={localStorage.hasOwnProperty('accessToken')}>
                <Navbar variant='light' expand='lg'>
                    <Container>
                        <Link to='/wallet/dashboard'>
                            <Navbar.Brand style={{ fontSize: '20px' }}>
                                Dashboard
                            </Navbar.Brand>
                        </Link>
                        <Navbar.Toggle></Navbar.Toggle>
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='ms-auto'>
                                <Link to='/wallet/buy'><Navbar.Brand>Buy FLG</Navbar.Brand></Link>
                                <Link to='/wallet/sell'><Navbar.Brand>Sell FLG</Navbar.Brand></Link>
                                <Link to='/auth/signout'><Navbar.Brand>Sign Out</Navbar.Brand></Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </ReactIfComponent>
            <ReactIfComponent condition={!localStorage.hasOwnProperty('accessToken')}>
                <Navbar variant='light' expand='lg'>
                    <Container>
                        <Link to='/'>
                            <Navbar.Brand style={{ fontSize: '20px' }}>
                                Frostlake
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
            </ReactIfComponent>
        </>
    )
}

export default NavComponent