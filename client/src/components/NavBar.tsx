import { GlobalContext } from '@/context/globalStateProvider'
import debounce from 'lodash.debounce'
import { ChangeEvent, FC, Fragment, useContext, useMemo, useEffect, useState } from 'react'
import { Container, Navbar, Nav, Form } from 'react-bootstrap'
import Link from 'next/link'
import Show from './Show'
import { useRouter } from 'next/router'

const NavBar: FC = () => {
    const [, dispatch] = useContext(GlobalContext)
    const router = useRouter()
    const [isAuthenticated, setAuthenticated] = useState(false)

    const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch('setDatasetRequestState', { searchQuery: event.target.value, offset: 0 })
        router.push('/')
    }

    const debouncedChangeHandler = useMemo(() =>
        debounce(searchChangeHandler, 1000),
        []
    )

    useEffect(() => {
        if (localStorage.hasOwnProperty('accessToken')) {
            setAuthenticated(true)
        }

        else {
            setAuthenticated(false)
        }
    }, [router.pathname])

    return (
        <Fragment>
            <Show when={isAuthenticated}>
                <Navbar variant='light' expand='lg' style={{ zoom: 0.85 }} fixed='top'>
                    <Container>
                        <Link href='/'><Navbar.Brand style={{ fontSize: '1.3rem' }}>Lenstack</Navbar.Brand></Link>
                        <Navbar.Toggle aria-controls='navbarScroll' />
                        <Navbar.Collapse id='navbarScroll'>
                            <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '8rem' }} navbarScroll>
                                <Link href='/dashboard' className='user-link'><Navbar.Brand>Dashboard</Navbar.Brand></Link>
                            </Nav>
                            <Form className='d-flex' onSubmit={(e) => e.preventDefault()}>
                                <Form.Control
                                    type='search'
                                    placeholder='Search Data Platform'
                                    className='searchbar-navbar'
                                    maxLength={40}
                                    aria-label='Search'
                                    onChange={debouncedChangeHandler}
                                />
                            </Form>
                            <Link href='/dashboard'><i className='fa-solid fa-circle-user fa-3x'></i></Link>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Show>
            <Show when={!isAuthenticated}>
                <Navbar variant='light' className='navbar-unauthorized' expand='lg' fixed='top'>
                    <Container>
                        <Link href='/'>
                            <Navbar.Brand style={{ fontSize: '1.3rem' }}>Lenstack</Navbar.Brand>
                        </Link>
                        <Navbar.Toggle></Navbar.Toggle>
                        <Navbar.Collapse>
                            <Nav className='ms-auto'>
                                <Link href='/auth'><Navbar.Brand>Get Started</Navbar.Brand></Link>
                                <Link target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/arnhazra/'><Navbar.Brand>Developer</Navbar.Brand></Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Show>
        </Fragment >
    )
}

export default NavBar