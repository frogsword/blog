/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import "./post.scss"

export function Post() {
    const { state } = useLocation()
    const { _id, title, text, author, dateCreated } = state
    const [loading, setLoading] = useState(true)
    const [errMsg, setErrMsg] = useState(null)
    const navigate = useNavigate()

    //get auth status and comments
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [comments, setComments] = useState([])
    
    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch(`https://frogsword-blog-api.adaptable.app/api/posts/${_id}/comments`)
            const res = await response.json()
            setComments(res)
        }
        fetchData()
        
        const fetchAuth = async() => {
            const token = localStorage.getItem("site")
            if (token === null) {
                setAuthenticated(false)
            }
            else {
                try {
                    const response = await fetch('https://frogsword-blog-api.adaptable.app/api/auth-status', {
                        mode: 'cors',
                        headers: {
                            authorization: `bearer ${token}`,
                        },
                        })
                        const res = await response.json()

                        setUser(res.authData.user._id)
                        setAuthenticated(res.isAuthenticated)
                }
                catch (err) {
                    setAuthenticated(false)
                    setUser(null)
                }
            }
        }
        fetchAuth()
        setLoading(false)
    }, [])

    //submitting comments
    const [input, setInput] = useState({
        comment: ""
    })

    const handleInput = async(e) => {
        const { name, value } = e
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const token = localStorage.getItem("site")



        try {
            const res = await fetch("https://frogsword-blog-api.adaptable.app/api/posts/" + _id + "/comments", {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(input),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': "bearer " + token,
                },
            })
            if (res.status == 403) {
                setErrMsg("Please login so make a comment.")
                return
            }
        } catch (err) {
            setErrMsg("Comment field is empty!")
            return
        }
        navigate("/")
        navigate(`/posts/${_id}`)
        // window.location.reload()
    }

    //deleting comments
    const deleteComment = async(id) => {
        const token = localStorage.getItem("site")

        try {
            await fetch("https://frogsword-blog-api.adaptable.app/api/comments/" + id, {
                mode: "cors",
                method: 'DELETE',
                headers: {
                    'authorization': "bearer " + token,
                },
            })
            .then((res) => console.log(res))
        } catch (err) {console.log(err)}
        navigate("/")
        navigate(`/posts/${_id}`)
        // window.location.reload()
    }

    let date = new Date(dateCreated)
    let newDate = date.toString()
    newDate = newDate.slice(0, 21)

    return (
        <>
        {loading && (<div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
        )}
        <div className="blog-post-container">
            <div className="post-title"><h1>{title}</h1></div>
            <div className="post-author-date">{author.username} • {newDate}</div>
            <div className="post-text">{text}</div>

            <div className="comment-section">
            <h2>Comments</h2>

                {authenticated && (
                <form className="comment-form" onSubmit={handleSubmit}>
                    <textarea name="comment" className="form-control focus-ring focus-ring-light" placeholder="Write a Comment..." aria-label="With textarea" onChange={(e) => handleInput(e.target)}></textarea>
                    <div className="submit-field">
                        {errMsg && (
                            <>
                                <span style={{color: 'red', display: errMsg !== null ? 'contents' : 'none', textAlign: "left"}}>{errMsg}</span>
                                <button type="button submit" id="btn-submit-comment" className="btn btn-primary">Submit</button>
                            </>
                        )}
                        {!errMsg && (
                            <>
                                <p></p>
                                <button type="button submit" id="btn-submit-comment" className="btn btn-primary">Submit</button>
                            </>
                        )}
                    </div>
                </form>
                )}
                {!authenticated && (
                    <h2><Link to="/login">Log In</Link> To Create A Comment</h2>
                )}

            {comments.map((comment) => {
                let date = new Date(comment.dateCreated)
                let newDate = date.toString()
                newDate = newDate.slice(4, 21)
                return (
                        <div key={comment._id} className="comment-container">
                            <div className="comment-info">
                                <div className="comment-author"><b>{comment.user.username}</b> • {newDate}</div>
                                <div className="comment-text">{comment.comment}</div>
                            </div>
                            <div className="btn-group">

                                {/* dropdown btn */}
                                {user === comment.user._id && (
                                    <button className="btn-comment-options" type="button" data-bs-toggle="dropdown" aria-expanded="false"><b>···</b></button>
                                )}

                                {/* dropdown items */}
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" onClick={() => deleteComment(comment._id)}>
                                            Delete
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a className="dropdown-item" data-bs-toggle="collapse" href={`#id${comment._id}`} role="button" aria-expanded="false" aria-controls={`id${comment._id}`}>
                                            Edit
                                        </a>
                                    </li> */}
                                </ul>

                                {/* edit form outside dropdown */}
                                {/* <div className="collapse" id={`id${comment._id}`}>
                                        <form className="comment-form" onSubmit={() => handleEditSubmit(comment._id)}>
                                            <span className="input-group-text">Edit</span>
                                            <textarea name="comment" className="form-control" aria-label="With textarea" onChange={(e) => handleEditInput(e.target)}></textarea>
                                            <button type="button submit" className="btn btn-primary">Submit</button>
                                            <span style={{color: 'red', display: err == true ? 'contents' : 'none'}}>jwt invalid: please login</span>
                                        </form>
                                </div> */}
                            </div>

                        </div>
                )
            })}
            </div>
        </div>
        </>
    )
}

    //editing comments
    // const [editInput, setEditInput] = useState({
    //     comment: ""
    // })

    // const handleEditInput = async(e) => {
    //     const { name, value } = e
    //     setEditInput((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }))
    // }

    // const handleEditSubmit = async(id) => {
    //     const token = localStorage.getItem("site")

    //     try {
    //         const res = await fetch("http://localhost:3000/api/comments/" + id, {
    //             mode: 'cors',
    //             method: 'PATCH',
    //             body: JSON.stringify(editInput),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'authorization': "bearer " + token,
    //             },
    //         })
    //         if (res.status == 403) {
    //             setErr(true)
    //         }
    //     } catch (err) {}
    //     // window.location.reload() //currently works, just doesnt display new comment
    //     navigate("/")
    // }