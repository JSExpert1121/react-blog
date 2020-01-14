import React from 'react'

const CommentForm = ({ addComment, updateComment, cancel, initial }) => {

    const [content, setContent] = React.useState(initial?.content || '')
    const contentChange = React.useCallback(e => {
        setContent(e.target.value)
    }, [])

    React.useEffect(() => {
        setContent(initial?.content || '')
    }, [initial])

    const handleAdd = React.useCallback(e => {
        e.preventDefault()
        if (initial) {
            updateComment(initial._id, content)
        } else {
            addComment(content)
        }
    }, [initial, addComment, content, updateComment])

    return (
        <form className='d-flex'>
            <textarea
                rows={1}
                type='text'
                className='w-100 form-control mr-2 flex-grow-1'
                value={content}
                onChange={contentChange}
            />
            <div className='d-flex flex-column'>
                <div className='d-flex'>
                    <button
                        className='btn btn-primary mr-2'
                        onClick={handleAdd}
                    >
                        {initial ? 'Update' : 'Add'}
                    </button>
                    <button
                        className='btn btn-secondary'
                        onClick={cancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}


export default CommentForm
