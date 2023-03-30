import { Fragment, useState } from 'react'
import axios from 'axios'
import { FloatingLabel, Form } from 'react-bootstrap'
import Constants from '@/constants/Constants'
import ReactIf from '@/components/ReactIfComponent'
import endPoints from '@/constants/Endpoints'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const AuthPage: NextPage = () => {
    const [authstep, setAuthStep] = useState({ firststep: true, secondstep: false })
    const [state, setState] = useState({ name: '', email: '', hash: '', otp: '', newuser: false })
    const [alert, setAlert] = useState('')
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const generateAuthcode = async (event: any) => {
        event.preventDefault()
        setAlert(Constants.AuthMessage)
        setLoading(true)

        try {
            const response = await axios.post(endPoints.generateAuthCodeEndpoint, state)
            setState({ ...state, hash: response.data.hash, newuser: response.data.newuser })
            setAlert(response.data.msg)
            setAuthStep({ firststep: false, secondstep: true })
            setLoading(false)
        }

        catch (error) {
            setAlert(Constants.ConnectionErrorMessage)
            setLoading(false)
        }
    }

    const verifyAuthcode = async (event: any) => {
        event.preventDefault()
        setAlert(Constants.AuthMessage)
        setLoading(true)

        try {
            const response = await axios.post(endPoints.verifyAuthCodeEndpoint, state)
            localStorage.setItem('accessToken', response.data.accessToken)
            setAlert('Successfully authenticated')
            setLoading(false)
            router.push('/datasetlibrary')
        }

        catch (error: any) {
            if (error.response) {
                setAlert(error.response.data.msg)
                setLoading(false)
            }

            else {
                setAlert(Constants.ConnectionErrorMessage)
                setLoading(false)
            }
        }
    }

    return (
        <Fragment>
            <ReactIf condition={authstep.firststep}>
                <form className='box' onSubmit={generateAuthcode}>
                    <p className='branding'>Evolake Auth</p>
                    <p className='boxtext'>Enter the email address where you can be contacted. This email address will be used for authentication.</p>
                    <FloatingLabel controlId='floatingEmail' label='Your Email'>
                        <Form.Control autoFocus type='email' placeholder='Your Email' onChange={(e) => setState({ ...state, email: e.target.value })} required autoComplete={'off'} minLength={4} maxLength={40} />
                    </FloatingLabel>
                    <p id='alert'>{alert}</p>
                    <button type='submit' className='mt-2 btn btnbox'>Continue to Evolake {isLoading ? <i className='fas fa-circle-notch fa-spin'></i> : <i className='fa-solid fa-circle-arrow-right'></i>}</button><br />
                </form>
            </ReactIf>
            <ReactIf condition={authstep.secondstep}>
                <form className='box' onSubmit={verifyAuthcode}>
                    <p className='branding'>Evolake Auth</p>
                    <p className='boxtext'>Please verify your identity by entering the auth code we sent to your inbox. Once you've entered the code, you can continue using our services.</p>
                    <ReactIf condition={state.newuser}>
                        <FloatingLabel controlId='floatingName' label='Your Name'>
                            <Form.Control type='text' placeholder='Your Name' onChange={(e) => setState({ ...state, name: e.target.value })} required autoComplete={'off'} minLength={3} maxLength={40} />
                        </FloatingLabel>
                    </ReactIf>
                    <FloatingLabel controlId='floatingPassword' label='Enter Auth Code'>
                        <Form.Control type='password' name='otp' placeholder='Enter Auth Code' onChange={(e) => setState({ ...state, otp: e.target.value })} required autoComplete={'off'} minLength={6} maxLength={6} />
                    </FloatingLabel>
                    <p id='alert'>{alert}</p>
                    <button type='submit' className='mt-2 btn btnbox'>{state.newuser ? 'Set up the account' : 'Continue to the app'} {isLoading ? <i className='fas fa-circle-notch fa-spin'></i> : <i className='fa-solid fa-circle-arrow-right'></i>}</button>
                </form>
            </ReactIf>
        </Fragment >
    )
}

export default AuthPage