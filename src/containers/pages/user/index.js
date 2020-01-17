import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import { CommonLayout } from 'containers/layout'
import ProfilePage from './Profile'
import SettingPage from './Setting'
import PasswordPage from './Password'
import PublicProfile from './Public'

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
                <Route path={`${match.url}/:id`}>
                    <PublicProfile />
                </Route>
            </Switch>
        </CommonLayout>
    )
}

export default UserPages
