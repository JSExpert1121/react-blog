import * as ActionTypes from '../constants'
import BlogApis from 'service/blog'

export const setSearchKeys = keys => ({
    type: ActionTypes.BLOG_SET_SEARCH_KEY,
    payload: keys
})

export const setSearchFilters = filters => ({
    type: ActionTypes.BLOG_SET_SEARCH_STR,
    payload: filters
})

export const setPageInfo = pageInfo => ({
    type: ActionTypes.BLOG_SET_PAGE_INFO,
    payload: pageInfo
})

export const setSortOrder = ascend => ({
    type: ActionTypes.BLOG_SET_SORT_ORDER,
    payload: ascend
})

export const gotBlogCount = count => ({
    type: ActionTypes.BLOG_GET_COUNT_SUCCESS,
    payload: count
})

export const gotBlogList = data => ({
    type: ActionTypes.BLOG_GET_LIST_SUCCESS,
    payload: data
})

export const gotBlogDetail = data => ({
    type: ActionTypes.BLOG_GET_DETAIL_SUCCESS,
    payload: data
})

export const getCount = () => async dispatch => {
    const { count } = await BlogApis.getCount()
    dispatch(gotBlogCount(count))
}

export const getBlogs = options => async dispatch => {
    const { data } = await BlogApis.get(options)
    dispatch(gotBlogList({ data }))
}

export const getBlogDetail = id => async dispatch => {
    const data = await BlogApis.getDetail(id)
    dispatch(gotBlogDetail(data))
}

export const postBlog = (token, data) => async dispatch => {
    const { id } = await BlogApis.postBlog(token, data)
    const result = await BlogApis.getDetail(id)
    dispatch(gotBlogDetail(result))
}

export const updateBlog = (id, token, data) => async dispatch => {
    const result = await BlogApis.updateBlog(id, token, data)
    dispatch(gotBlogDetail(result))
}

export const addComment = (id, token, content) => async dispatch => {
    await BlogApis.addComment(id, token, content)
    const data = await BlogApis.getBlogDetail(id)
    dispatch(gotBlogDetail(data))
}

export const updateComment = (id, commentId, token, content) => async dispatch => {
    await BlogApis.updateComment(id, commentId, token, content)
    const data = await BlogApis.getBlogDetail(id)
    dispatch(gotBlogDetail(data))
}
