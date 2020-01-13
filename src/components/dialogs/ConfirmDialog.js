import React from 'react'
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const ConfirmDialog = props => {

    const { title, msg, children, isOpen, onClose, onYes, onNo } = props
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel='Confirm Dialog'
            ariaHideApp={false}
        >
            <h2 className='text-center'>{title}</h2>
            <div className='content'>
                <p>{msg}</p>
                {children}
            </div>
            <div className='actions d-flex justify-content-end'>
                <button className='btn btn-secondary mr-4' onClick={onNo}>
                    No
                </button>
                <button className='btn btn-primary mr-2' onClick={onYes}>
                    Yes
                </button>
            </div>
        </Modal>
    )
}

export default ConfirmDialog
