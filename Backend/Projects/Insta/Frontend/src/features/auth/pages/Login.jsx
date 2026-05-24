import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {

  const { user, loading, handleLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const res = await handleLogin(
        username,
        password
      );

      console.log(res);

      // clear input fields
      setUsername("");
      setPassword("");

      // redirect after login
      navigate("/");

    } catch (err) {

      console.log(err);
    }
  }

  return (
    <main>
      <div className="form-Container">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <input
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            type="text"
            name="username"
            placeholder="Enter username"
          />

          <input
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            type="password"
            name="password"
            placeholder="Enter password"
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p>
          Don't have an account?{" "}

          <Link
            className="toggleAuthForm"
            to="/register"
          >
            Register
          </Link>
        </p>

      </div>
    </main>
  );
};

export default Login;