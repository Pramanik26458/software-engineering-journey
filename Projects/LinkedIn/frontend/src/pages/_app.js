import React from "react";
import { Provider } from "react-redux";
import { store } from "../config/redux/store"; // ✅ Points directly to your single store file!
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}