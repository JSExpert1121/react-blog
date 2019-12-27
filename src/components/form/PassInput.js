import React from 'react'

const PassInput = props => {
    const { prefix, password, setPassword, error, ...rest } = props;

    const cls = error ? 'form-control border border-danger' : 'form-control'
    return (
        <div className='form-group row'>
            <label
                htmlFor={`${prefix}-password`}
                className='col-sm-3 col-form-label'
            >
                Password
            </label>
            <div className='col-sm-9'>
                <input
                    type='password'
                    className={cls}
                    aria-describedby={`${prefix}-password-help`}
                    id={`${prefix}-password`}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    {...rest}
                />
                <small
                    id={`${prefix}-password-help`}
                    className='form-text text-danger'
                    style={{ visibility: error ? 'visible' : 'hidden' }}
                >
                    {error}
                </small>
            </div>
        </div>
    )
}

PassInput.defaultProps = {
    init: ''
}

export default PassInput
