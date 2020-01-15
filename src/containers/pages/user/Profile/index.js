import React from 'react'
import { Route, Switch, Redirect, useRouteMatch, useLocation, Link, useHistory } from 'react-router-dom'
import { useSelector, shallowEqual } from 'react-redux'

import GeneralPage from './General'
import EducationPage from './Education'
import HistoryPage from './History'

const PAGES = [
    { label: 'General', path: 'general', component: GeneralPage },
    { label: 'Employment', path: 'employment', component: GeneralPage },
    { label: 'Education', path: 'education', component: GeneralPage }
]

const ProfilePage = () => {

    const match = useRouteMatch()
    const location = useLocation()
    const history = useHistory()
    const user = useSelector(state => state.user, shallowEqual)

    const current = React.useMemo(() => {
        if (location.pathname.endsWith('employment')) {
            return 1
        } else if (location.pathname.endsWith('education')) {
            return 2
        } else {
            return 0
        }
    }, [location.pathname])

    const onPublicProfile = React.useCallback(e => {
        if (!user.user?.id) return
        history.push(`/user/${user.user.id}`)
    }, [history, user])


    return (
        <section className='d-flex flex-column shadow-sm p-5 bg-white rounded'>

            <div className='d-flex justify-content-end mt-0 mb-3'>
                <button className='btn btn-primary' onClick={onPublicProfile}>
                    View Profile
                </button>
            </div>

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
                    <HistoryPage />
                </Route>
                <Route path={`${match.url}/education`}>
                    <EducationPage />
                </Route>
                <Redirect to={`${match.url}/general`} />
            </Switch>
        </section>
    )
}

export default ProfilePage
