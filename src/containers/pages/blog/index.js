import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import CommonLayout from 'containers/layout/Common'
import BlogsPage from './BlogsPage'
import BlogDetail from './BlogDetail'

const BlogPage = () => {

    const match = useRouteMatch()
    return (
        <CommonLayout>
            <Switch>
                <Route path={`${match.url}blog/:id`}>
                    <BlogDetail />
                </Route>
                <Route exact path={`${match.url}`}>
                    <BlogsPage />
                </Route>
            </Switch>
        </CommonLayout>
    )
}

export default BlogPage
