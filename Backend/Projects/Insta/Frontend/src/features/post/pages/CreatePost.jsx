// import React from 'react'
import "../style/createpost.scss";
import { useState, useRef } from "react";
import { usePost } from "../hook/usePost";
import { useNavigate } from "react-router-dom";

  const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef(null);
  const navigate = useNavigate();
  const { loading, handleCreatePost } = usePost();

  async function handleSubmit(e) {
    e.preventDefault();

    const file = postImageInputFieldRef.current.files[0];

    await handleCreatePost(file, caption);

    navigate("/");
  }

  if (loading) {
    return (
      <main>
        <h1>Creating post...</h1>
      </main>
    );
  }
  return (
    <main className="createPost">
      <div className="form-Container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label className="post-image-label" htmlFor="postImage">
            Select image to upload
          </label>
          <input
            ref={postImageInputFieldRef}
            hidden
            type="file"
            name="post-image"
            id="postImage"
          />
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            name="caption"
            placeholder="Enter caption"
            id="caption"
          />
          <button className="button primary-button">Post</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
