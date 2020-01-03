import React from 'react'
import { Route, Switch, Redirect, useRouteMatch, useLocation, Link } from 'react-router-dom'

import GeneralPage from './General'

const PAGES = [
    { label: 'General', path: 'general', component: GeneralPage },
    { label: 'Employment', path: 'employment', component: GeneralPage },
    { label: 'Education', path: 'education', component: GeneralPage }
]

const ProfilePage = () => {

    const match = useRouteMatch()
    const location = useLocation()
    const current = React.useMemo(() => {
        if (location.pathname.endsWith('employment')) {
            return 1
        } else if (location.pathname.endsWith('education')) {
            return 2
        } else {
            return 0
        }
    }, [location.pathname])


    return (
        <section className='d-flex flex-column shadow-sm p-5 bg-white rounded'>

            <div className="btn-group mb-4" role="group" aria-label="profile-tabs">
                {PAGES.map((page, idx) => (
                    <Link
                        key={page.label}
                        className={'btn btn-link' + ((idx === current) ? ' active-link' : '')}
                        to={`${match.url}/${page.path}`}
                    >
                        {page.label}
                    </Link>
                ))}
            </div>

            <Switch>
                <Route path={`${match.url}/general`}>
                    <GeneralPage />
                </Route>
                <Route path={`${match.url}/employment`}>
                    <GeneralPage />
                </Route>
                <Route path={`${match.url}/education`}>
                    <GeneralPage />
                </Route>
                <Redirect to={`${match.url}/general`} />
            </Switch>
        </section>
    )
}

export default ProfilePage
