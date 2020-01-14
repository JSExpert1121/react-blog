import React from 'react'
import { Link } from 'react-router-dom'

// custom components
import Tag from 'components/blog/Tag'
import IconText from 'components/blog/IconText'
import Ellipsis from 'components/typography/Ellipsis'

import './blogs.scss'

const BlogItem = ({ blog }) => {

    const { user, cover, title, short, description, tags, likes, dislikes, claps } = blog

    const tagClick = React.useCallback(tag => {
        console.log(tag, ' clicked')
    }, [])

    return (
        <article className='blog-item pb-4 pt-2 px-3 d-flex flex-column border-top'>
            {cover && (
                <div className='over-container'>
                    <img src={cover} alt='cover' className='over' />
                </div>
            )}
            <div className='header d-flex'>
                <Link
                    className='flex-grow-1 title font-weight-bold'
                    to={`/blog/${blog._id}`}
                >
                    {title}
                </Link>
            </div>
            <div className='abstract'>
                <small className='short text-dark flex-grow-1'>
                    {short}
                </small>
                <div className='likes-bar'>
                    <IconText type='fa fa-thumbs-up' data={likes} />
                    <IconText type='fa fa-thumbs-down' data={dislikes} />
                    <IconText type='fa fa-sign-language' data={claps} />
                </div>
            </div>
            <div className='body'>
                <Ellipsis className='text-dark my-2' maxLines={2}>
                    {description}
                </Ellipsis>
            </div>
            <div className='footer mr-4'>
                <div className='footer-left'>
                    <div className='tags'>
                        {tags && tags.map(tag => (
                            <Tag key={tag} name={tag} handleClick={tagClick} />
                        ))}
                    </div>
                </div>
                <div className='author my-auto'>
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
        </article>
    )
}

export default BlogItem
