import React from 'react'

// 3rd party
import moment from 'moment'
import Markdown from 'react-markdown'

const HistoryItem = ({ item, handleEdit, handleDelete }) => {

    const { title, company, role, start, end, content } = item

    return (
        <section className='d-flex edu-item border-gray border-bottom p-2 mb-3'>
            <div className='flex-grow-1 d-flex flex-column'>
                <h5 className='text-dark'>
                    {title}
                </h5>
                <p className='text-dark mb-1'>
                    <span>{company} - {role}</span>
                </p>
                <p className='text-black-50 mb-2'>
                    {moment(start).format('MMM YYYY')} - {moment(end).format('MMM YYYY')}
                </p>
                <Markdown source={content} />
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

export default HistoryItem
