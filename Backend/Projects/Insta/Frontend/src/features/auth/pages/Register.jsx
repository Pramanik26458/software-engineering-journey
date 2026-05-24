import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {

  const { user, loading, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const res = await handleRegister(
        username,
        email,
        password
      );

      console.log(res);

      // clear input fields
      setEmail("");
      setUsername("");
      setPassword("");

      // redirect
      navigate("/login");

    } catch (err) {

      console.log(err);
    }
  }

  return (
    <main>

      <div className="form-Container">

        <h1>Register</h1>

        {loading && <h3>Creating account...</h3>}

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
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            type="email"
            name="email"
            placeholder="Enter email"
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
            {loading
              ? "Creating..."
              : "Register"}
          </button>

        </form>

        <p>
          Already have an account?{" "}

          <Link
            className="toggleAuthForm"
            to="/login"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  );
};

export default Register;