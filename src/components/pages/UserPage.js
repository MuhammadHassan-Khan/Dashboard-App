import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <Link
        to="/adduser"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add User
      </Link>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="border-b border-gray-300 py-2">
              <h3 className="text-lg font-bold">{user.username}</h3>
              <p>{user.email}</p>
              <span className="text-gray-500 text-sm">
                {new Date(user.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p>No users yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
