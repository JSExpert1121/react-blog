import React from 'react'

const PhoneInput = props => {
    const { prefix, phone, setPhone, error, ...rest } = props;

    const cls = (error) ? 'form-control border border-danger' : 'form-control'
    return (
        <div className='form-group row'>
            <label
                htmlFor={`${prefix}-phone`}
                className='col-sm-3 col-form-label'
            >
                Phone No
            </label>
            <div className='col-sm-9'>
                <input
                    type='tel'
                    className={cls}
                    aria-describedby={`${prefix}-phone-help`}
                    id={`${prefix}-phone`}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    {...rest}
                />
                <small
                    id={`${prefix}-phone-help`}
                    className='form-text text-danger'
                    style={{ visibility: error ? 'visible' : 'hidden' }}
                >
                    {error}
                </small>
            </div>
        </div>
    )
}

PhoneInput.propTypes = {

}

export default PhoneInput
