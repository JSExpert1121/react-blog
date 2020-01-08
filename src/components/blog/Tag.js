import React from 'react'

const Tag = ({ name, handleClick }) => {

    const onClick = React.useCallback(e => {
        e.preventDefault()
        handleClick && handleClick(name)
    }, [])

    return (
        <div
            className='mx-2 my-1 px-2 py-1'
            style={{
                cursor: 'pointer',
                backgroundColor: '#CEE0ED',
                color: 'dark',
                borderRadius: 4,
                fontSize: '0.75rem',
                height: 24
            }}
            onClick={onClick}
        >
            {name}
        </div>
    )
}

export default Tag
