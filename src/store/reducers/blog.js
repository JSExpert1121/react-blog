import * as ActionTypes from '../constants'

const initState = {
    blogs: [],
    current: null,
    keys: [],
    filters: [],
    page: {
        no: 0,
        size: 10
    },
    ascend: true
}

const blogReducer = (state = initState, action) => {
    const payload = action.payload

    switch (action.type) {
        case ActionTypes.BLOG_GET_LIST_SUCCESS:
            return {
                ...state,
                blogs: payload.data,
                blogCount: payload.count
            }
        case ActionTypes.BLOG_GET_DETAIL_SUCCESS:
            return {
                ...state,
                detail: payload
            }
        case ActionTypes.BLOG_SET_SEARCH_KEY:
            return {
                ...state,
                keys: [...payload]
            }
        case ActionTypes.BLOG_SET_PAGE_INFO:
            return {
                ...state,
                page: { ...payload }
            }
        case ActionTypes.BLOG_SET_SEARCH_STR:
            return {
                ...state,
                filters: [...payload]
            }
        case ActionTypes.BLOG_SET_SORT_ORDER:
            return {
                ...state,
                ascend: payload
            }
        default:
            return state
    }
}

export default blogReducer
