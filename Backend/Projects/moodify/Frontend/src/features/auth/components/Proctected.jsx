import React from "react";

import { Navigate }
from "react-router-dom";

import { useAuth }
from "../hooks/useAuth";

const Proctected = ({
  children,
}) => {
  const {
    user,
    loading,
  } = useAuth();

  // ================= LOADING =================

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // ================= NOT LOGGED IN =================

  if (!user) {
    return (
      <Navigate to="/login" />
    );
  }

  // ================= LOGGED IN =================

  return children;
};

export default Proctected;