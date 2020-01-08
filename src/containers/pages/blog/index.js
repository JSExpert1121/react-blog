import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import CommonLayout from 'containers/layout/Common'
import BlogsPage from './BlogsPage'

const BlogPage = () => {

    const match = useRouteMatch()
    return (
        <CommonLayout>
            <Switch>
                <Route exact to={`${match.url}/`}>
                    <BlogsPage />
                </Route>
                <Route to={`${match.url}/:id`}>
                    Blog detail
                </Route>
            </Switch>
        </CommonLayout>
    )
}

export default BlogPage
