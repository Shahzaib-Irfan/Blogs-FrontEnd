import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogForm = ({ onSave }) => {
  const [content, setContent] = useState("");

  const handleSave = () => {
    onSave({ content });
    setContent("");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "align",
    "color",
    "background",
    "link",
    "image",
  ];

  const handleSubmit = async (event) => {
    handleSave();
    event.preventDefault();
    const formData = new FormData();
    console.log(event.target.blogImage.files[0]);
    formData.append("content", content);
    formData.append("blogImage", event.target.blogImage.files[0]);
    console.log("Form data:", event.target.blogImage.files[0]);

    try {
      const response = await fetch(
        `https://decorous-candy-rooster.glitch.me/Add?content=${content}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <center>
        <form
          action={`https://decorous-candy-rooster.glitch.me/Add?content=${content}`}
          method="post"
          encType="multipart/form-data"
        >
          <ReactQuill
            style={{ width: "80%", height: "auto" }}
            modules={modules}
            formats={formats}
            theme="snow"
            value={content}
            onChange={setContent}
          />
          <input type="file" name="blogImage" />
          <button
            style={{
              marginTop: "20px",
              borderRadius: "5px",
              backgroundColor: "silver",
            }}
          >
            Save Blog
          </button>
        </form>
      </center>
    </div>
  );
};

export default BlogForm;
