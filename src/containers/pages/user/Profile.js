import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
// import PropTypes from 'prop-types'

import EmailInput from 'components/form/EmailInput'
import PassInput from 'components/form/PassInput'
import PhoneInput from 'components/form/PhoneInput'
import { useValidator } from 'components/hooks/validator'

import * as validators from 'helper/validators'
import * as UserActions from 'store/actions/user'

const emailValidators = [
    { func: validators.isRequired, msg: 'Email is required' },
    { func: validators.isEmail, msg: 'Invalid email address' }
]
const passValidators = [
    { func: validators.isRequired, msg: 'Password is required' }
]
const phoneValidators = [
    { func: validators.isPhoneNo, msg: 'Invalid phone number' }
]

const Profile = props => {

    const user = useSelector(state => state.user, shallowEqual)

    const [email, setEmail] = React.useState(user.user.email)
    const [phone, setPhone] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [busy, setBusy] = React.useState(false)

    const dispatch = useDispatch()

    const emailMsg = useValidator(email, emailValidators)
    const passMsg = useValidator(password, passValidators)
    const phoneMsg = useValidator(phone, phoneValidators)

    React.useEffect(() => {
        setEmail(user.user.email)
    }, [user.user.email])

    const handleSubmit = React.useCallback(async e => {
        e.preventDefault()
        if (busy) {
            return
        }

        setBusy(true)
        try {
            await dispatch(UserActions.login(email, password))
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
    }, [busy, email, password, dispatch])

    return (
        <section className='d-flex flex-column shadow-sm p-5 bg-white rounded'>
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

                {/* phone input */}
                <PhoneInput
                    placeholder='Your phone number'
                    autoComplete='on'
                    prefix='phone'
                    phone={phone}
                    setPhone={setPhone}
                    error={phoneMsg}
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

Profile.propTypes = {

}

export default Profile
