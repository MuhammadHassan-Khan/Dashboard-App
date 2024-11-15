import { Layout } from "antd";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PostPage from "../components/pages/PostPage";
import PostFormPage from "../components/pages/PostFormPage";
import Album from "../components/pages/AlbumPage";
import AddCommentPage from "./pages/AddCommentPage";
import CommentListPage from "./pages/CommentListPage";
import AddTodo from "./pages/TodoForm";
import AddUser from "./pages/UserForm";
import TodoList from "../components/pages/TodoPage";
import UserList from "../components/pages/UserPage";

const { Header, Sider, Content } = Layout;

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">

      <Sider
        width={250}
        className="bg-gray-800 text-white flex flex-col items-center py-4"
        breakpoint="lg"
        collapsedWidth="80"
      >
        <div className="h-16 flex items-center justify-center text-xl font-bold">
          Logo
        </div>

        <div className="mt-4 w-full px-2">
          <button
            className="bg-blue-600 text-white text-lg w-full my-2 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/post")}
          >
            Post
          </button>
          <button
            className="bg-blue-600 text-white text-lg w-full my-2 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/comments")}
          >
            Comment
          </button>
          <button
            className="bg-blue-600 text-white text-lg w-full my-2 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/album")}
          >
            Album
          </button>
          <button
            className="bg-blue-600 text-white text-lg w-full my-2 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/todo")}
          >
            Todo
          </button>
          <button
            className="bg-blue-600 text-white text-lg w-full my-2 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/user")}
          >
            User
          </button>
        </div>
      </Sider>

     
      <div className="flex flex-col flex-grow">
  
        <Header className="bg-gray-900 text-white flex items-center justify-between px-6 py-2">
          <div className="text-lg font-bold"> Muhammad Hassan Khan - RollNo: 321162</div>
        </Header>

   
        <Content className="p-6 bg-gray-100 flex-grow">
          <Routes>
            <Route path="/post" element={<PostPage />} />
            <Route path="/post/add" element={<PostFormPage />} />
            <Route path="/comments" element={<CommentListPage />} />
            <Route path="/comments/add" element={<AddCommentPage />} />
            <Route path="/album" element={<Album />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="/add" element={<AddTodo />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/adduser" element={<AddUser />} />
          </Routes>
        </Content>
      </div>
    </div>
  );
}

export default Dashboard;
