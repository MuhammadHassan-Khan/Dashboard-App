import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const todosData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTodos(todosData);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-4">
      <Link
        to="/add"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Task
      </Link>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Todos</h2>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo.id} className="border-b border-gray-300 py-2">
              <h3 className="text-lg font-bold">{todo.task}</h3>
              <p>Due: {todo.dueDate}</p>
              <span className="text-gray-500 text-sm">
                {new Date(todo.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p>No tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
