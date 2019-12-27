import React from 'react'

export function useValidator(value, validators) {
    const [message, setMessage] = React.useState('')

    React.useEffect(() => {
        setMessage('')
        for (let validator of validators) {
            if (validator.func(value)) {
                continue
            }

            setMessage(validator.msg)
            break
        }
    }, [value, validators])

    // set initial value
    React.useEffect(() => {
        setMessage('')
    }, [])

    return message
}