import React from 'react'
import { useLocation, Redirect } from 'react-router-dom'

import * as UserActions from 'store/actions/user'

import './auth.scss'

const Login = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [busy, setBusy] = React.useState(false)
    const [error, setError] = React.useState('')
    const [redir, setRedir] = React.useState('')

    const location = useLocation('')
    const submitRef = React.useRef()

    React.useEffect(() => {
        submitRef.current = async () => {
            if (busy) {
                return
            }

            setBusy(true)
            try {
                await UserActions.login(email, password)
                setBusy(false)
                setRedir(location.state ? location.state.referrer || '' : '')
            } catch (err) {
                if (err.errors) {
                    setError(err.errors)
                } else {
                    setError('Unknown Error')
                }
            } finally {
                setBusy(false)
            }
        }
    }, [])

    if (!!redir) {
        return <Redirect to={redir} />
    }

    return (
        <section className='d-flex w-100 h-100 justify-content-center align-items-center'>
            <form className='login-form'>

                {/* email input */}
                <div className='form-group row'>
                    <label
                        htmlFor='login-email'
                        className='col-sm-3 col-form-label'
                    >
                        Email
                    </label>
                    <div className='col-sm-9'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Your email address'
                            autoComplete='email'
                            aria-describedby='email-help'
                            id='login-email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <small
                            id="email-help"
                            className={"form-text text-muted" +
                                (error.includes('User') || " d-none")}
                        >
                            User not found
                        </small>
                    </div>
                </div>

                {/* password input */}
                <div className='form-group row'>
                    <label
                        htmlFor='login-password'
                        className='col-sm-3 col-form-label'
                    >
                        Password
                    </label>
                    <div className='col-sm-9'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Password'
                            id='login-password'
                            autoComplete='current-password'
                            aria-describedby='password-help'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <small
                            id="password-help"
                            className={"form-text text-muted" +
                                (error.includes('Password') || " d-none")}
                        >
                            Password mismatch
                        </small>
                    </div>
                </div>

                {/* unknown error */}
                <div className='form-group row'>
                    <small
                        id="login-form-help"
                        className={"form-text text-muted" +
                            (error.includes('Password') || " d-none")}
                    >
                        Unknown error
                    </small>
                </div>

                {/* submit button */}
                <div className='form-group row'>
                    <button
                        className='mx-auto my-2 btn btn-primary signin-button'
                        onClick={submitRef.current}
                    >
                        {busy ? (
                            <>
                                <span
                                    class="spinner-border spinner-border-sm"
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
