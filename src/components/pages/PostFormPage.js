import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton"; 

const PostFormPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleAddPost = async (e) => {
        e.preventDefault();
        if (title && content) {
            try {
                await addDoc(collection(db, "posts"), {
                    title,
                    content,
                    createdAt: new Date().toISOString(),
                });
                navigate('/post'); // Navigate back to Post List
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    };

    return (
        <form onSubmit={handleAddPost} className="bg-gray-100 p-4 rounded mt-4 shadow-md max-w-md">
            <BackButton></BackButton>
            <h2 className="text-xl font-semibold mb-4">Add New Post</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter title"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter content"
                ></textarea>
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Submit
            </button>
        </form>
    );
};

export default PostFormPage;
