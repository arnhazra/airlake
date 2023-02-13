import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Layout = () => {
    return (
        <Fragment>
            <NavBar />
            <Outlet />
        </Fragment>
    )
}

export default Layout