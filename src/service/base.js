import Axios from 'axios'

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
        Axios.get(url, authConfig(config, token)).then(res => res.data);
    },
    authPost: (url, token, data, config = {}) => {
        Axios.post(url, data, authConfig(config, token)).then(res => res.data);
    },
    authPut: (url, token, data, config = {}) => {
        Axios.put(url, data, authConfig(config, token)).then(res => res.data);
    },
    authDelete: (url, token, config = {}) => {
        Axios.delete(url, authConfig(config, token)).then(res => res.data);
    }
}