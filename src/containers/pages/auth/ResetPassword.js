import React from 'react'
import { useDispatch } from 'react-redux'

import { toast } from 'react-toastify'

// components and utils
import PassInput from 'components/form/PassInput'
import { useValidator } from 'components/hooks/validator'
import * as validators from 'helper/validators'
import { useQuery } from 'components/hooks/query'
import AuthApis from 'service/auth'
import * as UserActions from 'store/actions/user'

const passValidators = [
    { func: validators.isRequired, msg: 'Password is required' },
    { func: validators.minLength(8), msg: 'Password is too short' }
]

const ResetPassword = props => {

    const query = useQuery()
    const token = React.useMemo(() => query.get('sec_token'), [query])

    const [pass1, setPass1] = React.useState('')
    const [pass2, setPass2] = React.useState('')

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
    const pass1Msg = useValidator(pass1, passValidator1)
    const pass2Msg = useValidator(pass2, passValidator2)

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(UserActions.logoutSuccess())
    }, [dispatch])

    const handleSubmit = React.useCallback(async e => {
        e.preventDefault()
        if (busy) {
            return
        }

        setBusy(true)
        try {
            await AuthApis.resetPassword(token, pass1)
            setError('')
            toast.success('Password changed', { className: 'p-4' })
        } catch (err) {
            const error = err.data
            if (error.errors) {
                setError(JSON.stringify(error.errors))
            } else {
                setError('Unknown Error')
            }
        } finally {
            setBusy(false)
        }
    }, [busy, pass1, token])

    const submitable = React.useMemo(() => (
        pass1.length > 0 && !pass1Msg
    ), [pass1.length, pass1Msg])


    return (
        <section className='d-flex flex-column shadow-sm px-5 py-4 bg-white rounded'>
            {/* unknown error */}

            <form className='pass-form'>
                <h4 className='text-center my-3'>
                    Reset Your Password
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
                <div className='row justify-content-center'>
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
                                {'Resetting...'}
                            </>
                        ) : 'Reset'}
                    </button>
                </div>
            </form>
        </section>
    )
}


export default ResetPassword
