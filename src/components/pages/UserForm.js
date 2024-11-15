import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton"; 

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (username && email) {
      try {
        await addDoc(collection(db, "users"), {
          username,
          email,
          createdAt: new Date().toISOString(),
        });
        setUsername("");
        setEmail("");
        navigate("/user");
      } catch (error) {
        console.error("Error adding user: ", error);
      }
    }
  };

  return (
    <div className="p-4">
        <BackButton />
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <form
        onSubmit={handleAddUser}
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
            placeholder="Enter username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
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

export default AddUser;
