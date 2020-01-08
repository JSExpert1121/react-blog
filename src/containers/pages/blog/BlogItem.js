import React from 'react'
import { Link } from 'react-router-dom'

// custom components
import Tag from 'components/blog/Tag'
import IconText from 'components/blog/IconText'
import Ellipsis from 'components/typography/Ellipsis'

import './blogs.scss'

const BlogItem = ({ blog }) => {

    const { user, cover, title, short, description, tags, likes, dislikes, claps, edited } = blog

    const tagClick = React.useCallback(tag => {
        console.log(tag, ' clicked')
    }, [])

    const handleLike = React.useCallback(e => {
        console.log('Like clicked')
    }, [])

    const handleDislike = React.useCallback(e => {
        console.log('Dislike clicked')
    }, [])

    const handleClaps = React.useCallback(e => {
        console.log('Claps clicked')
    }, [])

    return (
        <div className='blog-item pb-4 pt-2 px-2 d-flex flex-column'>
            {cover && <img src={cover} alt='cover' className='blog-cover' />}
            <div className='blog-header d-flex'>
                <Link
                    className='flex-grow-1 blog-title font-weight-bold'
                    to={`/blog/${blog._id}`}
                >
                    {title}
                </Link>
            </div>
            <div className='blog-abstract'>
                <small className='blog-short text-dark flex-grow-1'>
                    {short}
                </small>
                <div className='blog-likes-bar'>
                    <IconText type='fa fa-thumbs-up' data={likes} handleClick={handleLike} />
                    <IconText type='fa fa-thumbs-down' data={dislikes} handleClick={handleDislike} />
                    <IconText type='fa fa-sign-language' data={claps} handleClick={handleClaps} />
                </div>
            </div>
            <div className='blog-body'>
                <Ellipsis className='text-dark my-2' maxLines={2}>
                    {description}
                </Ellipsis>
            </div>
            <div className='blog-footer mr-4'>
                <div className='blog-footer-left'>
                    <div className='blog-tags'>
                        {tags && tags.map(tag => (
                            <Tag key={tag} name={tag} handleClick={tagClick} />
                        ))}
                    </div>
                </div>
                <div className='blog-author my-auto'>
                    {edited && <p className='edited'>{`Updated at ${edited}`}</p>}
                    <div className='body'>
                        <img
                            src={user.profile.avatar}
                            className='cover'
                            alt={`${user.name.first} ${user.name.last}`}
                        />
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
