import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import Tag from './Tag'
import moment from 'moment'

import './Comment.scss'

const Comment = ({ comment, updateComment, deleteComment }) => {

    const curUser = useSelector(state => state.user, shallowEqual)
    const { content, user, createdAt } = comment
    const handleUpdate = React.useCallback(e => {
        updateComment(comment)
    }, [comment, updateComment])

    const handleDelete = React.useCallback(e => {
        deleteComment(comment)
    }, [comment, deleteComment])

    return (
        <div className='w-100 comment'>
            <span>{content}</span>
            <span>&nbsp;-&nbsp;</span>
            <Tag name={`${user?.name?.first} ${user?.name?.last}`} />
            <span className='text-black-50'>{moment(createdAt).format('lll')}</span>
            {curUser?.user?.id === user?._id && user?._id && (
                <div className='edit'>
                    <i className='fa fa-edit mr-2' onClick={handleUpdate} />
                    <i className='fa fa-trash' onClick={handleDelete} />
                </div>
            )}
        </div>
    )
}

export default Comment
