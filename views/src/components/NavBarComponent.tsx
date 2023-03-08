import debounce from 'lodash.debounce'
import { ChangeEvent, FC, Fragment, useContext, useMemo } from 'react'
import { Container, Navbar, Nav, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/globalStateProvider'
import ReactIf from './ReactIfComponent'

const NavBar: FC = () => {
    const [, dispatch] = useContext(GlobalContext)
    const navigate = useNavigate()

    const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch('setDatasetRequestState', { searchInput: event.target.value })
    }

    const debouncedChangeHandler = useMemo(() =>
        debounce(searchChangeHandler, 1000),
        []
    )

    return (
        <Fragment>
            <ReactIf condition={localStorage.hasOwnProperty('accessToken')}>
                <Navbar className='navbar-authorized' variant='dark' expand='lg' style={{ zoom: 0.85 }}>
                    <Container>
                        <Link to='/dataset/library'><Navbar.Brand>Lenstack</Navbar.Brand></Link>
                        <Navbar.Toggle aria-controls='navbarScroll' />
                        <Navbar.Collapse id='navbarScroll'>
                            <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '8rem' }} navbarScroll>
                                <Link to='/dataset/subscriptions'><Navbar.Brand>Subscriptions</Navbar.Brand></Link>
                                <Link to='/wallet/transactions'><Navbar.Brand>Wallet</Navbar.Brand></Link>
                                <Link to='/account'><Navbar.Brand>Account</Navbar.Brand></Link>
                            </Nav>
                            <Form className='d-flex'>
                                <Form.Control
                                    type='text'
                                    placeholder='Search Library'
                                    className='searchbar-navbar'
                                    aria-label='Search'
                                    onClick={(): void => navigate('/dataset/library')}
                                    onChange={debouncedChangeHandler}
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