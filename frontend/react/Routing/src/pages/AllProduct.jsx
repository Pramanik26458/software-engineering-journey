import React, { useState } from "react";

const categories = ["All", "Men", "Women", "Kids", "Boys", "Girls"];
const productsData = [
  {
    id: 1,
    name: "Men T-Shirt",
    category: "Men",
    price: "₹499",
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
  },
  {
    id: 2,
    name: "Women Dress",
    category: "Women",
    price: "₹999",
    img: "https://images.unsplash.com/photo-1520974735194-0c9e3c4d1d9c",
  },
  {
    id: 3,
    name: "Kids Wear",
    category: "Kids",
    price: "₹299",
    img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30",
  },
  {
    id: 4,
    name: "Boys Hoodie",
    category: "Boys",
    price: "₹699",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
  },
  {
    id: 5,
    name: "Girls Top",
    category: "Girls",
    price: "₹399",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  },
  {
    id: 6,
    name: "Men Sneakers",
    category: "Men",
    price: "₹1499",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 7,
    name: "Women Handbag",
    category: "Women",
    price: "₹1299",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
  },
  {
    id: 8,
    name: "Kids Shoes",
    category: "Kids",
    price: "₹599",
    img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
  },
];
const AllProduct = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      {/* 🔥 Title */}
      <h1 className="text-3xl font-bold mb-6 text-center tracking-wide">
        Explore Products ✨
      </h1>

      {/* 🧭 Categories */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === cat
                ? "bg-purple-600 shadow-lg scale-105"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🛍️ Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
          >
            <img
              src={`${product.img}?auto=format&fit=crop&w=500&q=80`}
              alt={product.name}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200?text=Product";
              }}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-400">{product.category}</p>
              <p className="text-purple-400 font-bold mt-2">{product.price}</p>

              <button className="mt-3 w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg transition">
                Add to Cart 🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
