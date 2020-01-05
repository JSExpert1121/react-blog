import React from 'react'

import PhoneInput2 from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PhoneInput = props => {
    const { prefix, phone, setPhone, error, ...rest } = props;

    const cls = (error) ? 'form-control border border-danger' : 'form-control'
    return (
        <div className='form-group'>
            <PhoneInput2
                value={phone}
                onChange={setPhone}
                country={'cn'}
                className={cls}
                aria-describedby={`${prefix}-phone-help`}
                id={`${prefix}-phone`}
                {...rest}
                inputProps={{ style: { width: '100%', height: 38 } }}
            />
            <small
                id={`${prefix}-phone-help`}
                className='form-text text-danger'
                style={{ visibility: error ? 'visible' : 'hidden' }}
            >
                {error}
            </small>
        </div>
    )
}

PhoneInput.propTypes = {

}

export default PhoneInput
