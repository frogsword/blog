import { Link } from 'react-router-dom'

export function PostPreview(post) {
    return (
        <div className="post-container">
            <div className="title-container">{post.data.title}</div>
            <div className="text-container">{post.data.text}</div>
            <div className="author-container">{post.data.author.username}</div>
            <Link to={"/posts/" + post.data._id} state={post}>
                <button type="button">click</button>
            </Link>
        </div>
    )
}