import Axios from 'axios'

Axios.interceptors.response.use(
    response => response,
    error => Promise.reject(error.response)
)
const authConfig = (config, token) => ({
    ...config,
    headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`
    }
})

export default {
    get: (url, config = {}) =>
        Axios.get(url, config).then(res => res.data),
    post: (url, data, config = {}) =>
        Axios.post(url, data, config).then(res => res.data),
    put: (url, data, config = {}) =>
        Axios.put(url, data, config).then(res => res.data),
    delete: (url, config = {}) =>
        Axios.delete(url, config).then(res => res.data),

    // logined access
    authGet: (url, token, config = {}) => {
        return Axios.get(url, authConfig(config, token)).then(res => res.data);
    },
    authPost: (url, token, data, config = {}) => {
        return Axios.post(url, data, authConfig(config, token)).then(res => res.data);
    },
    authPut: (url, token, data, config = {}) => {
        return Axios.put(url, data, authConfig(config, token)).then(res => res.data);
    },
    authDelete: (url, token, config = {}) => {
        return Axios.delete(url, authConfig(config, token)).then(res => res.data);
    }
}