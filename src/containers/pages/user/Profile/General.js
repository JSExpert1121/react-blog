import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

// 3rd party libaries
import { toast } from 'react-toastify'
import SimpleMde from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

// components
import VerifiedPhoneInput from 'components/form/VerifiedPhoneInput'
import Avatar from 'components/avatar/Avatar'
import ImageUploadDialog from 'components/dialogs/ImageUploadDialog'

import * as UserActions from 'store/actions/user'
import UserApis from 'service/user'

import '../user.scss'

const GeneralProfile = () => {

    const user = useSelector(state => state.user, shallowEqual)

    const [title, setTitle] = React.useState(user.profile ? user.profile.title || '' : '')
    const [desc, setDesc] = React.useState(user.profile ? user.profile.description || '' : '')

    const [address1, setAddr1] = React.useState(user.profile ? user.profile.address1 || '' : '')
    const [address2, setAddr2] = React.useState(user.profile ? user.profile.address2 || '' : '')
    const [city, setCity] = React.useState(user.profile ? user.profile.city || '' : '')
    const [zip, setZip] = React.useState(user.profile ? user.profile.zipCode || '' : '')
    const [state, setState] = React.useState(user.profile ? user.profile.state || '' : '')
    const [country, setCountry] = React.useState(user.profile ? user.profile.country || '' : '')

    const [error, setError] = React.useState('')
    const [busy, setBusy] = React.useState(false)

    const dispatch = useDispatch()

    const handleSubmit = React.useCallback(async e => {
        e.preventDefault()
        if (busy) return

        setBusy(true)
        try {
            await dispatch(UserActions.updateProfile(user.token, {
                title,
                description: desc,
                address1, address2,
                city, state, country,
                zipCode: zip
            }))
            toast.success('Profile updated', { className: 'p-4' })
        } catch (err) {
            const error = err.data
            if (error.errors) {
                setError(error.errors)
            } else {
                setError('Unknown Error')
            }
        } finally {
            setBusy(false)
        }
    }, [busy, dispatch, user.token, title, zip, city, state, address1, address2, country, desc])


    // title
    React.useEffect(() => {
        setTitle(user.profile ? user.profile.title || '' : '')
        setDesc(user.profile ? user.profile.description || '' : '')
        setAddr1(user.profile ? user.profile.address1 || '' : '')
        setAddr2(user.profile ? user.profile.address2 || '' : '')
        setCity(user.profile ? user.profile.city || '' : '')
        setZip(user.profile ? user.profile.zipCode || '' : '')
        setState(user.profile ? user.profile.state || '' : '')
        setCountry(user.profile ? user.profile.country || '' : '')
    }, [user.profile])

    const changeTitle = React.useCallback(e => {
        setTitle(e.target.value)
    }, [])

    const changeAddress1 = React.useCallback(e => {
        setAddr1(e.target.value)
    }, [])
    const changeAddress2 = React.useCallback(e => {
        setAddr2(e.target.value)
    }, [])
    const changeCity = React.useCallback(e => {
        setCity(e.target.value)
    }, [])
    const changeState = React.useCallback(e => {
        setState(e.target.value)
    }, [])
    const changeCountry = React.useCallback(e => {
        setCountry(e.target.value)
    }, [])
    const changeZip = React.useCallback(e => {
        setZip(e.target.value)
    }, [])


    // phone verify
    const handleSendcode = React.useCallback(async phone => {
        if (busy) return

        let result = true
        setBusy(true)
        try {
            await UserApis.requestCode(user.token, phone)
            toast.success('Verification code was sent', { className: 'p-4' })
        } catch (err) {
            const error = err.data
            if (error.errors) {
                setError(error.errors)
            } else {
                setError('Unknown error')
            }
            result = false
        } finally {
            setBusy(false)
        }

        return result
    }, [busy, user.token])

    const handleVerify = React.useCallback(async code => {
        if (busy) return

        let result = true
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
            result = false
        } finally {
            setBusy(false)
        }

        return result
    }, [user.token, busy])

    // edit avatar
    const saveAvatar = React.useCallback(async image => {
        if (busy) return

        setBusy(true)
        try {
            await dispatch(UserActions.uploadAvatar(user.token, image))
            toast.success('Avatar uploaded', { className: 'p-4' })
        } catch (err) {
            const error = err.data
            if (error.errors) {
                setError(error.errors)
            } else {
                setError('Unknown Error')
            }
        } finally {
            setBusy(false)
        }
    }, [busy, dispatch, user.token])


    return (
        <>
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
                        editable
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
                    <input
                        type='text'
                        className='form-control'
                        id='inputAddress'
                        placeholder='1234 Main St'
                        value={address1}
                        onChange={changeAddress1}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='inputAddress2'>Address 2</label>
                    <input
                        type='text'
                        className='form-control'
                        id='inputAddress2'
                        placeholder='Apartment, studio, or floor'
                        value={address2}
                        onChange={changeAddress2}
                    />
                </div>
                <div className='form-row'>
                    <div className='form-group col-sm-8'>
                        <label htmlFor='inputCity'>City</label>
                        <input
                            type='text'
                            className='form-control'
                            id='inputCity'
                            value={city}
                            onChange={changeCity}
                        />
                    </div>
                    <div className='form-group col-sm-4'>
                        <label htmlFor='inputZip'>Zip</label>
                        <input
                            type='text'
                            className='form-control'
                            id='inputZip'
                            value={zip}
                            onChange={changeZip}
                        />
                    </div>
                </div>
                <div className='form-row'>
                    <div className='form-group col-sm-6'>
                        <label htmlFor='inputState'>State</label>
                        <input
                            type='text'
                            className='form-control'
                            id='inputState'
                            value={state}
                            onChange={changeState}
                        />
                    </div>
                    <div className='form-group col-sm-6'>
                        <label htmlFor='inputCountry'>Country</label>
                        <input
                            type='text'
                            id='inputCountry'
                            className='form-control'
                            value={country}
                            onChange={changeCountry}
                        />
                    </div>
                </div>

                {/* phone input */}
                <VerifiedPhoneInput
                    reqCode={handleSendcode}
                    verifyCode={handleVerify}
                    profile={user.profile || {}}
                />

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

            {/* modal dialog */}
            <ImageUploadDialog
                imageUrl={user.profile ? user.profile.avatar : ''}
                handleSave={saveAvatar}
                name={user.user.username}
                message='Upload your avatar'
            />
        </>
    )
}

export default GeneralProfile
