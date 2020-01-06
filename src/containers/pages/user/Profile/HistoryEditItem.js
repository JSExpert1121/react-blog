import React from 'react'

//3rd party
import DatePicker from 'react-datepicker'
import SimpleMde from 'react-simplemde-editor'
import 'react-datepicker/dist/react-datepicker.css'
import 'easymde/dist/easymde.min.css'

const ROLES = ['Intership', 'Individual Contributor', 'Project Manager', 'Team Leader', 'CTO']

const HistoryEditItem = ({ item, handleSave, handleCancel, workId }) => {

    const [title, setTitle] = React.useState(item ? item.title : '')
    const [company, setCompany] = React.useState(item ? item.company : '')
    const [role, setRole] = React.useState(item ? item.role : '')
    const [start, setStart] = React.useState(item ? new Date(item.start) : new Date())
    const [end, setEnd] = React.useState(item ? new Date(item.end) : new Date())
    const [content, setContent] = React.useState(item ? item.content : '')

    const titleChange = React.useCallback(e => setTitle(e.target.value), [])
    const companyChange = React.useCallback(e => setCompany(e.target.value), [])
    const roleChange = React.useCallback(e => setRole(e.target.value), [])

    const onSave = React.useCallback(e => {
        e.preventDefault()
        handleSave({
            _id: workId,
            title,
            company,
            role,
            start, end,
            content
        })
    }, [title, company, role, start, end, content, handleSave, workId])

    const onCancel = React.useCallback(e => {
        e.preventDefault()
        handleCancel()
    }, [handleCancel])


    return (
        <form className='w-100 p-4'>
            <div className='form-group row'>
                <label htmlFor='history-title'>Title</label>
                <input
                    type='text'
                    id='history-title'
                    className='form-control'
                    value={title}
                    onChange={titleChange}
                />
            </div>
            <div className='form-group row'>
                <label htmlFor='history-company'>Company</label>
                <input
                    type='text'
                    id='history-company'
                    className='form-control'
                    value={company}
                    onChange={companyChange}
                />
            </div>
            <div className='form-group row'>
                <label htmlFor='history-role'>Role</label>
                <select
                    className="form-control"
                    id="history-role"
                    value={role}
                    onChange={roleChange}
                >
                    {ROLES.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>
            <div className='row justify-content-between'>
                <div className='form-group'>
                    <label htmlFor='history-start' className='d-block'>Start Date</label>
                    <DatePicker
                        selected={start}
                        onChange={date => setStart(date)}
                        selectsStart
                        dateFormat="MMM yyyy"
                        showMonthYearPicker
                        id='history-start'
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='history-end' className='d-block'>End Date</label>
                    <DatePicker
                        selected={end}
                        onChange={date => setEnd(date)}
                        selectsStart
                        dateFormat="MMM yyyy"
                        showMonthYearPicker
                        id='history-end'
                        className='form-control'
                    />
                </div>
            </div>
            <div className='form-group row'>
                <SimpleMde
                    id='history-content'
                    label='Description'
                    value={content}
                    onChange={setContent}
                    className='w-100'
                    options={{
                        spellChecker: false,
                        placeholder: 'Decription here',
                    }}
                />
            </div>
            <div className='row justify-content-between'>
                <button className='btn btn-secondary' onClick={onCancel}>
                    Cancel
                </button>
                <button className='btn btn-primary' onClick={onSave}>
                    Save
                </button>
            </div>
        </form >
    )
}

export default HistoryEditItem
