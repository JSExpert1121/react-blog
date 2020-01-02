import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import { CommonLayout } from 'containers/layout'
import ProfilePage from './Profile'
import SettingPage from './Setting'

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
            </Switch>
        </CommonLayout>
    )
}

export default UserPages
