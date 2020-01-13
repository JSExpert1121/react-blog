import React from 'react'

// custom components
import Tag from 'components/blog/Tag'
import IconText from 'components/blog/IconText'
import Comment from 'components/blog/Comment'
import './blogs.scss'

const BlogDetailItem = ({ blog, updateComment, deleteComment }) => {

    const { user, cover, title, short, description, tags, likes, dislikes, claps, createdAt, comments } = blog
    const { name, profile } = user

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
        <article className='blog-detail-item py-2 px-3 d-flex flex-column'>
            {cover && (
                <div className='cover-container'>
                    <img src={cover} alt='cover' className='over' />
                </div>
            )}
            <div className='header d-flex'>
                <h3
                    className='title flex-grow-1'
                    to={`/blog/${blog._id}`}
                >
                    {title}
                </h3>
            </div>
            <div className='abstract'>
                <small className='short text-dark flex-grow-1'>
                    {short}
                </small>
                <div className='likes-bar'>
                    <IconText type='fa fa-thumbs-up' data={likes} handleClick={handleLike} />
                    <IconText type='fa fa-thumbs-down' data={dislikes} handleClick={handleDislike} />
                    <IconText type='fa fa-sign-language' data={claps} handleClick={handleClaps} />
                </div>
            </div>
            <div className='body'>
                <p className='text-dark my-2'>
                    {description}
                </p>
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
                    {createdAt && <p className='updated'>{`Created at ${createdAt}`}</p>}
                    <div className='body'>
                        <img
                            src={profile.avatar}
                            className='cover'
                            alt={`${name.first} ${name.last}`}
                        />
                        <div className='d-flex flex-column ml-3'>
                            <h6 className='name'>{`${name.first} ${name.last}`}</h6>
                            <h6 className='title'>{`${profile.title}`}</h6>
                        </div>
                    </div>
                    <div className='d-flex justify-content-around'>
                        {profile.linkedin && (
                            <a className='btn btn-social-icon btn-linkedin social' href={profile.linkedin}>
                                <i className='fa fa-linkedin social'></i>
                            </a>
                        )}
                        {profile.github && (
                            <a className='btn btn-social-icon btn-github social' href={profile.github}>
                                <i className='fa fa-github social'></i>
                            </a>
                        )}
                        {profile.twitter && (
                            <a className='btn btn-social-icon btn-twitter social' href={profile.twitter}>
                                <i className='fa fa-twitter social'></i>
                            </a>
                        )}
                        {profile.facebook && (
                            <a className='btn btn-social-icon btn-facebook social' href={profile.facebook}>
                                <i className='fa fa-facebook social'></i>
                            </a>
                        )}
                    </div>
                </div>
            </div>
            <div className='comments px-1'>
                <hr />
                {comments.map(comment => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        updateComment={updateComment}
                        deleteComment={deleteComment}
                    />
                ))}
            </div>
        </article>
    )
}


export default BlogDetailItem
