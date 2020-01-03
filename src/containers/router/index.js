import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AuthPages from 'containers/pages/auth'
import BlogPages from 'containers/pages/blog'
import UserPages from 'containers/pages/user'
import SecureRoute from './SecureRoute'

const AppRouter = () => {
    return (
        <div className='app'>
            <Switch>
                <Route path='/auth'>
                    <AuthPages />
                </Route>
                <SecureRoute path='/user'>
                    <UserPages />
                </SecureRoute>
                <Route path='/'>
                    <BlogPages />
                </Route>
            </Switch>
        </div>
    )
}

export default AppRouter