import React from "react";
import ReduxProvider, { store } from "../config/Index"; // 👈 We import the 'store' directly from your config file here!
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}> 
      <Component {...pageProps} />
    </ReduxProvider>
  );
}