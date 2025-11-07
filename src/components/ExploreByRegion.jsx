import React, { useState } from "react";

const ExploreByRegion = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  // All regional outfits
  const regionData = {
    Rajasthan: [
      {
        name: "Bandhani Saree",
        desc: "Traditional tie-dye saree from Rajasthan",
        price: "₹2,499",
        image:
          "https://mykaajaipur.com/cdn/shop/files/6-Xh14iris.jpg?v=1723561776",
      },
      {
        name: "Leheriya Dupatta",
        desc: "Vibrant leheriya printed dupatta",
        price: "₹1,199",
        image:
          "https://jhakhas.com/cdn/shop/collections/Chiffon_Multicolor_e441abe0-b2fb-4a7e-baa1-36d0840dbe4e.jpg?v=1628246294&width=2048",
      },
      {
        name: "Rajasthani Poshak",
        desc: "Traditional Rajasthani attire with mirror work",
        price: "₹1,199",
        image:
          "https://villagerstrend.com/public/uploads/all/7e4I5kqnh4bpTJbnfP8oCqoIwIFoeQbDlPxPtgu9.jpg",
      },
    ],
    Punjab: [
      {
        name: "Phulkari Dupatta",
        desc: "Colorful hand-embroidered dupatta",
        price: "₹1,499",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzHFBLELdx6uu3x2hyiZ6BYouo6yTvaHpIDA&s",
      },
      {
        name: "Patiala Suit",
        desc: "Classic Punjabi patiala salwar suit",
        price: "₹1,899",
        image:
          "https://www.lavanyathelabel.com/cdn/shop/files/01_lbl101ks461_10.jpg?v=1755064960",
      },
      {
        name: "Kurta Pajama",
        desc: "Classic Punjabi Kurta Pajama",
        price: "₹1,899",
        image:
          "https://www.theamritsaristore.com/cdn/shop/files/Gemini_Generated_Image_45x7lz45x7lz45x7.png?v=1756460210&width=1445",
      },
    ],
    Gujarat: [
      {
        name: "Ghagra Choli",
        desc: "Traditional garba outfit with mirror work",
        price: "₹3,299",
        image:
          "https://anayadesignerstudio.com/cdn/shop/files/chaniya-choli-for-navratri-online-1.webp?v=1714629370",
      },
      {
        name: "Mirror Work Dupatta",
        desc: "Handcrafted dupatta with mirror embroidery",
        price: "₹999",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU16yZiTgDKmjvW5lsCEIysyJ-5-4y-9VWVw&s",
      },
      {
        name: "Kediyu",
        desc: "Embroided traditional kediyu for men",
        price: "₹999",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCcrZDsaLaLlvHr_k1TJhhxzwqLWkntIRXdw&s",
      },
    ],
    Bengal: [
      {
        name: "Red & White Saree",
        desc: "Iconic Bengali saree for festivals",
        price: "₹2,199",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4hY72GRHVXUtaJSD9UQKxMK8JDK-D-AO_FQ&s",
      },
      {
        name: "Cotton Tant Saree",
        desc: "Lightweight cotton saree from Bengal",
        price: "₹1,499",
        image:
          "https://m.media-amazon.com/images/I/91iQLltF8qL._AC_UY1100_.jpg",
      },
      {
        name: "Dhoti-Kurta Set",
        desc: "Traditional Bengali dhoti kurta",
        price: "₹1,499",
        image:
          "https://cfw51.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibXltYW5kYXAuaW4iLCJ2IjozNTA3MDAwMTg5LCJyIjoxLCJpIjoiMWE5YWE0YzAtMTVlYy00MTZiLWM2N2QtZGQyNTI3NDkzNTAwIn0/wp-content/uploads/2023/06/Vibrant-Color-Bengali-Dhoti-Kurta-for-Wedding.jpg",
      },
    ],
  };

  // Thumbnail list
  const regions = [
    {
      title: "Rajasthan",
      image:
        "https://rajasthancab.b-cdn.net/uploads/blog/1744694612-blog-image.webp",
    },
    {
      title: "Punjab",
      image:
        "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2021/11/12124443/Punjab.jpg",
    },
    {
      title: "Gujarat",
      image:
        "https://s7ap1.scene7.com/is/image/incredibleindia/bhadreshwar-jain-temple-kutch-gujarat-1-city-hero?qlt=82&ts=1726734632413",
    },
    {
      title: "Bengal",
      image:
        "https://www.constructionworld.in/assets/uploads/b2863bce851469df2bf4fa4abcf10fe6.jpg",
    },
  ];

  return (
    <section className="pb-20 pt-10 bg-[#fffde8] border-t-4 border-orange-300">
      {/* If no region selected → show grid */}
      {!selectedRegion && (
        <>
          <h2 className="text-4xl font-bold text-center text-[#1a1a1a]">
            Explore by Region
          </h2>
          <p className="text-center text-gray-600 mt-2 mb-10">
            Discover traditional attire from different parts of India
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {regions.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedRegion(item.title)}
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
        </>
      )}

      {/* When region selected → show its products */}
      {selectedRegion && (
        <div className="px-8 py-10">
          <h2 className="text-4xl font-bold text-center mb-10">
            {selectedRegion} Collection
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {regionData[selectedRegion]?.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="rounded-md w-full h-64 object-cover mb-3"
                />
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="text-gray-600">{p.desc}</p>
                <p className="text-green-600 font-semibold mt-1">{p.price}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setSelectedRegion(null)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
            >
              ← Back to Regions
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExploreByRegion;
