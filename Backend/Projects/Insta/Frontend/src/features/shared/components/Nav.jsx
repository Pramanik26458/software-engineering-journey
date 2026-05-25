import React from "react";
import "../nav.scss";
import { useNavigate } from "react-router-dom";

const Nav = () => {

  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/create-post");
  }

  return (
    <nav className="navbar">

      <h1>Insta</h1>

      <button
        className="button primary-button"
        onClick={handleNavigate}
      >
        Post
      </button>

    </nav>
  );
};

export default Nav;