import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import Navbar from "./components/Navbar";

const App = () => {
  const handleSaveBlog = (blog) => {
    blog = { title: "blog # " + blog.length, content: blog };
    localStorage.setItem("blogs", JSON.stringify({}));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogForm onSave={handleSaveBlog} />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </Router>
  );
};

export default App;
