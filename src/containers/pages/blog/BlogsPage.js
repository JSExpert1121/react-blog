import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import BlogItem from './BlogItem'
import * as BlogActions from 'store/actions/blog'
import { getErrorString } from 'helper/error'

import './blogs.scss'

const BlogsPage = props => {

    const [busy, setBusy] = React.useState(false)
    const [error, setError] = React.useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const blogs = useSelector(state => state.blog.blogs)
    const total = useSelector(state => state.blog.count)

    const handlePost = React.useCallback(e => {
        history.push('/blog/create')
    }, [history])

    const getBlogs = React.useCallback(async (page, size) => {
        if (busy) return

        setBusy(true)
        try {
            await dispatch(BlogActions.getCount())
            await dispatch(BlogActions.getBlogs({
                page,
                pageSize: size
            }))
        } catch (err) {
            setError(getErrorString(err))
        } finally {
            setBusy(false)
        }
    }, [dispatch, busy])

    React.useEffect(() => {
        getBlogs(1, 10)
        // eslint-disable-next-line
    }, [])

    if (error) {
        return (
            <section className='container blog-container'>
                {error}
            </section>
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

            <div className='row'>
                <h4 className='text-dark m-4 flex-grow-1'>
                    {`Total: ${total} posts`}
                </h4>
                <button className='btn btn-primary mx-4 my-auto' onClick={handlePost}>
                    Post a new
                </button>
            </div>
            {blogs.map(blog => (
                <BlogItem key={blog._id} blog={blog} />
            ))}
        </section>
    )
}

export default BlogsPage
