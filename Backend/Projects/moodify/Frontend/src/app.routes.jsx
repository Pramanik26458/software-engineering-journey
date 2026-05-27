import { createBrowserRouter } from "react-router-dom";

import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Proctected from "./features/auth/components/Proctected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Proctected>
      <h1>Home</h1>
    </Proctected>
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);