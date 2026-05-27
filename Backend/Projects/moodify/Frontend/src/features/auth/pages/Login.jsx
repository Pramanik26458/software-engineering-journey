import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import FormGroup from "../components/FormGroup";

import "../style/login.scss";

import { useAuth }
from "../hooks/useAuth";

const Login = () => {
  const {
    loading,
    handleLogin,
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword,
  ] = useState("");

  const navigate =
    useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const success =
      await handleLogin({
        email,
        password,
      });

    if (success) {
      navigate("/");
    }
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Welcome Back</h1>

        <p className="subtitle">
          Login to continue your
          Moodify journey
        </p>

        <form onSubmit={handleSubmit}>
          <FormGroup
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <FormGroup
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <button
            className="button"
            type="submit"
            disabled={loading}
          >
            {
              loading
                ? "Logging in..."
                : "Login"
            }
          </button>
        </form>

        <p className="bottom-text">
          Don&apos;t have an
          account?

          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;