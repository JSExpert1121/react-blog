import React from 'react'
import moment from 'moment'

const EducationItem = ({ education, handleEdit, handleDelete }) => {

    const { university, specialty, start, end, degree } = education

    return (
        <section className='d-flex edu-item border-gray border-bottom p-2 mb-3'>
            <div className='flex-grow-1 d-flex flex-column'>
                <h5 className='text-dark'>
                    {university}
                </h5>
                <p className='text-dark mb-1'>
                    <span>{degree},&nbsp;{specialty}</span>
                </p>
                <p className='text-black-50 mb-2'>
                    {moment(start).format('MMM YYYY')} - {moment(end).format('MMM YYYY')}
                </p>
            </div>
            {handleEdit && handleDelete && (
                <div className='my-2 d-flex flex-column'>
                    <button className='btn rounded' onClick={handleEdit}>
                        <i className='fa fa-edit' style={{ color: 'gray' }} aria-hidden="true" />
                    </button>
                    <button className='btn rounded' onClick={handleDelete}>
                        <i className='fa fa-trash' style={{ color: 'gray' }} aria-hidden="true" />
                    </button>
                </div>
            )}
        </section>
    )
}

EducationItem.propTypes = {

}

export default EducationItem
