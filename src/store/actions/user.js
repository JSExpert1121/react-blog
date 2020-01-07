import * as ActionTypes from '../constants'
import AuthApis from 'service/auth'
import UserApis from 'service/user'

const loginSuccess = (data) => ({
    type: ActionTypes.AUTH_LOGIN_SUCCESS,
    payload: data
})

const getuserSuccess = data => ({
    type: ActionTypes.USER_GET_SETTING_SUCCESS,
    payload: data
})

const refreshSuccess = data => ({
    type: ActionTypes.AUTH_REFRESH_TOKEN_SUCCESS,
    payload: data
})

export const logoutSuccess = () => ({
    type: ActionTypes.AUTH_LOGOUT_SUCCESS
})

const gotProfile = data => ({
    type: ActionTypes.USER_GET_PROFILE_SUCCESS,
    payload: data
})

export const login = (email, password) => async dispatch => {
    const data = await AuthApis.login(email, password)
    dispatch(loginSuccess(data))
    const result = await UserApis.getProfile(data.access_token)
    dispatch(gotProfile(result.profile))
}

export const refreshToken = (token, refreshToken) => async dispatch => {
    const data = await AuthApis.refreshToken(token, refreshToken)
    dispatch(refreshSuccess(data))
}

export const logout = token => async dispatch => {
    await AuthApis.logout(token)
    dispatch(logoutSuccess())
}

export const updateUsername = (token, firstName, lastName) => async dispatch => {
    const data = await UserApis.updateUsername(token, firstName, lastName)
    dispatch(getuserSuccess(data))
}

export const getProfile = token => async dispatch => {
    const data = await UserApis.getProfile(token)
    dispatch(gotProfile(data.profile))
}

export const uploadAvatar = (token, image) => async dispatch => {
    await UserApis.uploadAvatar(token, image)
    const result = await UserApis.getProfile(token)
    dispatch(gotProfile(result.profile))
}

export const updateProfile = (token, data) => async dispatch => {
    const result = await UserApis.updateProfile(token, data)
    dispatch(gotProfile(result.profile))
}

export const addEducation = (token, data) => async dispatch => {
    await UserApis.addEducation(token, data)
    const result = await UserApis.getProfile(token)
    dispatch(gotProfile(result.profile))
}

export const addWork = (token, data) => async dispatch => {
    await UserApis.addWork(token, data)
    const result = await UserApis.getProfile(token)
    dispatch(gotProfile(result.profile))
}

export const updateEducation = (id, token, data) => async dispatch => {
    await UserApis.updateEducation(id, token, data)
    const result = await UserApis.getProfile(token)
    dispatch(gotProfile(result.profile))
}

export const updateWork = (id, token, data) => async dispatch => {
    await UserApis.updateWork(id, token, data)
    const result = await UserApis.getProfile(token)
    dispatch(gotProfile(result.profile))
}

export const deleteEducation = (id, token) => async dispatch => {
    await UserApis.deleteEducation(id, token)
    const result = await UserApis.getProfile(token)
    dispatch(gotProfile(result.profile))
}

export const deleteWork = (id, token) => async dispatch => {
    await UserApis.deleteWork(id, token)
    const result = await UserApis.getProfile(token)
    dispatch(gotProfile(result.profile))
}
