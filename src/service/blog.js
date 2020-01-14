import RestClient from './base'

const BASE_URL = process.env.REACT_APP_SERVICE_BASE_URL + '/blogs'

export default {
    getTags: () => RestClient.get(`${BASE_URL}/tags`),

    get: options => RestClient.get(
        `${BASE_URL}`,
        {
            headers: { 'Content-Type': 'application/json' },
            params: options
        }
    ),

    getCount: () => RestClient.get(`${BASE_URL}/count`),

    getDetail: id => RestClient.get(
        `${BASE_URL}/${id}`
    ),

    postBlog: (token, data) => RestClient.authPost(
        `${BASE_URL}`,
        token,
        data
    ),

    updateBlog: (id, token, data) => RestClient.authPut(
        `${BASE_URL}/${id}`,
        token,
        data
    ),

    deleteBlog: (id, token) => RestClient.authDelete(
        `${BASE_URL}/${id}`,
        token
    ),

    addComment: (id, token, content) => RestClient.authPost(
        `${BASE_URL}/${id}/comments`,
        token,
        { content }
    ),

    updateComment: (id, commentId, token, content) => RestClient.authPut(
        `${BASE_URL}/${id}/comments/${commentId}`,
        token,
        { content }
    ),

    deleteComment: (id, commentId, token) => RestClient.authDelete(
        `${BASE_URL}/${id}/comments/${commentId}`,
        token
    )
}