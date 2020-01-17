import React from 'react'

const ValidTextInput = props => {
    const { label, id, value, setValue, error, ...rest } = props

    const valueChange = React.useCallback(e => {
        setValue(e.target.value)
    }, [setValue])

    const cls = React.useMemo(() => {
        return error ? 'form-control border border-danger' : 'form-control'
    }, [error])

    return (
        <div className='form-group row'>
            <label htmlFor={id} className='required'>{label}</label>
            <input
                type='text'
                className={cls}
                aria-describedby={`${id}-help`}
                id={id}
                value={value}
                onChange={valueChange}
                {...rest}
            />
            <small
                id={`${id}-help`}
                className='form-text text-danger'
                style={{ visibility: error ? 'visible' : 'hidden' }}
            >
                {error}
            </small>
        </div>
    )
}

export default ValidTextInput
