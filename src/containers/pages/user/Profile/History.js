import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

// 3rd party
import { toast } from 'react-toastify'

// components
import HistoryEditItem from './HistoryEditItem'
import HistoryItem from './HistoryItem'

// apis and actions
import * as UserActions from 'store/actions/user'

import '../user.scss'

const HistoryPage = props => {

    const user = useSelector(state => state.user, shallowEqual)
    const dispatch = useDispatch()

    const [editing, setEditing] = React.useState('')
    const [busy, setBusy] = React.useState(false)

    const history = React.useMemo(() => {
        if (user.profile && user.profile.qualification && user.profile.qualification.history) {
            return user.profile.qualification.history
        } else {
            return []
        }
    }, [user.profile])

    const handleSave = React.useCallback(async work => {
        if (busy) return

        setBusy(true)
        try {
            let msg = 'History item added'
            if (editing === 'new') {
                await dispatch(UserActions.addWork(user.token, work))
            } else {
                await dispatch(UserActions.updateWork(work._id, user.token, work))
                msg = 'History item updated'
            }
            toast.success(msg, { className: 'p-4' })
        } catch (err) {
            const error = err.data
            let msg = 'Unknown error'
            if (error && error.errors && typeof error.errors === 'string') {
                msg = error.errors
            }

            toast.error(msg, { className: 'p-4' })
        } finally {
            setBusy(false)
            setEditing('')
        }
    }, [user.token, dispatch, busy, editing])

    const handleCancel = React.useCallback(() => {
        setEditing('')
    }, [])

    const handleAdd = React.useCallback(() => {
        setEditing('new')
    }, [])

    const handleDelete = React.useCallback(async id => {
        if (busy) return

        setBusy(true)
        try {
            await dispatch(UserActions.deleteWork(id, user.token))
            toast.success('Education item deleted', { className: 'p-4' })
        } catch (err) {
            const error = err.data
            let msg = 'Unknown error'
            if (error && error.errors && typeof error.errors === 'string') {
                msg = error.errors
            }

            toast.error(msg, { className: 'p-4' })
        } finally {
            setBusy(false)
        }
    }, [busy, dispatch, user.token])

    return (
        <div className='d-flex flex-column edu-page'>
            {busy && (
                <div
                    className='spinner-border busy text-primary m-auto'
                    role='status'
                />
            )}

            {history.map(item => {
                if (item._id === editing) {
                    return <HistoryEditItem
                        key={item._id}
                        workId={item._id}
                        item={item}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                } else {
                    return <HistoryItem
                        key={item._id}
                        item={item}
                        handleEdit={() => setEditing(item._id)}
                        handleDelete={() => handleDelete(item._id)}
                    />
                }
            })}

            {editing === 'new' ? (
                <HistoryEditItem
                    key={'new'}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                />
            ) : (
                    <div className='my-2 row justify-content-center'>
                        <button className='btn btn-link' onClick={handleAdd}>
                            <i className='fa fa-plus' />
                        </button>
                    </div>
                )}
        </div>

    )
}

export default HistoryPage
