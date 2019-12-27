import React from 'react'



const EmailInput = props => {

    const { prefix, email, setEmail, error, ...rest } = props;

    const cls = (error) ? 'form-control border border-danger' : 'form-control'
    return (
        <div className='form-group row'>
            <label
                htmlFor={`${prefix}-email`}
                className='col-sm-3 col-form-label'
            >
                Email
            </label>
            <div className='col-sm-9'>
                <input
                    type='email'
                    className={cls}
                    aria-describedby={`${prefix}-email-help`}
                    id={`${prefix}-email`}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    {...rest}
                />
                <small
                    id={`${prefix}-email-help`}
                    className='form-text text-danger'
                    style={{ visibility: error ? 'visible' : 'hidden' }}
                >
                    {error}
                </small>
            </div>
        </div>
    )
}

EmailInput.defaultProps = {
    init: ''
}


export default EmailInput
