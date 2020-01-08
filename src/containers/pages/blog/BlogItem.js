import React from 'react'

// custom components
import Tag from 'components/blog/Tag'
import IconText from 'components/blog/IconText'

import './blogs.scss'

const BlogItem = ({ blog }) => {

    const { user, cover, title, short, description, tags, likes, dislikes, claps, edited } = blog

    const tagClick = React.useCallback(tag => {
        console.log(tag, ' clicked')
    }, [])

    const handleLike = React.useCallback(() => {
        console.log('Like clicked')
    }, [])

    const handleDislike = React.useCallback(() => {
        console.log('Dislike clicked')
    }, [])

    const handleClaps = React.useCallback(() => {
        console.log('Claps clicked')
    }, [])

    return (
        <div className='blog-item pb-4 pt-2 px-2 d-flex flex-column'>
            {cover && <img src={cover} alt='cover' className='blog-cover' />}
            <div className='blog-header d-flex'>
                <h4 className='flex-grow-1 blog-title'>{title}</h4>

            </div>
            <div className='blog-abstract'>
                <small className='blog-short text-dark flex-grow-1'>
                    {short}
                </small>
                <div className='blog-likes-bar'>
                    <IconText type='fas fa-thumbs-up' data={likes} handleClick={handleLike} />
                    <IconText type='fas fa-thumbs-down' data={dislikes} handleClick={handleDislike} />
                    <IconText type='fas fa-sign-language' data={claps} handleClick={handleClaps} />
                </div>
            </div>
            <div className='blog-body'>
                <p className='text-dark my-2'>{description}</p>
            </div>
            <div className='blog-footer mr-4'>
                <div className='blog-footer-left'>
                    <div className='blog-tags'>
                        {tags && tags.map(tag => (
                            <Tag key={tag} name={tag} handleClick={tagClick} />
                        ))}
                    </div>
                    <div className='blog-actions'>
                        <button className='btn btn-link'>
                            Add a comment
                    </button>
                    </div>
                </div>
                <div className='blog-author my-auto'>
                    {edited && <p className='edited'>{`Updated at ${edited}`}</p>}
                    <div className='body'>
                        <img src={user.profile.avatar} className='cover' />
                        <div className='d-flex flex-column ml-3'>
                            <h6 className='name'>{`${user.name.first} ${user.name.last}`}</h6>
                            <h6 className='title'>{`${user.profile.title}`}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogItem
