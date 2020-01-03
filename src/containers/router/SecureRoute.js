import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useSelector, shallowEqual } from 'react-redux'

const SecureRoute = props => {

    const user = useSelector(state => state.user, shallowEqual)
    const location = useLocation()

    if (user.user) {
        return <Route {...props} />
    }

    return (
        <Redirect
            to={{
                pathname: '/auth/login',
                state: { referrer: location.pathname }
            }}
        />
    )
}


export default SecureRoute
