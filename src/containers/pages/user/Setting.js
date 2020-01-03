import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
// import PropTypes from 'prop-types'

// 3rd party libraries
import { toast } from 'react-toastify'

import EmailInput from 'components/form/EmailInput'
import NameInput from 'components/form/NameInput'
import { useValidator } from 'components/hooks/validator'

import * as validators from 'helper/validators'
import * as UserActions from 'store/actions/user'

import './user.scss'

const emailValidators = [
    { func: validators.isRequired, msg: 'Email is required' },
    { func: validators.isEmail, msg: 'Invalid email address' }
]
const name1Validators = [
    { func: validators.isRequired, msg: 'First name is required' }
]
const name2Validators = [
    { func: validators.isRequired, msg: 'Last name is required' }
]

const Setting = props => {

    const user = useSelector(state => state.user, shallowEqual)

    const name = React.useMemo(() => {
        return user.user.username.split(' ')
    }, [user.user.username])
    const [name1, setName1] = React.useState(name[0])
    const [name2, setName2] = React.useState(name[1])
    const [email, setEmail] = React.useState(user.user.email)
    const [error, setError] = React.useState('')
    const [busy, setBusy] = React.useState(false)

    const dispatch = useDispatch()

    const emailMsg = useValidator(email, emailValidators)
    const name1Msg = useValidator(name1, name1Validators)
    const name2Msg = useValidator(name2, name2Validators)

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
            dispatch(UserActions.updateUsername(user.token, name1, name2))
            setBusy(false)
            setError('')
            toast.success('Username changed', { className: 'p-4' })
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
    }, [busy, name1, name2, dispatch, user.token])

    const submitable = React.useMemo(() => (
        name1.length > 0 && name2.length > 0
    ), [name1.length, name2.length])

    return (
        <section className='d-flex flex-column shadow-sm px-5 py-4 bg-white rounded'>
            <form className='user-form'>

                {/* unknown error */}
                <div className='form-group row'>
                    <small
                        id="login-form-help"
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
                    prefix='login'
                    email={email}
                    setEmail={setEmail}
                    error={emailMsg}
                    readOnly
                />

                {/* submit button */}
                <div className='row'>
                    <div className='flex-grow-1 ml-3'>
                        <button
                            className='mx-auto my-2 btn btn-primary change-button'
                            onClick={handleSubmit}
                            disabled={!submitable}
                        >
                            {busy ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm mr-2"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {'Changing...'}
                                </>
                            ) : 'Change'}
                        </button>
                    </div>
                    <Link
                        className='ml-auto my-2 btn btn-link mr-1'
                        to='/user/changepass'
                    >
                        Change Password&nbsp;&gt;&gt;
                    </Link>
                </div>
            </form>
        </section>
    )
}

Setting.propTypes = {

}

export default Setting
