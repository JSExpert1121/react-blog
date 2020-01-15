import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

// 3rd party libaries
import Markdown from 'react-markdown'

// components
import Avatar from 'components/avatar/Avatar'
import EducationItem from './Profile/EduItem'
import HistoryItem from './Profile/HistoryItem'
import { getErrorString } from 'helper/error'

import './user.scss'
import * as UserActions from 'store/actions/user'

const Public = props => {

    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user, shallowEqual)
    const publicProfile = useSelector(state => state.user.public, shallowEqual)

    const [busy, setBusy] = React.useState(false)
    const [error, setError] = React.useState('')

    const editProfile = React.useCallback(e => {
        if (!user.user?.id) return
        history.push(`/user/profile`)
    }, [history, user])

    const educations = React.useMemo(() => {
        if (publicProfile?.qualification?.education) {
            return publicProfile.qualification.education
        } else {
            return null
        }
    }, [publicProfile])

    const workHistory = React.useMemo(() => {
        if (publicProfile?.qualification?.history) {
            return publicProfile.qualification.history
        } else {
            return null
        }
    }, [publicProfile])

    const username = React.useMemo(() => {
        return `${publicProfile?.user?.name?.first || ''} ${publicProfile?.user?.name?.last || ''}`
    }, [publicProfile])

    const getPublicProfile = React.useCallback(async () => {
        if (busy) return

        setBusy(true)
        try {
            await dispatch(UserActions.getPublicProfile(user.token, params.id))
            setError('')
        } catch (err) {
            setError(getErrorString(err))
        } finally {
            setBusy(false)
        }
    }, [dispatch, user.token, params.id, busy])

    React.useEffect(() => {
        getPublicProfile()
        // eslint-disable-next-line
    }, [params.id])


    // return
    if (error) {
        return (
            <section className='d-flex flex-column shadow-sm p-5 bg-white rounded'>
                <form className='user-form'>
                    <p className='text-danger'>{error}</p>
                </form>
            </section>
        )
    }

    return (
        <section className='d-flex flex-column shadow-sm p-5 bg-white rounded'>

            {busy && (
                <div
                    className='spinner-border busy text-primary m-auto'
                    role='status'
                />
            )}

            {user.user?.id === params.id && (
                <div className='d-flex justify-content-end mt-0 mb-3'>
                    <button className='btn btn-primary' onClick={editProfile}>
                        Edit Profile
                    </button>
                </div>
            )}

            <form className='user-form'>
                <div className='form-group row p-4' id='profile-bio'>
                    <Avatar
                        avatar={publicProfile?.avatar || ''}
                        name={username}
                        size={96}
                        editable
                    />
                    <div className='profile-bio-desc d-flex flex-column justify-content-around ml-3'>
                        <h4 className='text-dark'>
                            {username}
                        </h4>
                        <h5 className='text-dark'>
                            {publicProfile?.title || ''}
                        </h5>
                        <div className='d-flex'>
                            {publicProfile?.linkedin && (
                                <a
                                    className='btn btn-social-icon btn-linkedin social mx-2'
                                    href={publicProfile?.linkedin}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <i className='fa fa-linkedin social'></i>
                                </a>
                            )}
                            {publicProfile?.github && (
                                <a
                                    className='btn btn-social-icon btn-github social mx-2'
                                    href={publicProfile?.github}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <i className='fa fa-github social'></i>
                                </a>
                            )}
                            {publicProfile?.twitter && (
                                <a
                                    className='btn btn-social-icon btn-twitter social mx-2'
                                    href={publicProfile?.twitter}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <i className='fa fa-twitter social'></i>
                                </a>
                            )}
                            {publicProfile?.facebook && (
                                <a
                                    className='btn btn-social-icon btn-facebook social mx-2'
                                    href={publicProfile?.facebook}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <i className='fa fa-facebook social'></i>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className='form-group'>
                    <Markdown
                        source={publicProfile?.description || ''}
                        className='text-dark my-2 mx-3'
                    />
                </div>

                {workHistory && (
                    <div className='form-group mt-4'>
                        <h4 className='font-weight-bold'>Employment History</h4>
                        {workHistory.map(item => (
                            <HistoryItem
                                key={item._id}
                                item={item}
                            />
                        ))}
                    </div>
                )}

                {educations && (
                    <div className='form-group mt-4'>
                        <h4 className='font-weight-bold'>Education History</h4>
                        {educations.map(item => (
                            <EducationItem
                                key={item._id}
                                education={item}
                            />
                        ))}
                    </div>
                )}

            </form>
        </section>
    )
}

export default Public
