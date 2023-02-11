import { FC } from 'react'
import { Container, Navbar, Nav, Form, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ReactIfComponent from './ReactIf'
import { NavProps } from '../types/Props'
import FavIcon from './FavIcon'

const NavComponent: FC<NavProps> = ({ sendSearchInput }) => {
    const navigate = useNavigate()
    const redirect = (): void => {
        navigate('/dataset/store')
    }

    const handleSearch = (searchInput: string): void => {
        sendSearchInput ? sendSearchInput(searchInput) : console.log('no')
    }

    return (
        <>
            <ReactIfComponent condition={localStorage.hasOwnProperty('accessToken')}>
                <Navbar expand='lg'>
                    <Container>
                        <Navbar.Brand>
                            <Link to='/dataset/store'>
                                <FavIcon /> Lenstack
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='navbarScroll' />
                        <Navbar.Collapse id='navbarScroll'>
                            <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '5rem' }} navbarScroll>
                                <Navbar.Brand>
                                    <Link to='/dataset/subscriptions'>
                                        Subscriptions
                                    </Link>
                                </Navbar.Brand>
                                <Navbar.Brand>
                                    <Link to='/wallet/transactions'>
                                        Wallet
                                    </Link>
                                </Navbar.Brand>
                                <Navbar.Brand>
                                    <Link to='/account'>
                                        Account
                                    </Link>
                                </Navbar.Brand>
                            </Nav>
                            <Form className='d-flex'>
                                <InputGroup>
                                    <Form.Control
                                        autoFocus={window.location.pathname === '/dataset/store' ? true : false}
                                        type='search'
                                        placeholder='Search the Store'
                                        className='searchbar-navbar'
                                        aria-label='Search'
                                        onClick={redirect}
                                        onChange={(e: any): void => handleSearch(e.target.value)}
                                    />
                                    <InputGroup.Text className='search-glass-container'><i className='fa-solid fa-magnifying-glass'></i></InputGroup.Text>
                                </InputGroup>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </ReactIfComponent>
            <ReactIfComponent condition={!localStorage.hasOwnProperty('accessToken')}>
                <Navbar variant='light' expand='lg'>
                    <Container>
                        <Link to='/'>
                            <Navbar.Brand >
                                <FavIcon /> Lenstack
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

NavComponent.defaultProps = {
    sendSearchInput: (input: string) => console.log(input)
}

export default NavComponent