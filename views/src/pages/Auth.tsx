import { Fragment, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import NavComponent from '../components/NavComponent'
import LoadingComponent from '../components/LoadingComponent'
import Constants from '../constants/Constants'
import ReactIfComponent from '../components/ReactIfComponent'
import endPoints from '../constants/Endpoints'
import useSignOut from '../hooks/useSignOut'

const AuthPage = () => {
    const [authstep, setAuthStep] = useState({ firststep: true, secondstep: false })
    const [state, setState] = useState({ name: '', email: '', hash: '', otp: '', newuser: false })
    const [alert, setAlert] = useState('')
    const navigate = useNavigate()

    const generateAuthcode = async (event: any) => {
        event.preventDefault()
        setAlert(Constants.AuthMessage)

        try {
            const response = await axios.post(endPoints.generateAuthCodeEndpoint, state)
            setState({ ...state, hash: response.data.hash, newuser: response.data.newuser })
            setAlert(response.data.msg)
            setAuthStep({ firststep: false, secondstep: true })
        }

        catch (error) {
            setAlert(Constants.ConnectionErrorMessage)
        }
    }

    const verifyAuthcode = async (event: any) => {
        event.preventDefault()
        setAlert(Constants.AuthMessage)

        try {
            const response = await axios.post(endPoints.verifyAuthCodeEndpoint, state)
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
            localStorage.setItem('accessToken', response.data.accessToken)
            setAlert('Successfully authenticated')
            navigate('/wallet/dashboard')
        }

        catch (error: any) {
            if (error.response) {
                setAlert(error.response.data.msg)
            }

            else {
                setAlert(Constants.ConnectionErrorMessage)
            }
        }
    }

    return (
        <Fragment>
            <ReactIfComponent condition={localStorage.hasOwnProperty('accessToken')}>
                <Navigate replace to='/wallet/dashboard' />
            </ReactIfComponent>
            <ReactIfComponent condition={!localStorage.hasOwnProperty('accessToken')}>
                <NavComponent />
                <ReactIfComponent condition={authstep.firststep}>
                    <form className='box' onSubmit={generateAuthcode}>
                        <p className='branding'>Frostlake Auth</p>
                        <p className='boxtext'>Enter your email address to get started or sign in to Frostlake</p>
                        <input type='email' name='email' placeholder='Email Address' onChange={(e) => setState({ ...state, email: e.target.value })} required autoComplete={'off'} minLength={4} maxLength={40} />
                        <p id='alert'>{alert}</p>
                        <button type='submit' id='btnnow' className='mt-2 btn btnbox'>Continue to Frostlake<i className='fa-solid fa-circle-arrow-right'></i></button><br />
                    </form>
                </ReactIfComponent>
                <ReactIfComponent condition={authstep.secondstep}>
                    <form className='box' onSubmit={verifyAuthcode}>
                        <p className='branding'>Frostlake Auth</p>
                        <p className='boxtext'>Check your email address and enter auth code to continue</p>
                        <ReactIfComponent condition={state.newuser}>
                            <input type='text' name='name' placeholder='Your Name' onChange={(e) => setState({ ...state, name: e.target.value })} required autoComplete={'off'} minLength={3} maxLength={40} />
                        </ReactIfComponent>
                        <input type='password' name='otp' placeholder='Enter auth code sent to you' onChange={(e) => setState({ ...state, otp: e.target.value })} required autoComplete={'off'} minLength={8} maxLength={8} />
                        <p id='alert'>{alert}</p>
                        <button type='submit' className='mt-2 btn btnbox'>{state.newuser ? 'Set up the account' : 'Continue to the app'}<i className='fa-solid fa-circle-arrow-right'></i></button>
                    </form>
                </ReactIfComponent>
            </ReactIfComponent>
        </Fragment>
    )
}

const SignOutPage = () => {
    useSignOut()
    return <LoadingComponent />
}

export { AuthPage, SignOutPage }