import { FC, Fragment, useContext } from 'react'
import { Container, Navbar, Nav, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/globalStateProvider'
import ReactIf from './ReactIf'

const NavBar: FC = () => {
    const [{ userState }, dispatch] = useContext(GlobalContext)
    const navigate = useNavigate()

    return (
        <Fragment>
            <ReactIf condition={localStorage.hasOwnProperty('accessToken')}>
                <Navbar className='navbar-authorized' variant='dark' expand='lg' style={{ zoom: 0.8 }}>
                    <Container>
                        <Link to='/dataset/library'><Navbar.Brand>Lenstack</Navbar.Brand></Link>
                        <Navbar.Toggle aria-controls='navbarScroll' />
                        <Navbar.Collapse id='navbarScroll'>
                            <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '8rem' }} navbarScroll>
                                <Link to='/dataset/subscriptions'><Navbar.Brand><i className='fa-solid fa-thumbtack'></i>Subscriptions</Navbar.Brand></Link>
                                <Link to='/wallet/transactions'><Navbar.Brand><i className='fa-solid fa-wallet'></i>Wallet</Navbar.Brand></Link>
                                <Link to='/account'><Navbar.Brand><i className='fa-solid fa-circle-user'></i>Account</Navbar.Brand></Link>
                            </Nav>
                            <Form className='d-flex'>
                                <Form.Control
                                    type='text'
                                    placeholder='Search Library'
                                    className='searchbar-navbar'
                                    aria-label='Search'
                                    onClick={(): void => navigate('/dataset/library')}
                                    onChange={(e): void => dispatch('setDatasetRequestState', { searchInput: e.target.value })}
                                />
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </ReactIf>
            <ReactIf condition={!localStorage.hasOwnProperty('accessToken')}>
                <Navbar className='navbar-unauthorized' variant='dark' expand='lg'>
                    <Container>
                        <Link to='/'>
                            <Navbar.Brand>Lenstack</Navbar.Brand>
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
        </Fragment >
    )
}

export default NavBar