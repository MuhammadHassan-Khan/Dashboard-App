import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; 
import { useNavigate } from "react-router-dom";

const CommentListPage = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const fetchComments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "comments"));
      const commentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments: ", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <button
        onClick={() => navigate("/comments/add")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add Comment
      </button>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-300 py-2">
            <h3 className="text-lg font-bold">{comment.username}</h3>
            <p>{comment.comment}</p>
            <span className="text-gray-500 text-sm">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentListPage;
