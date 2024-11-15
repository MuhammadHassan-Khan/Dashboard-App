import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; 
import { useNavigate } from "react-router-dom";

const PostListPage = () => {
    const [posts, setPosts] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "posts"));
                const postsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(), 
                }));
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts(); 
    }, []); 

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
           
            <button
                onClick={() => navigate('/post/add')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
            >
                Add Post
            </button>

          
            <div>
                {posts.length === 0 ? (
                    <p>No posts available. Add some!</p>
                ) : (
                    <ul className="space-y-4">
                        {posts.map((post) => (
                            <li
                                key={post.id}
                                className="bg-white p-4 rounded shadow-md border"
                            >
                                <h3 className="text-lg font-semibold">{post.title}</h3>
                                <p className="text-gray-700">{post.content}</p>
                                <span className="text-sm text-gray-500">
                                    Created At: {new Date(post.createdAt).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PostListPage;
