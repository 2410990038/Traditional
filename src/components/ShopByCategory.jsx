import { useState } from "react";


const products = {
  women: [
    { name: "Silk Saree", price: "₹2,499", rating: 4.5, desc: "Elegant ethnic silk saree", image: "https://ultralytics.net/images/bus.jpg" },
    { name: "Lehenga Set", price: "₹4,999", rating: 4.8, desc: "Traditional bridal lehenga", image: "https://via.placeholder.com/200x200?text=Lehenga+Set" },
    { name: "Kurti", price: "₹1,199", rating: 4.3, desc: "Comfortable cotton kurti", image: "https://via.placeholder.com/200x200?text=Kurti" },
  ],
  men: [
    { name: "Sherwani", price: "₹3,999", rating: 4.7, desc: "Royal embroidered sherwani", image: "https://via.placeholder.com/200x200?text=Sherwani" },
    { name: "Kurta Pajama", price: "₹1,799", rating: 4.4, desc: "Classic festive wear", image: "https://via.placeholder.com/200x200?text=Kurta+Pajama" },
    { name: "Nehru Jacket", price: "₹1,299", rating: 4.6, desc: "Stylish Nehru jacket", image: "https://via.placeholder.com/200x200?text=Nehru+Jacket" },
  ],
  kids: [
    { name: "Ethnic Set", price: "₹999", rating: 4.5, desc: "Traditional festive outfit", image: "https://via.placeholder.com/200x200?text=Ethnic+Set" },
    { name: "Kurta Set", price: "₹899", rating: 4.2, desc: "Comfortable cotton kurta", image: "https://via.placeholder.com/200x200?text=Kurta+Set" },
    { name: "Frock", price: "₹1,099", rating: 4.7, desc: "Beautiful party frock", image: "https://via.placeholder.com/200x200?text=Frock" },
  ],
};

export default function ShopByCategory() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="px-8 py-16 bg-[#fdfbe8] min-h-screen">
      {/* Category Section */}
      {!selectedCategory && (
        <section id="categories">
          <h2 className="text-4xl font-bold text-center mb-4">Shop by Category</h2>
          <p className="text-center mt-2 text-gray-600">
            Explore our curated collections of traditional attire
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {/* Women's Wear */}
            <div
              onClick={() => setSelectedCategory("women")}
              className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer block"
            >
              <img
                src="https://t3.ftcdn.net/jpg/06/40/14/32/360_F_640143291_kvoc9eiNU3XdZXNR2EkLPj0PW2PcJxpz.jpg"
                alt="Women"
                className="w-full h-64 object-cover opacity-80 transform transition duration-500 group-hover:scale-110"
              />
              <h3 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                Women's Wear
              </h3>
            </div>

            {/* Men's Wear */}
            <div
              onClick={() => setSelectedCategory("men")}
              className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer block"
            >
              <img
                src="https://i.pinimg.com/736x/c4/9c/95/c49c95612836a2d6933f0ba70f8ab64d.jpg"
                alt="Men"
                className="w-full h-64 object-cover opacity-80 transform transition duration-500 group-hover:scale-110"
              />
              <h3 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                Men's Wear
              </h3>
            </div>

            {/* Kids' Collection */}
            <div
              onClick={() => setSelectedCategory("kids")}
              className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer block"
            >
              <img
                src="https://www.shutterstock.com/image-photo/kuala-lumpur-malaysia-october-252019-260nw-1541710190.jpg"
                alt="Kids"
                className="w-full h-64 object-cover opacity-80 transform transition duration-500 group-hover:scale-110"
              />
              <h3 className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                Kids' Collection
              </h3>
            </div>
          </div>
        </section>
      )}

      {/* Product Section */}
      {selectedCategory && (
        <section id="productSection" className="px-8 py-16">
          <h2 className="text-4xl font-bold text-center mb-10">
            {selectedCategory.toUpperCase()} COLLECTION
          </h2>

          <div
            id="productGrid"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {products[selectedCategory].map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="rounded-md w-full h-64 object-contain mb-3"
                />
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="text-gray-600">{p.desc}</p>
                <p className="text-yellow-500 mt-1">⭐ {p.rating}</p>
                <p className="text-green-600 font-semibold">{p.price}</p>
                <button
                  onClick={() => handleAddToCart(p)}
                  className="mt-3 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                >
                  Add to Bag
                </button>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <div className="text-center mt-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
            >
              ← Back to Categories
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
