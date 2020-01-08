import React from 'react'

const Num2String = num => {
    if (num > 1000000) {
        return (Math.round((num * 10) / 1000000) / 10).toFixed(1) + 'M';
    } else if (num > 1000) {
        return (Math.round((num * 10) / 1000) / 10).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
}

const IconText = ({ type, data, handleClick }) => {
    return (
        <span className='mr-4 text-secondary'>
            <i
                className={type + ' mr-2'}
                onClick={handleClick}
                style={{ cursor: 'pointer', width: 14, height: 14 }}
            />
            <span style={{ fontSize: 14 }}>
                {Num2String(data)}
            </span>
        </span>
    )
}

export default IconText
