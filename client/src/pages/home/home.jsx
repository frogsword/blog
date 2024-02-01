/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import "./home.scss"

export function Home() {
    //get all posts to display on home page
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch('https://frogsword-blog-api.adaptable.app/api/posts', {mode: 'no-cors'})
            const res = await response.json()
            setPosts(res)
        }
        fetchData()
        setLoading(false)
    }, [])

    return (
        <>
        <div className="home-container">

            <div className="hero-container">
                <div className="hero-title">
                    <h1>Welcome To My Blog!</h1>
                </div>
                <div className="hero-text">
                    <p>
                        Here is where I share my thoughts on topics in culture and society. This is not a real blog, it is just a project,
                        and I do not actually share my thoughts on culture and society. Take a read, 
                        and make sure to login to share your thoughts in the comments section!
                    </p>
                </div>
            </div>

            <div className="posts-container">
                {loading && (
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                )}
                {posts.map((post) => (
                    <Link to={"/posts/" + post._id} state={post} key={post._id} style={{textDecoration: 'none', color: 'whitesmoke'}}>
                        <div className="post-container">
                            <div className="title-container">{post.title}</div>
                            <div className="text-container">{post.text}</div>
                            <button type="button" id="read-btn" className="btn btn-primary">Read</button>
                        </div>
                    </Link>
                ))}
            </div>

        </div>  
        </>  
    )
}