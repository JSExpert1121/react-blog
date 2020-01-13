import React from 'react'

const ValidatedInput = props => {

    const { component, label, id, value, valueChange, error, ...rest } = props
    const InputElement = React.useMemo(() => component, [component])

    const cls = React.useMemo(() => {
        return error ? 'form-control border border-danger' : 'form-control'
    }, [error])


    return (
        <div className='form-group row'>
            <label htmlFor={id} className='required'>{label}</label>
            <InputElement
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

export default ValidatedInput
