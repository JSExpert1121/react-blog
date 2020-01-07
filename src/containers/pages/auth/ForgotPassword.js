import React from 'react'
import { useHistory } from 'react-router-dom'

import { toast } from 'react-toastify'

// components
import EmailInput from 'components/form/EmailInput'
import { useValidator } from 'components/hooks/validator'
import * as validators from 'helper/validators'

import UserApis from 'service/auth'
import './auth.scss'

const emailValidators = [
    { func: validators.isRequired, msg: 'Email is required' },
    { func: validators.isEmail, msg: 'Invalid email address' }
]

const ForgotPassword = props => {
    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState('')
    const [busy, setBusy] = React.useState(false)

    const emailMsg = useValidator(email, emailValidators)
    const history = useHistory()

    const handleSubmit = React.useCallback(async e => {
        e.preventDefault()
        if (busy) {
            return
        }

        setBusy(true)
        try {
            await UserApis.forgotPassword(email)
            toast.success('Password reset link sent', { className: 'p-4' })
        } catch (err) {
            console.log(err)
            const error = err.data
            if (error.errors) {
                setError(error.errors)
            } else {
                setError('Unknown Error')
            }
        } finally {
            setBusy(false)
        }
    }, [busy, email])

    const handleBack = React.useCallback(e => {
        e.preventDefault()
        history.goBack()
    }, [history])


    return (
        <section className='d-flex flex-column shadow-sm p-5 bg-white rounded justify-content-center'>

            {busy && (
                <div
                    className='spinner-border busy text-primary m-auto'
                    role='status'
                />
            )}

            <form className='auth-form'>

                <h4 className='text-center'>
                    Reset your password
                </h4>

                {/* unknown error */}
                <div className='form-group row'>
                    <small
                        id="login-form-help"
                        className='form-text text-danger mx-auto my-2'
                    >
                        {error}
                    </small>
                </div>

                {/* email input */}
                <EmailInput
                    placeholder='Your email address'
                    autoComplete='email'
                    prefix='login'
                    email={email}
                    setEmail={setEmail}
                    error={emailMsg}
                />

                <div className='form-group row justify-content-between'>
                    <button
                        className='mx-3 my-2 btn btn-link'
                        onClick={handleBack}
                    >
                        Back
                    </button>
                    <button
                        className='mx-3 my-2 btn btn-primary'
                        onClick={handleSubmit}
                    >
                        Reset Password
                    </button>
                </div>
            </form>
        </section>
    )
}

export default ForgotPassword
