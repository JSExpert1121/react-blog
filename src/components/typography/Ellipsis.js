import React from 'react'

const Ellipsis = props => {

    const { children, fontSize, maxLines, hidden, ...rest } = props;
    const realSize = React.useMemo(() => fontSize || '1rem', [fontSize])
    const realLines = React.useMemo(() => maxLines || 2, [maxLines])

    return (
        <span
            style={{
                display: '-webkit-box',
                maxHeight: `calc(${realLines} * ${1.5} * ${realSize})`,
                lineHeight: '1.5',
                visibility: !!hidden ? 'hidden' : 'visible',
                fontSize: realSize,
                'WebkitLineClamp': realLines,
                'WebkitBoxOrient': 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}
            {...rest}
        >
            {children}
        </span>
    )
}

export default Ellipsis
