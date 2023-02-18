import { useNavigate } from 'react-router-dom'
import { Fragment, useContext } from 'react'
import signOutService from '../services/signOutService'
import { GlobalContext } from '../context/globalStateProvider'

const AccountPage = () => {
    const navigate = useNavigate()
    const [{ userState }, dispatch] = useContext(GlobalContext)

    const signOut = () => {
        try {
            signOutService()
            dispatch('setUserState', { isLoaded: true, isAuthorized: false })
            navigate('/')
        } catch (error) {
            dispatch('setUserState', { isLoaded: true, isAuthorized: false })
            navigate('/')
        }
    }

    return (
        <Fragment>
            <div className='box'>
                <p className='branding'>Account</p>
                <p className='boxtext'>Access your account information and manage your preference</p>
                <p className='boxtext'>Signed in as {userState.name}</p>
                <button className='mt-2 btn btnbox' onClick={signOut}>Sign Out<i className='fa-solid fa-circle-arrow-right'></i></button><br />
            </div>
        </Fragment>
    )
}

export { AccountPage }