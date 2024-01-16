import { useLocation } from "react-router-dom"

export function Post(post) {
    const { state } = useLocation();
    const { _id, title, text, author, comments, dateCreated } = state.data

    return (
        <div className="post-container">
            <div className="title-container">{title}</div>
            <div className="text-container">{text}</div>
            <div className="author-container">{author.username}</div>
            <div className="dateCreated-container">{dateCreated}</div>
            <div className="comments-container">{comments}</div>
        </div>
    )
}