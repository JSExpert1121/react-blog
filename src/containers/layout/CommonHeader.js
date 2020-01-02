import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Avatar from 'components/avatar/Avatar'
import * as UserActions from 'store/actions/user'


const CommonHeader = () => {

    const user = useSelector(state => state.user, shallowEqual)
    const dispatch = useDispatch()
    const logout = React.useCallback(() => {
        dispatch(UserActions.logout(user.token))
    }, [dispatch, user.token])

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to='/'>Mini-Blog</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="mx-4 d-flex my-2 my-lg-0 ml-2 flex-grow-1">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav mx-4">
                        {!user.user && (
                            <li className="nav-item">
                                <Link className="nav-link" to='/auth/login'>Log in<span className="sr-only">(current)</span></Link>
                            </li>
                        )}
                        {!!user.user && (
                            <li className="nav-item dropdown cursor-pointer">
                                <div className="nav-link d-flex p-0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <Avatar name={user.user.username} avatar={user.profile ? user.profile.avatar : ''} />
                                    <h5 className='my-auto ml-2'>{user.user.username}</h5>
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to='/user/setting'>User Setting</Link>
                                    <Link className="dropdown-item" to='/user/profile'>My Profile</Link>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item" onClick={logout}>Log out</button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default CommonHeader
