import { PostPreview } from "../components/PostPreview"
import { usePosts } from "../context/PostsProvider"

export function Home() {
    const p = usePosts();
    const posts = p.allPosts();

    return (
        <div className="home-container">
            <div className="posts-container">
                {posts.map((post) => (
                    <PostPreview key={post._id} data={post} />
                ))}
            </div>
        </div>    
    )
}