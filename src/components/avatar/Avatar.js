import React from 'react'

import './avatar.scss'

const Avatar = ({ avatar, name, size, editable }) => {

    const shortName = React.useMemo(() => {
        const arr = name.split(' ')
        return arr.map(item => item.slice(0, 1)).join('').toUpperCase()
    }, [name])

    const onEdit = React.useCallback(e => {
        e.preventDefault()
    }, [])

    return (
        <div
            className='rounded-circle avatar-body'
            style={{ width: size, height: size }}
        >
            {!!avatar && (
                <img
                    src={avatar}
                    alt={name}
                    width={size}
                    height={size}
                    className='rounded-circle'
                />
            )}
            {!avatar && (
                <h4
                    className='rounded-circle bg-info w-100 h-100 text-center'
                    style={{
                        width: size,
                        height: size,
                        color: '#EEE',
                        letterSpacing: 2,
                        fontSize: size / 3,
                        lineHeight: 3,
                        margin: 0
                    }}
                >
                    {shortName}
                </h4>
            )}
            {editable && (
                <div
                    className='rounded-circle justify-content-center align-items-center avatar-edit'
                    style={{
                        width: size,
                        height: size,
                    }}
                >
                    <button
                        className='btn rounded-circle'
                        data-toggle="modal"
                        data-target='#image-upload-dialog'
                        onClick={onEdit}
                    >
                        <i className='fa fa-edit' style={{ color: 'white' }} />
                    </button>
                </div>
            )}
        </div>
    )
}

Avatar.defaultProps = {
    size: 40
}


export default Avatar
