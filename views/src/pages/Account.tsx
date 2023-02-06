import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import NavComponent from '../components/NavComponent'
import useAuth from '../hooks/useAuth'

const AccountPage = () => {
    const auth = useAuth()

    return (
        <Fragment>
            <NavComponent />
            <div className='box'>
                <p className='branding'>Account</p>
                <p className='boxtext'>Access your account information and manage your preference</p>
                <p className='boxtext'>Signed in as {auth.name}</p>
                <Link to='/auth/signout' className='mt-2 btn btnbox'>Sign Out<i className='fa-solid fa-circle-arrow-right'></i></Link><br />
            </div>
        </Fragment>
    )
}

export { AccountPage }