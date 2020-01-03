import React from 'react'

import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import CommonHeader from './CommonHeader'
import CommonFooter from './CommonFooter'
import './styles.scss'

const CommonLayout = props => {

    const Header = props.header
    const Footer = props.footer
    return (
        <div className='container layout d-flex flex-column'>
            <Header />
            <main className='main flex-grow-1'>
                {props.children}
            </main>
            <Footer />
            <ToastContainer
                enableMultiContainer={false}
                position={toast.POSITION.TOP_CENTER}
                pauseOnHover
                hideProgressBar
                transition={Bounce}
                autoClose={4000}
                closeOnClick
            />
        </div>
    )
}

CommonLayout.defaultProps = {
    header: CommonHeader,
    footer: CommonFooter
}

export default CommonLayout

