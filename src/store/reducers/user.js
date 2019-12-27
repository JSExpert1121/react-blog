import * as ActionTypes from '../constants'

const initState = {
    user: null,
    profile: null,
    token: null,
    refresh_token: null
}

const userReducer = (state = initState, action) => {
    const payload = action.payload

    switch (action.type) {
        case ActionTypes.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                user: payload.user,
                token: payload.access_token,
                refresh_token: payload.refresh_token
            }
        case ActionTypes.AUTH_REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                token: payload.access_token,
                refresh_token: payload.refresh_token
            }
        case ActionTypes.AUTH_LOGOUT_SUCCESS:
            return {
                user: null,
                profile: null,
                token: null,
                refresh_token: null
            }
        case ActionTypes.USER_GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload
            }
        default:
            return state
    }
}

export default userReducer
