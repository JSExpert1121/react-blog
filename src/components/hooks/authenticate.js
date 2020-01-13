import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'

export function useAuthenticate(user) {
    const [redir, setRedir] = React.useState('')
    const location = useLocation()

    // set initial value
    React.useEffect(() => {
        if (!user?.user?.id) {
            setRedir('/auth/login')
            return
        }
    }, [user])

    if (redir) {
        return (
            <Redirect
                to={{
                    pathname: redir,
                    state: { referrer: location.pathname }
                }}
            />
        )
    }

    return ''
}