import React from "react";
import style from "./style.module.css";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  return (
    <div className={style.container}>
      <nav className={style.navBar}>
        <h1 style={{cursor:"pointer"}} onClick={() => router.push("/")}>Pro Connect</h1>

        <div className={style.navBarOptionContainer}>
          <div
            onClick={() => router.push("/login")}
            className={style.buttonJoin}
          >
            <p>Be a part</p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
