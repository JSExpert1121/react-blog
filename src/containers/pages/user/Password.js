import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, shallowEqual } from 'react-redux'

// 3rd party libraries
import { toast } from 'react-toastify'

// components and utils
import PassInput from 'components/form/PassInput'
import { useValidator } from 'components/hooks/validator'
import * as validators from 'helper/validators'
import UserApis from 'service/user'

import './user.scss'


const passValidators = [
    { func: validators.isRequired, msg: 'Password is required' },
    { func: validators.minLength(8), msg: 'Password is too short' }
]

const PasswordPage = props => {

    const [oldPass, setOldPass] = React.useState('')
    const [pass1, setPass1] = React.useState('')
    const [pass2, setPass2] = React.useState('')

    const user = useSelector(state => state.user, shallowEqual)
    const history = useHistory()

    const [error, setError] = React.useState('')
    const [busy, setBusy] = React.useState(false)

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

    const oldpassMsg = useValidator(oldPass, passValidators)
    const pass1Msg = useValidator(pass1, passValidator1)
    const pass2Msg = useValidator(pass2, passValidator2)

    const handleSubmit = React.useCallback(async e => {
        e.preventDefault()
        if (busy) {
            return
        }

        setBusy(true)
        try {
            await UserApis.changePassword(user.token, oldPass, pass1)
            setBusy(false)
            setError('')
            toast.success('Password changed', { className: 'p-4' })
        } catch (err) {
            const error = err.data
            setBusy(false)
            if (error.errors) {
                setError(JSON.stringify(error.errors))
            } else {
                setError('Unknown Error')
            }
        }
    }, [busy, oldPass, pass1, user.token])

    const handleBack = React.useCallback(e => {
        e.preventDefault()
        history.goBack()
    }, [history])

    const submitable = React.useMemo(() => (
        oldPass.length > 0 && pass1.length > 0 && !pass1Msg && !oldpassMsg
    ), [oldPass.length, pass1.length, pass1Msg, oldpassMsg])

    return (
        <section className='d-flex flex-column shadow-sm px-5 py-4 bg-white rounded'>
            {/* unknown error */}

            <form className='pass-form'>
                <h4 className='text-center my-3'>
                    Change Your Password
                </h4>

                <div className='form-group row'>
                    <small
                        id="pass-form-help"
                        className='form-text text-danger mx-auto my-1'
                    >
                        {error}
                    </small>
                </div>

                {/* password input */}
                <PassInput
                    label='Old'
                    placeholder='Old Password'
                    autoComplete='current-password'
                    prefix='changepass'
                    password={oldPass}
                    setPassword={setOldPass}
                    error={oldpassMsg}
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

                {/* submit button */}
                <div className='row'>
                    <div className='flex-grow-1'>
                        <button
                            className='ml-auto my-2 btn btn-link'
                            onClick={handleBack}
                        >
                            Back
                    </button>
                    </div>
                    <button
                        className='mr-3 my-2 btn btn-primary change-button'
                        disabled={!submitable}
                        onClick={handleSubmit}
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
            </form>
        </section>
    )
}

PasswordPage.propTypes = {

}

export default PasswordPage
