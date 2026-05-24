import React from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true, // to store the token in cookies
        },
      );

      console.log(res.data);
      
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err.response.data);
    }
  }
  return (
    <main>
      <div className="form-Container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Enter password"
          />

          <button type="submit">Login</button>
        </form>
        <p>
          Don' have an account?{" "}
          <Link className="toggleAuthForm" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
