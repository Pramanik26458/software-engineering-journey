import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Product from "./pages/Produnct.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Men from "./pages/Men.jsx";
import Women from "./pages/Women.jsx";
import AllProduct from "./pages/AllProduct.jsx";
import RandomSearch from "./pages/RandomSearch.jsx";

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Product/Men" element={<Men />} />
        <Route path="/Product/Women" element={<Women />} />
        <Route path="/Product/:id" element={<AllProduct />} />
        <Route path="/Product/Men/:Menid" element={<RandomSearch />} />

      </Routes>
    </div>
  );
};

export default App;
