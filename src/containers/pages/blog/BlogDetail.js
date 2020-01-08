import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import * as BlogActions from 'store/actions/blog'
import './blogs.scss'

const BlogDetail = (props) => {

    const params = useParams()
    const user = useSelector(state => state.user, shallowEqual)
    const dispatch = useDispatch()
    const [busy, setBusy] = React.useState(false)

    const getDetail = React.useCallback(async id => {
        if (busy) return

        setBusy(true)
        try {
            await dispatch(BlogActions.getBlogDetail(id))
        } catch (error) {
            console.log(error)
        } finally {
            setBusy(false)
        }
    }, [busy, dispatch])

    React.useEffect(() => {
        getDetail(params.id)
    }, [])

    return (
        <section className='container blog-container'>
            {busy && (
                <div
                    className='spinner-border busy text-primary m-auto'
                    role='status'
                />
            )}
        </section>
    )
}

export default BlogDetail
