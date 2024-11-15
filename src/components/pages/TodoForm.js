import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton"; 

const AddTodo = () => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (task && dueDate) {
      try {
        await addDoc(collection(db, "todos"), {
          task,
          dueDate,
          createdAt: new Date().toISOString(),
        });
        setTask("");
        setDueDate("");
        navigate("/todo");
      } catch (error) {
        console.error("Error adding todo: ", error);
      }
    }
  };

  return (
    <div className="p-4">
      <BackButton></BackButton>
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form
        onSubmit={handleAddTodo}
        className="bg-gray-100 p-4 rounded mt-4 shadow-md max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Task
          </label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default AddTodo;
