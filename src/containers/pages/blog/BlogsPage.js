import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import BlogItem from './BlogItem'
import * as BlogActions from 'store/actions/blog'

import './blogs.scss'

const BlogsPage = () => {

    const [busy, setBusy] = React.useState(false)
    const [error, setError] = React.useState('')
    const dispatch = useDispatch()

    const blog = useSelector(state => state.blog)

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
            const error = err.data
            if (error.errors) {
                setError(error.errors)
            } else {
                setError('Unknown Error')
            }
        } finally {
            setBusy(false)
        }
    }, [dispatch, busy])

    React.useEffect(() => {
        getBlogs(1, 10)
    }, [])

    if (error) {
        return <div>{error}</div>
    }

    return (
        <section className='container blog-container'>
            {busy && (
                <div
                    className='spinner-border busy text-primary m-auto'
                    role='status'
                />
            )}

            {blog.blogs.map(blog => (
                <BlogItem key={blog._id} blog={blog} />
            ))}
        </section>
    )
}

export default BlogsPage
