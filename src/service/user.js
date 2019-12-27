import RestClient from './base'

const BASE_URL = process.env.REACT_APP_SERVICE_BASE_URL + '/profile'

export default {
    getProfile: token => RestClient.authGet(
        `${BASE_URL}`,
        token
    ),

    updateProfile: (token, data) => RestClient.authPut(
        `${BASE_URL}`,
        token,
        data
    ),

    requestCode: (token, phone) => RestClient.authPost(
        `${BASE_URL}/sendcode`,
        token,
        { phone }
    ),

    verifyPhone: (token, code) => RestClient.authPost(
        `${BASE_URL}/phoneverify`,
        token,
        { code }
    ),

    addEducation: (token, data) => RestClient.authPost(
        `${BASE_URL}/education`,
        token,
        data
    ),

    addWork: (token, data) => RestClient.authPost(
        `${BASE_URL}/work`,
        token,
        data
    ),

    updateEducation: (id, token, data) => RestClient.authPost(
        `${BASE_URL}/education/${id}`,
        token,
        data
    ),

    updateWork: (id, token, data) => RestClient.authPost(
        `${BASE_URL}/work/${id}`,
        token,
        data
    ),

    deleteEducation: (id, token) => RestClient.authDelete(
        `${BASE_URL}/education/${id}`,
        token
    ),

    deleteWork: (id, token) => RestClient.authDelete(
        `${BASE_URL}/work/${id}`,
        token
    )
}