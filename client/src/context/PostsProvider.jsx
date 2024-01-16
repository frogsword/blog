import { useState, useContext, createContext, useEffect } from "react";

const PostsContext = createContext()

const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    
    const allPosts = () => {
        useEffect(() => {
            const getPosts = async() => {
                try {
                    await fetch('https://frogsword-blog-api.adaptable.app/api/posts', {mode: 'cors'})
                    .then((res) => res.json())
                    .then((res) => setPosts(res))
                    .catch((err) => console.error(err))
                }
                catch (err) {}
            }
            getPosts()
        }, [])
        return posts
    }

    return (
        <PostsContext.Provider value={{ posts, allPosts }}>
            {children}
        </PostsContext.Provider>
    )
}



export default PostsProvider;

export function usePosts() {
    return useContext(PostsContext)
}