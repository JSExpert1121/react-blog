import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

// 3rd party libaries
import { toast } from 'react-toastify'

// components
import ValidTextInput from 'components/form/ValidTextInput'
import * as UserActions from 'store/actions/user'
import { getErrorString } from 'helper/error'
import '../user.scss'

import { useValidator } from 'components/hooks/validator'
import * as validators from 'helper/validators'

const linkedinValidators = [
    { func: validators.isOptionalURL, msg: 'Invalid URL' },
    { func: validators.contains('linkedin'), msg: 'Not a linkedin URL' }
]
const facebookValidators = [
    { func: validators.isOptionalURL, msg: 'Invalid URL' },
    { func: validators.contains('facebook'), msg: 'Not a facebook URL' }
]
const twitterValidators = [
    { func: validators.isOptionalURL, msg: 'Invalid URL' },
    { func: validators.contains('twitter'), msg: 'Not a twitter URL' }
]
const githubValidators = [
    { func: validators.isOptionalURL, msg: 'Invalid URL' },
    { func: validators.contains('github'), msg: 'Not a github URL' }
]


const SocialLinks = () => {

    const user = useSelector(state => state.user, shallowEqual)
    const dispatch = useDispatch()

    // links
    const [linkedin, setLinkedin] = React.useState(user.profile?.linkedin || '')
    const [facebook, setFacebook] = React.useState(user.profile?.facebook || '')
    const [github, setGithub] = React.useState(user.profile?.github || '')
    const [twitter, setTwitter] = React.useState(user.profile?.twitter || '')

    const linkedinMsg = useValidator(linkedin, linkedinValidators)
    const facebookMsg = useValidator(facebook, facebookValidators)
    const githubMsg = useValidator(github, githubValidators)
    const twitterMsg = useValidator(twitter, twitterValidators)

    // activity
    const [error, setError] = React.useState('')
    const [busy, setBusy] = React.useState(false)


    const handleUpdate = React.useCallback(async e => {
        e.preventDefault()
        if (busy) return

        setBusy(true)
        try {
            await dispatch(UserActions.updateProfile(user.token, {
                linkedin, facebook,
                github, twitter
            }))
            toast.success('Profile updated', { className: 'p-4' })
        } catch (err) {
            setError(getErrorString(err))
        } finally {
            setBusy(false)
        }
    }, [busy, dispatch, user.token, facebook, linkedin, github, twitter])

    React.useEffect(() => {
        setLinkedin(user.profile?.linkedin || '')
        setFacebook(user.profile?.facebook || '')
        setGithub(user.profile?.github || '')
        setTwitter(user.profile?.twitter || '')
    }, [user.profile])

    const submitable = React.useMemo(() => {
        return !linkedinMsg && !facebookMsg && !githubMsg && !twitterMsg
    }, [linkedinMsg, facebookMsg, githubMsg, twitterMsg])

    return (
        <>
            {busy && (
                <div
                    className='spinner-border busy text-primary m-auto'
                    role='status'
                />
            )}

            <form className='user-form'>

                {/* unknown error */}
                <div className='form-group row'>
                    <small
                        id='login-form-help'
                        className='form-text text-danger mx-auto my-2'
                    >
                        {error}
                    </small>
                </div>

                {/* Linkedin */}
                <ValidTextInput
                    component={'input'}
                    label='Linkedin'
                    id='inputLinkedin'
                    value={linkedin}
                    setValue={setLinkedin}
                    placeholder='Input your linkedin profile URL'
                    error={linkedinMsg}
                />

                {/* Facebook */}
                <ValidTextInput
                    component={'input'}
                    label='Facebook'
                    id='inputFacebook'
                    value={facebook}
                    setValue={setFacebook}
                    placeholder='Input your facebook profile URL'
                    error={facebookMsg}
                />

                {/* Github */}
                <ValidTextInput
                    component={'input'}
                    label='Github'
                    id='inputGithub'
                    value={github}
                    setValue={setGithub}
                    placeholder='Input your github profile URL'
                    error={githubMsg}
                />

                {/* Twitter */}
                <ValidTextInput
                    component={'input'}
                    label='Twitter'
                    id='inputTwitter'
                    value={twitter}
                    setValue={setTwitter}
                    placeholder='Input your twitter profile URL'
                    error={twitterMsg}
                />

                {/* submit button */}
                <div className='form-group row mt-4'>
                    <button
                        className='mx-auto my-2 btn btn-primary change-button'
                        onClick={handleUpdate}
                        disabled={!submitable}
                    >
                        Update
                    </button>
                </div>

            </form>
        </>
    )
}

export default SocialLinks
