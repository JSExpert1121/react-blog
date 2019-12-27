import React from 'react'
import { Link } from 'react-router-dom'

const menus = [
    {
        to: '/auth/login',
        label: 'Log in'
    }
]

const CommonHeader = () => {

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
                        {menus.map((menu, idx) => (
                            <li key={idx} className="nav-item">
                                <Link className="nav-link" to={menu.to}>{menu.label}<span className="sr-only">(current)</span></Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default CommonHeader
