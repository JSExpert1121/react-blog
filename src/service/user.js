import RestClient from './base'

const PROFILE_BASE_URL = process.env.REACT_APP_SERVICE_BASE_URL + '/profile'
const USER_BASE_URL = process.env.REACT_APP_SERVICE_BASE_URL + '/user'

export default {
    updateUsername: (token, first_name, last_name) => RestClient.authPost(
        `${USER_BASE_URL}`,
        token,
        { first_name, last_name }
    ),

    changePassword: (token, oldPassword, newPassword) => RestClient.authPost(
        `${USER_BASE_URL}/changepass`,
        token,
        { oldPassword, newPassword }
    ),

    uploadAvatar: (token, image) => {
        const formData = new FormData()
        formData.append('file', image)

        return RestClient.authPost(
            `${PROFILE_BASE_URL}/avatar`,
            token,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )
    },

    getProfile: token => RestClient.authGet(
        `${PROFILE_BASE_URL}`,
        token
    ),

    updateProfile: (token, data) => RestClient.authPut(
        `${PROFILE_BASE_URL}`,
        token,
        data
    ),

    requestCode: (token, phone) => RestClient.authPost(
        `${PROFILE_BASE_URL}/sendcode`,
        token,
        { phone }
    ),

    verifyPhone: (token, code) => RestClient.authPost(
        `${PROFILE_BASE_URL}/phoneverify`,
        token,
        { code }
    ),

    addEducation: (token, data) => RestClient.authPost(
        `${PROFILE_BASE_URL}/education`,
        token,
        data
    ),

    addWork: (token, data) => RestClient.authPost(
        `${PROFILE_BASE_URL}/work`,
        token,
        data
    ),

    updateEducation: (id, token, data) => RestClient.authPost(
        `${PROFILE_BASE_URL}/education/${id}`,
        token,
        data
    ),

    updateWork: (id, token, data) => RestClient.authPost(
        `${PROFILE_BASE_URL}/work/${id}`,
        token,
        data
    ),

    deleteEducation: (id, token) => RestClient.authDelete(
        `${PROFILE_BASE_URL}/education/${id}`,
        token
    ),

    deleteWork: (id, token) => RestClient.authDelete(
        `${PROFILE_BASE_URL}/work/${id}`,
        token
    )
}