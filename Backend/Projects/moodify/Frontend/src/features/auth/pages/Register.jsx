import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import FormGroup from "../components/FormGroup";

import "../style/register.scss";

import { useAuth }
from "../hooks/useAuth";

const Register = () => {
  const [username,
    setUsername,
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword,
  ] = useState("");

  const [confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const navigate =
    useNavigate();

  const {
    loading,
    handleRegister,
  } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      password !==
      confirmPassword
    ) {
      return alert(
        "Passwords do not match"
      );
    }

    const success =
      await handleRegister({
        username,
        email,
        password,
      });

    if (success) {
      navigate("/login");
    }
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Create Account</h1>

        <p className="subtitle">
          Join Moodify and
          explore your musical
          vibe
        </p>

        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          <FormGroup
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <FormGroup
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <FormGroup
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <button
            className="button"
            type="submit"
            disabled={loading}
          >
            {
              loading
                ? "Registering..."
                : "Register"
            }
          </button>
        </form>

        <p className="bottom-text">
          Already have an
          account?

          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;