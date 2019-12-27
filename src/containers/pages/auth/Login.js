import React from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import EmailInput from 'components/form/EmailInput'
import PassInput from 'components/form/PassInput'
import { useValidator } from 'components/hooks/validator'
import * as validators from 'helper/validators'

import * as UserActions from 'store/actions/user'

import './auth.scss'

const emailValidators = [
    { func: validators.isRequired, msg: 'Email is required' },
    { func: validators.isEmail, msg: 'Invalid email address' }
]
const passValidators = [
    { func: validators.isRequired, msg: 'Password is required' }
]

const Login = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [busy, setBusy] = React.useState(false)
    const [error, setError] = React.useState('')
    const [redir, setRedir] = React.useState('')

    const location = useLocation('')
    const dispatch = useDispatch()

    const emailMsg = useValidator(email, emailValidators)
    const passMsg = useValidator(password, passValidators)

    const handleSubmit = React.useCallback(async e => {
        e.preventDefault()
        if (busy) {
            return
        }

        setBusy(true)
        try {
            await dispatch(UserActions.login(email, password))
            setRedir(location.state ? location.state.referrer || '/' : '/')
        } catch (err) {
            console.log(err)
            const error = err.data
            setBusy(false)
            if (error.errors) {
                setError(error.errors)
            } else {
                setError('Unknown Error')
            }
        }
    }, [busy, email, password, location.state, dispatch])

    React.useEffect(() => {
        setError('')
    }, [email, password])

    const submittable = React.useMemo(() => {
        return email && password && !emailMsg && !passMsg
    }, [email, password, emailMsg, passMsg])

    if (!!redir) {
        return <Redirect to={redir} />
    }

    return (
        <section className='d-flex flex-column shadow-sm p-5 bg-white rounded'>
            <div className='row my-5 mx-auto'>
                <i className='fa fa-lock fa-6x lock' aria-hidden="true" />
            </div>
            <form className='login-form'>

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

                {/* password input */}
                <PassInput
                    placeholder='Password'
                    autoComplete='current-password'
                    prefix='login'
                    password={password}
                    setPassword={setPassword}
                    error={passMsg}
                />

                {/* submit button */}
                <div className='form-group row'>
                    <button
                        className='mx-auto my-2 btn btn-primary signin-button'
                        disabled={!submittable}
                        onClick={handleSubmit}
                    >
                        {busy ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm mr-2"
                                    role="status"
                                    aria-hidden="true"
                                />
                                {'Signing in...'}
                            </>
                        ) : 'Sign in'}
                    </button>
                </div>
            </form>

        </section>
    )
}

export default Login
