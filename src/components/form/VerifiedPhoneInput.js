import React from 'react'

import { useValidator } from 'components/hooks/validator'
import PhoneInput from 'components/form/PhoneInput'
import * as validators from 'helper/validators'

const phoneValidators = [
    { func: validators.isPhoneNo, msg: 'Invalid phone number' }
]

const VerifiedPhoneInput = props => {

    const { reqCode, verifyCode, profile } = props

    const [phone, setPhone] = React.useState(profile ? profile.phone || '' : '')
    const [sent, setSent] = React.useState(false)
    const [code, setCode] = React.useState('')
    const [verified, setVerified] = React.useState(false)

    const phoneMsg = useValidator(phone, phoneValidators)

    // phone verify
    const sendable = phone.length > 0 && !phoneMsg
    const handleSendcode = React.useCallback(async e => {
        e.preventDefault()
        const result = await reqCode(phone.replace(/[ \-+]/g, ''))
        if (result) setSent(true)
    }, [phone, reqCode])

    const handleRetry = React.useCallback(e => {
        e.preventDefault()
        setSent(false)
        setPhone('')
    }, [])

    const handleVerify = React.useCallback(async e => {
        e.preventDefault()
        const result = await verifyCode(code)
        if (result) setVerified(true)
    }, [code, verifyCode])

    const changeCode = React.useCallback(async e => {
        setCode(e.target.value)
    }, [])


    return (
        <>
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
                            disabled={code.length !== 4 || verified}
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
        </>
    )
}

export default VerifiedPhoneInput
