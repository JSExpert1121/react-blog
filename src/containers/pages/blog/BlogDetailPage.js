import React from 'react'
import { useParams, useLocation, Redirect } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { toast } from 'react-toastify'

import * as BlogActions from 'store/actions/blog'
import './blogs.scss'
import BlogDetailItem from './BlogDetailItem'
import CommentForm from 'components/blog/CommentForm'
import ConfirmDialog from 'components/dialogs/ConfirmDialog'

const BlogDetailPage = (props) => {

    const params = useParams()
    const location = useLocation()

    const user = useSelector(state => state.user, shallowEqual)
    const author = useSelector(state => state.blog.current?.user)
    const detail = useSelector(state => state.blog.current, shallowEqual)
    const dispatch = useDispatch()

    const [confirm, setConfirm] = React.useState(false)
    const [form, setForm] = React.useState('')
    const [comment, setComment] = React.useState('')
    const [busy, setBusy] = React.useState(false)
    const [error, setError] = React.useState('')
    const [redir, setRedir] = React.useState('')


    // fetch blog detail
    const getDetail = React.useCallback(async id => {
        if (busy) return

        setBusy(true)
        try {
            await dispatch(BlogActions.getBlogDetail(id))
        } catch (err) {
            const error = err.data
            if (error && error.errors && typeof error.errors === 'string') {
                setError(error.errors)
            } else {
                setError('Unknown error: ', JSON.stringify(error))
            }
        } finally {
            setBusy(false)
        }
    }, [busy, dispatch])

    React.useEffect(() => {
        getDetail(params.id)
    }, [params.id])


    // comment
    const handleAddComment = React.useCallback(e => {
        e.preventDefault()
        if (!user.user?.id) {
            setRedir('/auth/login')
            return
        }

        setComment(null)
        setForm('comment')
    }, [user])

    const handleDeleteComment = React.useCallback(async comment => {
        setComment(comment)
        setConfirm(true)
    }, [])

    const handleUpdateComment = React.useCallback(comment => {
        setComment(comment)
        setForm('comment')
    }, [])

    const deleteComment = React.useCallback(async comment => {
        if (busy) return

        setBusy(true)
        try {
            await dispatch(BlogActions.deleteComment(detail._id, comment._id, user.token))
            toast.success('Delete success', { className: 'p-4' })
        } catch (err) {
            const error = err ? err.data : {}
            if (error && error.errors && typeof error.errors === 'string') {
                setError(error.errors)
            } else {
                setError('Unknown Error')
            }
        } finally {
            setBusy(false)
        }
    }, [detail._id, user.token, busy, dispatch])

    const updateComment = React.useCallback(async (id, content) => {
        if (busy) return

        setBusy(true)
        try {
            await dispatch(BlogActions.updateComment(detail._id, id, user.token, content))
            toast.success('Update success', { className: 'p-4' })
        } catch (err) {
            const error = err ? err.data : {}
            if (error && error.errors && typeof error.errors === 'string') {
                setError(error.errors)
            } else {
                setError('Unknown Error')
            }
        } finally {
            setBusy(false)
            setForm('')
        }
    }, [detail._id, user.token, busy, dispatch])

    const addComment = React.useCallback(async content => {
        if (busy) return

        setBusy(true)
        try {
            await dispatch(BlogActions.addComment(detail._id, user.token, content))
            toast.success('Add success', { className: 'p-4' })
        } catch (err) {
            alert(JSON.stringify(err.data))
            const error = err ? err.data : {}
            if (error && error.errors && typeof error.errors === 'string') {
                setError(error.errors)
            } else {
                setError('Unknown Error')
            }
        } finally {
            setBusy(false)
            setForm('')
        }
    }, [busy, dispatch, detail, user.token])

    const cancelComment = React.useCallback(() => {
        setForm('')
    }, [])

    const updatePost = React.useCallback(e => {
        console.log(detail)
    }, [detail])


    // confirm dialog
    const closeConfirm = React.useCallback(e => {
        setConfirm(false)
    }, [])

    const handleYes = React.useCallback(e => {
        deleteComment(comment)
        setConfirm(false)
    }, [comment, deleteComment])


    // return
    if (error) {
        return (
            <section className='container blog-container'>
                <p className='text-danger'>{error}</p>
            </section>
        )
    }

    if (redir) {
        return (
            <Redirect
                to={{
                    pathname: redir,
                    state: { referrer: location.pathname }
                }}
            />
        )
    }

    return (
        <section className='container blog-container'>
            {busy && (
                <div
                    className='spinner-border busy text-primary m-auto'
                    role='status'
                />
            )}
            <BlogDetailItem
                blog={detail}
                updateComment={handleUpdateComment}
                deleteComment={handleDeleteComment}
            />
            <div className='px-3 py-1'>
                {form === 'comment' && (
                    <CommentForm
                        addComment={addComment}
                        updateComment={updateComment}
                        cancel={cancelComment}
                        initial={comment}
                    />
                )}
            </div>
            <div className='px-3 blog-actions d-flex'>
                <button className='btn btn-link' onClick={handleAddComment}>
                    Add a comment
                </button>
                {user?.user?.id === author._id && (
                    <button className='btn btn-link' onClick={updatePost}>Edit</button>
                )}
            </div>
            <ConfirmDialog
                title='Delete a comment'
                msg='Are you sure to delete a comment'
                isOpen={confirm}
                onClose={closeConfirm}
                onYes={handleYes}
                onNo={closeConfirm}

            >
                {comment?.content}
            </ConfirmDialog>
        </section>
    )
}

export default BlogDetailPage
