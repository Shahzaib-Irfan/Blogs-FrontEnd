import { useState, useEffect, React } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null); // Change the initial state to null

  useEffect(() => {
    fetchBlogs();
  }, []);

  const { id } = useParams();
  useEffect(() => {
    const foundBlog = blogs.find((blog_temp) => blog_temp.Id.toString() === id);
    setBlog(foundBlog);
  }, [blogs, id]);

  const fetchBlogs = async () => {
    const response = await fetch(
      "https://private-ultra-yumberry.glitch.me/getBlogs"
    );
    const data = await response.json();
    setBlogs(data);
  };

  if (blog) {
    return (
      <>
        <div>
          <center>
            <h2 style={{ textTransform: "capitalize" }}>
              {"Blog # " + blog.Id}
            </h2>
          </center>
          <CenteredContainer>
            <LeftContainer>
              <div
                className="left"
                style={{ marginTop: "10px" }}
                dangerouslySetInnerHTML={{ __html: blog.Content }}
              />
            </LeftContainer>
            <RightContainer>
              <div className="right">
                <img
                  src={`https://private-ultra-yumberry.glitch.me/images/${blog.Image}`}
                  alt={blog.Id}
                />
              </div>
            </RightContainer>
          </CenteredContainer>
        </div>
      </>
    );
  } else {
    return (
      <CenteredContainer>
        <h2>No Blog Found...</h2>
      </CenteredContainer>
    );
  }
};

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LeftContainer = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const RightContainer = styled.div`
  flex: 1;

  .right img {
    width: 50%;
    height: 20%;
  }
`;

export default Blog;
