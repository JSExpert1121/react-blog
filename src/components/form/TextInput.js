import React from 'react'

const TextInput = props => {
    const { label, id, value, setValue, ...rest } = props

    const valueChange = React.useCallback(e => {
        setValue(e.target.value)
    }, [setValue])

    return (
        <div className='form-group row'>
            <label htmlFor={id}>{label}</label>
            <input
                type='text'
                className='form-control'
                aria-describedby={`${id}-help`}
                id={id}
                value={value}
                onChange={valueChange}
                {...rest}
            />
        </div>
    )
}

export default TextInput
