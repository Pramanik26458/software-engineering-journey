import UserLayout from "@/layout/userLayout/UserLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

function LoginComponent() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();

  const [isLoginMethod, setIsLoginMethod] = useState(false);

  useEffect(() => {
    if (authState?.loggedIn) {
      router.push("/dashboard");
    }
  }, [authState?.loggedIn, router]);


  const handleRegister=()=>{

  }
  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          
          {/* LEFT SECTION */}
          <div className={styles.cardContainer__left}>
            
            <p className={styles.cardleft_heading}>
              {isLoginMethod ? "Sign In" : "Sign Up"}
            </p>

            <div className={styles.inputContainers}>

              {!isLoginMethod && (
                <div className={styles.inputRow}>
                  <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Username"
                  />

                  <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Name"
                  />
                </div>
              )}

              <input
                className={styles.inputField}
                type="email"
                placeholder="Email"
              />

              <input
                className={styles.inputField}
                type="password"
                placeholder="Password"
              />

              {isLoginMethod && (
                <p className={styles.forgotPassword}>
                  Forgot Password?
                </p>
              )}

              <button className={styles.authButton}>
                {isLoginMethod ? "Sign In" : "Sign Up"}
              </button>

              <p className={styles.switchText}>
                {isLoginMethod
                  ? "Don't have an account?"
                  : "Already have an account?"}

                <span
                  className={styles.switchButton}
                  onClick={() =>
                    setIsLoginMethod(!isLoginMethod)
                  }
                >
                  {isLoginMethod ? " Sign Up" : " Sign In"}
                </span>
              </p>

            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className={styles.cardContainer__right}>
            <img
              src="/images/auth.png"
              alt="Social Illustration"
              className={styles.loginImage}
            />
          </div>

        </div>
      </div>
    </UserLayout>
  );
}

export default LoginComponent;