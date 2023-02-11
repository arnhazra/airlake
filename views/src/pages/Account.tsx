import { useNavigate } from 'react-router-dom'
import { Fragment } from 'react'
import NavComponent from '../components/NavComponent'
import useAuth from '../hooks/useAuth'
import signOutService from '../services/signOutService'

const AccountPage = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const signOut = () => {
        try {
            signOutService()
            navigate('/')
        } catch (error) {
            navigate('/')
        }
    }

    return (
        <Fragment>
            <NavComponent />
            <div className='box'>
                <p className='branding'>Account</p>
                <p className='boxtext'>Access your account information and manage your preference</p>
                <p className='boxtext'>Signed in as {auth.name}</p>
                <button className='mt-2 btn btnbox' onClick={signOut}>Sign Out<i className='fa-solid fa-circle-arrow-right'></i></button><br />
            </div>
        </Fragment>
    )
}

export { AccountPage }