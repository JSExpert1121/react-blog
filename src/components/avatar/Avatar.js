import React from 'react'

const Avatar = ({ avatar, name, size }) => {

    const shortName = React.useMemo(() => {
        const arr = name.split(' ')
        return arr.map(item => item.slice(0, 1)).join('')
    }, [name])

    return (
        <>
            {!!avatar && <img src={avatar} alt={name} width={size} height={size} className='my-auto rounded-circle' />}
            {!avatar && (
                <h4
                    className='rounded-circle bg-info text-center'
                    style={{ width: 40, height: 40, color: '#EEE', letterSpacing: 2, lineHeight: 2, margin: 0 }}
                >
                    {shortName}
                </h4>
            )}
        </>
    )
}

Avatar.defaultProps = {
    size: 40
}


export default Avatar
