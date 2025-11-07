// import React from "react";

// const ExploreByOccasion = () => {
//   const occasions = [
//     {
//       title: "Weddings",
//       image: "https://i.pinimg.com/736x/b8/02/f9/b802f958bf59381408956906babd6a6e.jpg", // replace with your actual path
//     },
//     {
//       title: "Festivals",
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzKOsWt50CvFs5jxNG9AGU05tIDZ4E7LO14w&s",
//     },
//     {
//       title: "Cultural Events",
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGX5E8WYTRP7tfOLWPxXsVmMqZ4z23F5yVvw&s",
//     },
//   ];

//   return (
//     <section className="pb-20  pt-5 bg-[#fffde8]">
//       <h2 className="text-4xl font-bold text-center text-[#1a1a1a]">
//         Explore by Occasion
//       </h2>
//       <p className="text-center text-gray-600 mt-2 mb-10">
//         Discover attire perfect for every celebration and cultural moment
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {occasions.map((item, index) => (
//           <div
//             key={index}
//             className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group transition-transform transform hover:scale-105"
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-64 object-cover brightness-90 group-hover:brightness-75 transition-all duration-500"
//             />
//             <div className="absolute inset-0 flex items-center justify-center">
//               <h3 className="text-white text-2xl font-semibold drop-shadow-lg">
//                 {item.title}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ExploreByOccasion;

import React, { useState } from "react";

const ExploreByOccasion = () => {
  const [selectedOccasion, setSelectedOccasion] = useState(null);

  const occasions = [
    {
      title: "Weddings",
      image:
        "https://i.pinimg.com/736x/b8/02/f9/b802f958bf59381408956906babd6a6e.jpg",
      products: [
        {
          name: "Bridal Lehenga",
          image:
            "https://www.aishwaryadesignstudio.com/content/images/thumbs/0144879_fascinatingred-designer-bridal-lehenga-choli-for-wedding-and-reception.jpeg",
          price: "₹6,999",
        },
        {
          name: "Sherwani Set",
          image:
            "https://getethnic.com/wp-content/uploads/2021/07/3-White-Sherwani-.jpg",
          price: "₹5,499",
        },
        {
          name: "Designer Saree",
          image:
            "https://i0.wp.com/www.sanskriticuttack.com/wp-content/uploads/2023/07/saree_in_half_saree_style.jpg?ssl=1",
          price: "₹3,999",
        },
      ],
    },
    {
      title: "Festivals",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzKOsWt50CvFs5jxNG9AGU05tIDZ4E7LO14w&s",
      products: [
        {
          name: "Anarkali Dress",
          image:
            "https://subhvastra.in/cdn/shop/files/WhatsAppImage2023-06-02at6.50.09PM_800x.jpg?v=1704453598",
          price: "₹2,999",
        },
        {
          name: "Kurta Pajama Set",
          image:
            "https://i.etsystatic.com/35384727/r/il/971410/6318118054/il_570xN.6318118054_p3xj.jpg",
          price: "₹1,999",
        },
        {
          name: "Embroidered Dupatta",
          image:
            "https://inayakhan.shop/cdn/shop/files/light-blue-silk-pom-pom-phulkari-dupatta-with-exquisite-handwork-embroidery-inayakhan-shop.jpg?v=1718874645",
          price: "₹999",
        },
      ],
    },
    {
      title: "Cultural Events",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGX5E8WYTRP7tfOLWPxXsVmMqZ4z23F5yVvw&s",
      products: [
        {
          name: "Phulkari Dupatta",
          image:
            "https://theamritsarstore.com/cdn/shop/files/hand-embroidered-phulkari-dupattas-online-handmade-dupatta-with-different-design-by-the-amritsar-store-175.webp?v=1759830260",
          price: "₹1,499",
        },
        {
          name: "Punjabi Suit",
          image:
            "https://www.salwari.com/image/cache/product-2025/yellow-embroidered-salwar-suit-107422-308x425.gif",
          price: "₹3,299",
        },
        {
          name: "Traditional Turban",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuU49wJQtjiTe_JhsV8T4GcY429YGW6WvgvQ&s",
          price: "₹1,099",
        },
      ],
    },
  ];

  // When no category selected → show main grid
  if (!selectedOccasion) {
    return (
      <section className="pb-20 pt-5 bg-[#fffde8] border-t-4 border-orange-300">
        <h2 className="text-4xl font-bold text-center text-[#1a1a1a]">
          Explore by Occasion
        </h2>
        <p className="text-center text-gray-600 mt-2 mb-10">
          Discover attire perfect for every celebration and cultural moment
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {occasions.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedOccasion(item)}
              className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group transition-transform transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover brightness-90 group-hover:brightness-75 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // When a category is clicked → show its collection
  return (
    <section className="pb-20 pt-10 bg-[#fffde8] min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10">
        {selectedOccasion.title} Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {selectedOccasion.products.map((product, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-4 transition-transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
            <p className="text-green-600 font-medium">{product.price}</p>
            <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-full">
              Add to Bag
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => setSelectedOccasion(null)}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
        >
          ← Back to Occasions
        </button>
      </div>
    </section>
  );
};

export default ExploreByOccasion;
