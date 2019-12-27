import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { CommonLayout } from 'containers/layout'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import Signup from './Signup'
import ResetPassword from './ResetPassword'

const Auth = () => {
    const match = useRouteMatch()
    return (
        <CommonLayout>
            <Switch>
                <Route path={`${match.url}/login`}>
                    <Login />
                </Route>
                <Route path={`${match.url}/reset`}>
                    <ResetPassword />
                </Route>
                <Route path={`${match.url}/signup`}>
                    <Signup />
                </Route>
                <Route path={`${match.url}/forgotpassword`}>
                    <ForgotPassword />
                </Route>
            </Switch>
        </CommonLayout>
    )
}

export default Auth
