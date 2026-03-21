import React from "react";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">

      {/* 🔥 Heading */}
      <h1 className="text-3xl font-semibold mb-6">
        Product Page
      </h1>

      {/* 🔗 Links */}
      <div className="flex gap-6">

        <Link
          to="/Product/Men"
          className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
        >
          Men's Collection
        </Link>

        <Link
          to="/Product/Women"
          className="px-6 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition"
        >
          Women's Collection
        </Link>

      </div>

    </div>
  );
};

export default Product;