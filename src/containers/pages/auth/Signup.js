import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'

// components and utils
import NameInput from 'components/form/NameInput'
import EmailInput from 'components/form/EmailInput'
import PassInput from 'components/form/PassInput'
import { useValidator } from 'components/hooks/validator'
import * as validators from 'helper/validators'
import AuthApis from 'service/auth'

import './auth.scss'

const emailValidators = [
    { func: validators.isRequired, msg: 'Email is required' },
    { func: validators.isEmail, msg: 'Invalid email address' }
]
const passValidators = [
    { func: validators.isRequired, msg: 'Password is required' },
    { func: validators.minLength(8), msg: 'Password is too short' }
]
const name1Validators = [
    { func: validators.isRequired, msg: 'First name is required' }
]
const name2Validators = [
    { func: validators.isRequired, msg: 'Last name is required' }
]

const Signup = props => {

    const [name1, setName1] = React.useState('')
    const [name2, setName2] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [pass1, setPass1] = React.useState('')
    const [pass2, setPass2] = React.useState('')
    const [busy, setBusy] = React.useState(false)
    const [error, setError] = React.useState('')
    const [redir, setRedir] = React.useState('')

    const history = useHistory()

    const passValidator1 = React.useMemo(() => {
        return [
            ...passValidators,
            { func: validators.match(pass2), msg: 'Password not match' }
        ]
    }, [pass2])
    const passValidator2 = React.useMemo(() => {
        return [
            ...passValidators,
            { func: validators.match(pass1), msg: 'Password not match' }
        ]
    }, [pass1])

    const handleSubmit = React.useCallback(async e => {
        e.preventDefault()
        if (busy) {
            return
        }

        setBusy(true)
        try {
            await AuthApis.signup(email, name1, name2, pass1)
            setRedir('/auth/login')
        } catch (err) {
            const error = err.data
            if (error.errors) {
                setError(JSON.stringify(error.errors))
            } else {
                setError('Unknown Error')
            }
            setBusy(false)
        }
    }, [busy, pass1, email, name1, name2])

    const handleBack = React.useCallback(e => {
        e.preventDefault()
        history.goBack()
    }, [history])

    const name1Msg = useValidator(name1, name1Validators)
    const name2Msg = useValidator(name2, name2Validators)
    const emailMsg = useValidator(email, emailValidators)
    const pass1Msg = useValidator(pass1, passValidator1)
    const pass2Msg = useValidator(pass2, passValidator2)

    const submittable = React.useMemo(() => (
        pass1.length > 0 && !pass1Msg && email.length > 0 && !emailMsg && name1.length > 0 && name2.length > 0
    ), [pass1.length, pass1Msg, email.length, emailMsg, name1.length, name2.length])

    if (!!redir) {
        return <Redirect to={redir} />
    }

    return (
        <section className='d-flex flex-column shadow-sm p-5 bg-white rounded justify-content-center'>
            <h4 className='row mx-auto'>
                Sign up with your email
            </h4>
            <form className='auth-form'>

                {/* unknown error */}
                <div className='form-group row'>
                    <small
                        id="auth-form-help"
                        className='form-text text-danger mx-auto my-2'
                    >
                        {error}
                    </small>
                </div>

                {/* name input */}
                <NameInput
                    name1={name1}
                    name2={name2}
                    setName1={setName1}
                    setName2={setName2}
                    prefix='name'
                    autoComplete='on'
                    error={[name1Msg, name2Msg]}
                />

                {/* email input */}
                <EmailInput
                    placeholder='Your email address'
                    autoComplete='email'
                    prefix='signup'
                    email={email}
                    setEmail={setEmail}
                    error={emailMsg}
                />

                {/* password input */}
                <PassInput
                    label='New'
                    placeholder='New Password'
                    autoComplete='current-password'
                    prefix='changepass-newpass1'
                    password={pass1}
                    setPassword={setPass1}
                    error={pass1Msg}
                />

                {/* password input */}
                <PassInput
                    label='Confirm'
                    placeholder='Confirm Password'
                    autoComplete='current-password'
                    prefix='changepass-newpass2'
                    password={pass2}
                    setPassword={setPass2}
                    error={pass2Msg}
                />


                <div className='form-group row justify-content-between'>
                    <button
                        className='my-2 btn btn-link'
                        onClick={handleBack}
                    >
                        Back
                    </button>
                    <button
                        className='mr-3 my-2 btn btn-primary signin-button'
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
                                {'Signing up...'}
                            </>
                        ) : 'Sign up'}
                    </button>
                </div>
            </form>

        </section>
    )
}


export default Signup
