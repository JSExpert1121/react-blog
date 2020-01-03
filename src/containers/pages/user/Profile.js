import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

// 3rd party libaries
import { toast } from 'react-toastify'
import SimpleMde from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

// components
import PhoneInput from 'components/form/PhoneInput'
import Avatar from 'components/avatar/Avatar'
import { useValidator } from 'components/hooks/validator'

import * as validators from 'helper/validators'
import * as UserActions from 'store/actions/user'
import UserApis from 'service/user'

import './user.scss'


const phoneValidators = [
    { func: validators.isPhoneNo, msg: 'Invalid phone number' }
]

const Profile = () => {

    const user = useSelector(state => state.user, shallowEqual)

    const [title, setTitle] = React.useState(user.profile ? user.profile.title || '' : '')
    const [desc, setDesc] = React.useState(user.profile ? user.profile.description || '' : '')

    // const [address1, setAddr1] = React.useState(user.profile ? user.profile.address1 || '' : '')
    // const [address2, setAddr2] = React.useState(user.profile ? user.profile.address2 || '' : '')
    // const [city, setCity] = React.useState(user.profile ? user.profile.city || '' : '')
    // const [state, setState] = React.useState(user.profile ? user.profile.state || '' : '')
    // const [country, setCountry] = React.useState(user.profile ? user.profile.country || '' : '')

    const [phone, setPhone] = React.useState('')
    const [sent, setSent] = React.useState(false)
    const [code, setCode] = React.useState('')

    const [error, setError] = React.useState('')
    const [busy, setBusy] = React.useState(false)

    const phoneMsg = useValidator(phone, phoneValidators)
    const dispatch = useDispatch()

    const handleSubmit = React.useCallback(async e => {
        e.preventDefault()
        if (busy) return

        setBusy(true)
        try {
            await dispatch(UserActions.updateProfile(user.token, {
                // title,
                // description: desc,
                // address1, address2,
                // city, state, country
            }))
            toast.success('Profile updated', { className: 'p-4' })
        } catch (err) {
            const error = err.data
            setBusy(false)
            if (error.errors) {
                setError(error.errors)
            } else {
                setError('Unknown Error')
            }
        }
    }, [busy, dispatch, user.token])


    // title
    React.useEffect(() => {
        setTitle(user.profile ? user.profile.title || '' : '')
        setDesc(user.profile ? user.profile.description || '' : '')
    }, [user.profile])

    const changeTitle = React.useCallback(e => {
        setTitle(e.target.value)
    }, [])


    // phone verify
    const sendable = phone.length > 0 && !phoneMsg
    const handleSendcode = React.useCallback(async e => {
        e.preventDefault()
        if (busy) return

        setBusy(true)
        try {
            await UserApis.requestCode(user.token, phone.replace(/[ \-+]/g, ''))
            setSent(true)
            toast.success('Verification code was sent', { className: 'p-4' })
        } catch (err) {
            const error = err.data
            if (error.errors) {
                setError(error.errors)
            } else {
                setError('Unknown error')
            }
        } finally {
            setBusy(false)
        }
    }, [busy, phone, user.token])

    const handleRetry = React.useCallback(e => {
        e.preventDefault()
        if (busy) return

        setSent(false)
        setPhone('')
    }, [busy])

    const handleVerify = React.useCallback(async e => {
        e.preventDefault()
        if (busy) return

        setBusy(true)
        try {
            await UserApis.verifyPhone(user.token, code)
            toast.success('Phone verified', { className: 'p-4' })
            setError('')
        } catch (err) {
            const error = err.data
            if (error.errors) {
                setError(error.errors)
            } else {
                setError('Unknown error')
            }
        } finally {
            setBusy(false)
        }
    }, [user.token, code, busy])

    const changeCode = React.useCallback(async e => {
        setCode(e.target.value)
    }, [])


    return (
        <section className='d-flex flex-column shadow-sm p-5 bg-white rounded'>
            {busy && (
                <div
                    className='spinner-border busy text-primary m-auto'
                    role='status'
                />
            )}

            <form className='user-form'>
                {/* avatar */}
                <div className='form-group row' id='profile-bio'>
                    <Avatar
                        avatar={user.profile ? user.profile.avatar : ''}
                        name={user.user.username}
                        size={96}
                    />
                    <div className='profile-bio-desc d-flex flex-column justify-content-around ml-3'>
                        <h4 className='text-dark'>
                            {user.user.username}
                        </h4>
                        <h5 className='text-dark'>
                            {user.profile ? user.profile.title || '' : ''}
                        </h5>
                    </div>
                </div>

                {/* unknown error */}
                <div className='form-group row'>
                    <small
                        id='login-form-help'
                        className='form-text text-danger mx-auto my-2'
                    >
                        {error}
                    </small>
                </div>

                {/* title */}
                <div className='form-group row p-3'>
                    <label htmlFor='inputTitle'>Title</label>
                    <input
                        type='text'
                        className='form-control'
                        id='inputTitle'
                        placeholder='Title'
                        value={title}
                        onChange={changeTitle}
                    />
                </div>

                <div className='form-group'>
                    <SimpleMde
                        id='inputDesc'
                        label='Description'
                        value={desc}
                        onChange={setDesc}
                        options={{
                            spellChecker: false,
                            placeholder: 'Decription here'
                        }}
                    />
                </div>

                {/* address */}
                <div className='form-group'>
                    <label htmlFor='inputAddress'>Address</label>
                    <input type='text' className='form-control' id='inputAddress' placeholder='1234 Main St' />
                </div>
                <div className='form-group'>
                    <label htmlFor='inputAddress2'>Address 2</label>
                    <input type='text' className='form-control' id='inputAddress2' placeholder='Apartment, studio, or floor' />
                </div>
                <div className='form-row'>
                    <div className='form-group col-sm-8'>
                        <label htmlFor='inputCity'>City</label>
                        <input type='text' className='form-control' id='inputCity' />
                    </div>
                    <div className='form-group col-sm-4'>
                        <label htmlFor='inputZip'>Zip</label>
                        <input type='text' className='form-control' id='inputZip' />
                    </div>
                </div>
                <div className='form-row'>
                    <div className='form-group col-sm-6'>
                        <label htmlFor='inputState'>State</label>
                        <input type='text' className='form-control' id='inputState' />
                    </div>
                    <div className='form-group col-sm-6'>
                        <label htmlFor='inputCountry'>Country</label>
                        <input type='text' id='inputCountry' className='form-control' />
                    </div>
                </div>

                {/* phone input */}
                <div className='form-row px-1 mt-2'>
                    <div className='flex-grow-1 mr-4'>
                        <PhoneInput
                            placeholder='Your phone number'
                            autoComplete='on'
                            prefix='phone'
                            phone={phone}
                            setPhone={setPhone}
                            error={phoneMsg}
                            disabled={sent}
                        />
                    </div>
                    <div className='form-group'>
                        <button
                            className='btn btn-primary sendcode-button'
                            onClick={handleSendcode}
                            disabled={!sendable}
                        >
                            {sent ? 'Resend Code' : 'Send Code'}
                        </button>
                    </div>
                </div>
                {sent && (
                    <div className='form-group row'>
                        <div className='col-sm-7 d-flex'>
                            <input
                                type='number'
                                className='form-control'
                                id='inputCode'
                                placeholder='Verification Code'
                                value={code}
                                onChange={changeCode}
                            />
                            <button
                                className='btn btn-primary ml-2'
                                disabled={code.length !== 4}
                                onClick={handleVerify}
                            >
                                Verify
                        </button>
                        </div>
                        <div className='col-sm-5 text-right'>
                            <button
                                className='btn btn-link'
                                onClick={handleRetry}
                            >
                                Try other phone
                        </button>
                        </div>
                    </div>
                )}

                {/* submit button */}
                <div className='form-group row mt-4'>
                    <button
                        className='mx-auto my-2 btn btn-primary change-button'
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </div>
            </form>
        </section>
    )
}

Profile.propTypes = {

}

export default Profile
