import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await fetch(
      "https://private-ultra-yumberry.glitch.me/getBlogs"
    );
    const data = await response.json();
    setBlogs(data);
  };

  if (blogs.length === 0) {
    return (
      <Centered>
        <h1>No Blogs Found...</h1>
      </Centered>
    );
  } else {
    return (
      <SectionContainer>
        <div>
          <Centered>
            <h2>Blogs</h2>
          </Centered>
          <BlogContainer>
            {blogs.map((blog) => (
              <BlogBox key={blog.Id}>
                <BlogImage
                  src={`https://private-ultra-yumberry.glitch.me/images/${blog.Image}`}
                  alt={blog.Id}
                />
                <Link style={{ textTransform: "none" }} to={`/blog/${blog.Id}`}>
                  <BlogTitle>{"Blog #" + blog.Id}</BlogTitle>
                </Link>
              </BlogBox>
            ))}
          </BlogContainer>
        </div>
      </SectionContainer>
    );
  }
};

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlogContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const BlogBox = styled.div`
  width: 40%;
  margin: 6px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const BlogImage = styled.img`
  height: 70%;
  width: 100%;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
`;

const BlogTitle = styled.h3`
  margin: 10px 0;
`;

export default BlogList;
