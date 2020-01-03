import React from 'react'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'

import { CommonLayout } from 'containers/layout'
import ProfilePage from './Profile'
import SettingPage from './Setting'
import PasswordPage from './Password'

const UserPages = () => {

    const match = useRouteMatch()

    return (
        <CommonLayout>
            <Switch>
                <Route path={`${match.url}/setting`}>
                    <SettingPage />
                </Route>
                <Route path={`${match.url}/profile`}>
                    <ProfilePage />
                </Route>
                <Route path={`${match.url}/changepass`}>
                    <PasswordPage />
                </Route>
                <Redirect to={`${match.url}/setting`} />
            </Switch>
        </CommonLayout>
    )
}

export default UserPages
