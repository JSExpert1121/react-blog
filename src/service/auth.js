import RestClient from './base'

const BASE_URL = process.env.REACT_APP_SERVICE_BASE_URL + '/auth'

export default {
    login: (email, password) => RestClient.post(
        `${BASE_URL}/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
    ),

    signup: (email, first_name, last_name, password) => RestClient.post(
        `${BASE_URL}/signup`,
        { email, first_name, last_name, password },
        { headers: { 'Content-Type': 'application/json' } }
    ),

    verifyEmail: secToken => RestClient.post(
        `${BASE_URL}/verifymail`,
        { secToken },
        { headers: { 'Content-Type': 'application/json' } }
    ),

    forgotPassword: email => RestClient.post(
        `${BASE_URL}/forgot-password`,
        { email },
        { headers: { 'Content-Type': 'application/json' } }
    ),

    resetPassword: (secToken, email) => RestClient.post(
        `${BASE_URL}/reset`,
        { secToken, email },
        { headers: { 'Content-Type': 'application/json' } }
    ),

    refreshToken: (token, secToken) => RestClient.authPost(
        `${BASE_URL}/refresh`,
        token,
        { secToken },
        { headers: { 'Content-Type': 'application/json' } }
    ),

    logout: token => RestClient.authPost(
        `${BASE_URL}/logout`,
        token, {},
        { headers: { 'Content-Type': 'application/json' } }
    )
}