import * as UserActions from './user'

class TokenHelper {

    access_token = null
    refresh_token = null
    timer = null
    tokenTime = null
    dispatch = null
    constructor() {
        this.timerHander = this.timerHander.bind(this)
    }

    setToken(dispatch, accToken, refToken, tokenTime) {
        this.access_token = accToken
        this.refresh_token = refToken
        this.dispatch = dispatch
        this.tokenTime = tokenTime || parseInt(Date.now() / 1000)
        if (this.dispatch && this.access_token && this.refresh_token) {
            if (this.timer) {
                clearInterval(this.timer)
            }
            this.timer = setInterval(this.timerHander, 10000)
        }
    }

    clear() {
        this.access_token = null
        this.refresh_token = null
        this.dispatch = null
        this.tokenTime = null
        if (this.timer) {
            clearInterval(this.timer)
        }
        this.timer = null
    }

    async timerHander() {
        const current = parseInt(Date.now() / 1000)
        if ((current - this.tokenTime) < 3000) {
            return
        }

        try {
            await this.dispatch(UserActions.refreshToken(this.access_token, this.refresh_token))
            this.tokenTime = parseInt(Date.now() / 1000)
        } catch (error) {
            console.log(error)
            await this.dispatch(UserActions.logout(this.access_token))
        }
    }
}

export default new TokenHelper()