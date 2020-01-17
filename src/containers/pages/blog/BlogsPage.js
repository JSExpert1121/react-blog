import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import ReactPaginate from 'react-paginate'

import BlogItem from './BlogItem'
import * as BlogActions from 'store/actions/blog'
import { getErrorString } from 'helper/error'

import './blogs.scss'

const BlogsPage = props => {

    const [busy, setBusy] = React.useState(false)
    const [error, setError] = React.useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const blogs = useSelector(state => state.blog.blogs, shallowEqual)
    const total = useSelector(state => state.blog.count, shallowEqual)
    const user = useSelector(state => state.user, shallowEqual)
    const search = useSelector(state => state.blog.search, shallowEqual)
    const page = useSelector(state => state.blog.page, shallowEqual)
    const ascend = useSelector(state => state.blog.ascend, shallowEqual)

    const handlePost = React.useCallback(e => {
        history.push('/blog/create')
    }, [history])

    const handlePageClick = React.useCallback(data => {
        const newPage = { ...page, no: data.selected }
        dispatch(BlogActions.setPageInfo(newPage))
    }, [dispatch, page])

    const pageCount = React.useMemo(() => {
        return parseInt((total + page.size - 1) / page.size)
    }, [page, total])

    const getBlogs = React.useCallback(async (page, size, search, ascend) => {
        if (busy) return

        setBusy(true)
        try {
            await dispatch(BlogActions.getBlogs({
                page,
                pageSize: size,
                search, ascend
            }))
            setError('')
        } catch (err) {
            setError(getErrorString(err))
        } finally {
            setBusy(false)
        }
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        getBlogs(page.no + 1, page.size, search, ascend)
    }, [search, page, ascend, getBlogs])

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
                {user.user?.id && (
                    <button className='btn btn-primary mx-4 my-auto' onClick={handlePost}>
                        Post a new
                    </button>
                )}
            </div>
            {blogs.map(blog => (
                <BlogItem key={blog._id} blog={blog} />
            ))}

            {pageCount > 1 && (
                <div className='Page'>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination justify-content-center'}
                        pageClassName='page-item'
                        pageLinkClassName='page-link'
                        activeClassName='active'
                        previousClassName='page-item'
                        previousLinkClassName='page-link'
                        nextClassName='page-item'
                        nextLinkClassName='page-link'
                    />
                </div>
            )}
        </section>
    )
}

export default BlogsPage
