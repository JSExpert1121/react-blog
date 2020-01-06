import React from 'react'

const Avatar = ({ avatar, name, size, editable }) => {

    const [hover, setHover] = React.useState(false)
    const shortName = React.useMemo(() => {
        const arr = name.split(' ')
        return arr.map(item => item.slice(0, 1)).join('')
    }, [name])

    const onMouseEnter = React.useCallback(e => {
        setHover(true)
    }, [])

    const onMouseLeave = React.useCallback(e => {
        setHover(false)
    }, [])

    const onEdit = React.useCallback(e => {
        e.preventDefault()
    }, [])

    return (
        <div
            className='rounded-circle position-relative'
            style={{ width: size, height: size }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
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
                    className='rounded-circle bg-info text-center'
                    style={{
                        width: size,
                        height: size,
                        color: '#EEE',
                        letterSpacing: 2,
                        lineHeight: 2,
                        margin: 0
                    }}
                >
                    {shortName}
                </h4>
            )}
            {editable && (
                <div
                    className='rounded-circle position-absolute justify-content-center align-items-center'
                    style={{
                        display: hover ? 'inline-flex' : 'none',
                        backgroundColor: '#AAAA',
                        width: size,
                        height: size,
                        left: 0,
                        right: 0
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
