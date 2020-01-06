import React from 'react'

//3rd party
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DEGREES = ['Bachelor', 'Master', 'Doctor']

const EduEditItem = ({ education, handleSave, handleCancel, eduId }) => {


    const [university, setUniversity] = React.useState(education ? education.university : '')
    const [specialty, setSpecialty] = React.useState(education ? education.specialty : '')
    const [start, setStart] = React.useState(education ? new Date(education.start) : new Date())
    const [end, setEnd] = React.useState(education ? new Date(education.end) : new Date())
    const [degree, setDegree] = React.useState(education ? education.degree : '')

    const universityChange = React.useCallback(e => setUniversity(e.target.value), [])
    const specialtyChange = React.useCallback(e => setSpecialty(e.target.value), [])
    const degreeChange = React.useCallback(e => setDegree(e.target.value), [])

    const onSave = React.useCallback(e => {
        e.preventDefault()
        handleSave({
            _id: eduId,
            university,
            specialty,
            start, end,
            degree
        })
    }, [university, specialty, start, end, degree, handleSave, eduId])

    const onCancel = React.useCallback(e => {
        e.preventDefault()
        handleCancel()
    }, [handleCancel])

    return (
        <form className='w-100 p-4'>
            <div className='form-group row'>
                <label htmlFor='edu-university'>University</label>
                <input
                    type='text'
                    id='edu-university'
                    className='form-control'
                    value={university}
                    onChange={universityChange}
                />
            </div>
            <div className='form-group row'>
                <label htmlFor='edu-specialty'>Specialty</label>
                <input
                    type='text'
                    id='edu-specialty'
                    className='form-control'
                    value={specialty}
                    onChange={specialtyChange}
                />
            </div>
            <div className='row justify-content-between'>
                <div className='form-group'>
                    <label htmlFor='edu-start' className='d-block'>Start Date</label>
                    <DatePicker
                        selected={start}
                        onChange={date => setStart(date)}
                        selectsStart
                        dateFormat="MMM yyyy"
                        showMonthYearPicker
                        id='edu-start'
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='edu-end' className='d-block'>End Date</label>
                    <DatePicker
                        selected={end}
                        onChange={date => setEnd(date)}
                        selectsStart
                        dateFormat="MMM yyyy"
                        showMonthYearPicker
                        id='edu-end'
                        className='form-control'
                    />
                </div>
            </div>
            <div className='form-group row'>
                <label htmlFor='edu-degree'>Degree</label>
                <select
                    className="form-control"
                    id="edu-degree"
                    value={degree}
                    onChange={degreeChange}
                >
                    {DEGREES.map(deg => (
                        <option key={deg} value={deg}>{deg}'s degree</option>
                    ))}
                </select>
            </div>
            <div className='row justify-content-between'>
                <button className='btn btn-secondary' onClick={onCancel}>
                    Cancel
                </button>
                <button className='btn btn-primary' onClick={onSave}>
                    Save
                </button>
            </div>
        </form>
    )
}

export default EduEditItem
