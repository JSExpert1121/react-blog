import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

// 3rd party libaries
import Select from 'react-select'
import { toast } from 'react-toastify'
import SimpleMde from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

// custom components
import ValidatedInput from 'components/form/ValidatedInput'
import 'components/form/form.scss'
import { useValidator } from 'components/hooks/validator'
import * as validators from 'helper/validators'
import { useQuery } from 'components/hooks/query'
import { useAuthenticate } from 'components/hooks/authenticate'
import { getErrorString } from 'helper/error'

import * as BlogActions from 'store/actions/blog'
import './blogs.scss'


const titleValidators = [{ func: validators.isRequired, msg: 'Title is required' }]
const descValidators = [{ func: validators.isRequired, msg: 'Description is required' }]
const tagsValidators = [{ func: validators.isRequired, msg: 'Tags are required' }]


const BlogPost = props => {

    const { update } = props

    const user = useSelector(state => state.user, shallowEqual)
    const detail = useSelector(state => state.blog.current, shallowEqual)
    const allTags = useSelector(state => state.blog.tags, shallowEqual)
    const dispatch = useDispatch()
    const history = useHistory()

    const [error, setError] = React.useState('')
    const [busy, setBusy] = React.useState(false)

    const Redir = useAuthenticate(user)
    const params = useQuery()

    // form input
    const [title, setTitle] = React.useState(update ? detail?.title || '' : '')
    const [short, setShort] = React.useState(update ? detail?.short || '' : '')
    const [desc, setDesc] = React.useState(update ? detail?.description || '' : '')
    const [tags, setTags] = React.useState(update ? detail?.tags.map(tag => ({ value: tag, label: tag })) || [] : [])
    const titleMsg = useValidator(title, titleValidators)
    const descMsg = useValidator(desc, descValidators)
    const tagsMsg = useValidator(tags, tagsValidators)

    // initialize
    const init = React.useCallback(async () => {
        setBusy(true)
        try {
            if (update && !detail) {
                await dispatch(BlogActions.getBlogDetail(params?.id))
            }
            allTags || await dispatch(BlogActions.getTags())
        } catch (err) {
            setError(getErrorString(err))
        } finally {
            setBusy(false)
        }
        // eslint-disable-next-line
    }, [params?.id, dispatch])

    React.useEffect(() => {
        init()
        // eslint-disable-next-line
    }, [])

    const tagList = React.useMemo(() => (allTags || []).map(tag => ({ value: tag, label: tag })), [allTags])

    React.useEffect(() => {
        if (update) {
            setTitle(detail?.title || '')
            setShort(detail?.short || '')
            setTags((detail?.tags || []).map(tag => ({ value: tag, label: tag })))
            setDesc(detail?.description || '')
        }
        // eslint-disable-next-line
    }, [detail])


    // form input
    const changeTitle = React.useCallback(e => {
        setTitle(e.target.value)
    }, [])
    const changeShort = React.useCallback(async e => {
        setShort(e.target.value)
    }, [])

    const handleUpdate = React.useCallback(async e => {
        e.preventDefault()
        if (busy) return

        setBusy(true)
        try {
            let id = null
            if (update) {
                id = await dispatch(BlogActions.updateBlog(detail?._id, user.token, {
                    title, short,
                    tags: tags.map(tag => tag.value),
                    description: desc,
                }))
                toast.success('Blog updated', { className: 'p-4' })
            } else {
                id = await dispatch(BlogActions.postBlog(user.token, {
                    title, short,
                    tags: tags.map(tag => tag.value),
                    description: desc,
                }))
                toast.success('Blog posted', { className: 'p-4' })
            }

            history.push(`/blog/${id}`)
        } catch (error) {
            setError(getErrorString(error))
        } finally {
            setBusy(false)
        }
    }, [busy, update, user.token, title, short, tags, desc, detail, dispatch, history])

    const handleCancel = React.useCallback(e => {
        e.preventDefault()
        history.goBack()
    }, [history])

    const submitable = React.useMemo(() => {
        return tags.length > 0 && title.length > 0 && desc.length > 0
    }, [tags.length, title.length, desc.length])

    // return
    if (Redir) return Redir
    if (error) {
        return (
            <section className='container blog-container'>
                {error}
            </section>
        )
    }

    return (
        <section className='container blog-container'>
            {busy && (
                <div
                    className='spinner-border busy text-primary m-auto'
                    role='status'
                />
            )}

            <h3 className='text-dark m-3 text-center'>
                {update ? 'Update blog' : 'Post a blog'}
            </h3>

            <form className='blog-form mx-auto'>

                {/* tag input */}
                <ValidatedInput
                    component={Select}
                    label='Tags'
                    id='inputTags'
                    options={tagList}
                    className='w-100'
                    value={tags}
                    valueChange={setTags}
                    placeholder='Select tags'
                    error={tagsMsg}
                    isMulti
                />

                {/* title */}
                <ValidatedInput
                    component={'input'}
                    label='Title'
                    id='inputTitle'
                    value={title}
                    valueChange={changeTitle}
                    placeholder='Title'
                    error={titleMsg}
                />

                {/* short description */}
                <div className='form-group row'>
                    <label htmlFor='inputShort'>Short description</label>
                    <input
                        type='text'
                        className='form-control'
                        id='inputShort'
                        placeholder='Short description here'
                        value={short}
                        onChange={changeShort}
                    />
                </div>

                {/* description */}
                <ValidatedInput
                    component={SimpleMde}
                    label='Description'
                    id='inputDesc'
                    className='w-100'
                    value={desc}
                    valueChange={setDesc}
                    options={{
                        spellChecker: false,
                        placeholder: 'Decription here'
                    }}
                    error={descMsg}
                />


                <div className='form-group row justify-content-end'>
                    <button
                        className='btn btn-secondary mr-4'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={handleUpdate}
                        disabled={!submitable}
                    >
                        {update ? 'Update' : 'Post'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default BlogPost
