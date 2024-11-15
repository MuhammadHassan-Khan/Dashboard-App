import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase"; 
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton"; 

const AddCommentPage = () => {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (username && comment) {
      try {
        await addDoc(collection(db, "comments"), {
          username,
          comment,
          createdAt: new Date().toISOString(),
        });
        setUsername("");
        setComment("");
        navigate("/comments");
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
    }
  };

  return (
    <div className="p-4">
      <BackButton></BackButton>
      <h2 className="text-xl font-semibold mb-4">Add a New Comment</h2>
      <form
        onSubmit={handleAddComment}
        className="bg-gray-100 p-4 rounded mt-4 shadow-md max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your comment"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCommentPage;
