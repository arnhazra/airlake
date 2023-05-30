import { Fragment, useState } from 'react'
import axios from 'axios'
import Web3 from 'web3'
import { FloatingLabel, Form } from 'react-bootstrap'
import Constants from '@/constants/Constants'
import Show from '@/components/Show'
import endPoints from '@/constants/Endpoints'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

const AuthPage: NextPage = () => {
    const web3Provider = new Web3(endPoints.infuraEndpoint)
    const [authstep, setAuthStep] = useState(1)
    const [state, setState] = useState({ name: '', email: '', hash: '', otp: '', privateKey: '', newuser: false })
    const [alert, setAlert] = useState('')
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const generateAuthcode = async (event: any) => {
        event.preventDefault()
        setAlert(Constants.AuthMessage)
        setLoading(true)

        try {
            const response = await axios.post(endPoints.generateAuthCodeEndpoint, state)
            if (response.data.newuser) {
                const { privateKey } = web3Provider.eth.accounts.create()
                setState({ ...state, privateKey: privateKey, hash: response.data.hash, newuser: true })
            }

            else {
                setState({ ...state, hash: response.data.hash, newuser: false })
            }

            toast.success(response.data.msg)
            setAuthStep(2)
            setLoading(false)
        }

        catch (error) {
            toast.error(Constants.ConnectionErrorMessage)
            setLoading(false)
        }
    }

    const verifyAuthcode = async (event: any) => {
        event.preventDefault()
        setAlert(Constants.AuthMessage)
        setLoading(true)

        try {
            const response = await axios.post(endPoints.verifyAuthCodeEndpoint, state)
            sessionStorage.setItem('accessToken', response.data.accessToken)
            toast.success('Successfully authenticated')
            setLoading(false)
            router.push('/dataplatform')
        }

        catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.msg)
                setLoading(false)
            }

            else {
                toast.error(Constants.ConnectionErrorMessage)
                setLoading(false)
            }
        }
    }

    return (
        <Fragment>
            <Show when={authstep === 1}>
                <form className='box' onSubmit={generateAuthcode}>
                    <p className='branding'>Auth</p>
                    <p className='boxtext'>Enter the email address, it will be used for authentication.</p>
                    <FloatingLabel controlId='floatingEmail' label='Your Email'>
                        <Form.Control disabled={isLoading} autoFocus type='email' placeholder='Your Email' onChange={(e) => setState({ ...state, email: e.target.value })} required autoComplete={'off'} minLength={4} maxLength={40} />
                    </FloatingLabel><br />
                    <button type='submit' disabled={isLoading} className='mt-2 btn btn-block'>
                        <Show when={!isLoading}>Continue <i className='fa-solid fa-circle-arrow-right'></i></Show>
                        <Show when={isLoading}><i className='fas fa-circle-notch fa-spin'></i> {alert}</Show>
                    </button>
                </form>
            </Show>
            <Show when={authstep === 2}>
                <form className='box' onSubmit={verifyAuthcode}>
                    <p className='branding'>Auth</p>
                    <p className='boxtext'>Please verify your identity by entering the auth code we sent to your inbox.</p>
                    <Show when={state.newuser}>
                        <FloatingLabel controlId='floatingName' label='Your Name'>
                            <Form.Control type='text' disabled={isLoading} placeholder='Your Name' onChange={(e) => setState({ ...state, name: e.target.value })} required autoComplete={'off'} minLength={3} maxLength={40} />
                        </FloatingLabel>
                    </Show><br />
                    <FloatingLabel controlId='floatingPassword' label='Enter Auth Code'>
                        <Form.Control type='password' disabled={isLoading} name='otp' placeholder='Enter Auth Code' onChange={(e) => setState({ ...state, otp: e.target.value })} required autoComplete={'off'} minLength={6} maxLength={6} />
                    </FloatingLabel><br />
                    <button type='submit' disabled={isLoading} className='mt-2 btn btn-block'>
                        <Show when={!isLoading}>Continue <i className='fa-solid fa-circle-arrow-right'></i></Show>
                        <Show when={isLoading}><i className='fas fa-circle-notch fa-spin'></i> {alert}</Show>
                    </button>
                </form>
            </Show>
        </Fragment >
    )
}

export default AuthPage