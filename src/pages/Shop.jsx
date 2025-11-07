// import React from "react";

// const Shop = () => (
//   <div className="h-screen flex flex-col items-center justify-center bg-[#faf7e6]">
//     <h2 className="text-3xl font-bold mb-4">Shop</h2>
//     <p className="text-gray-700">Explore our latest collection.</p>
//   </div>
// );

// export default Shop;
import ShopByCategory from "../components/ShopbyCategory";
import ExploreByOccasion from "../components/ExploreByOccasion";
import ExploreByRegion from "../components/ExploreByRegion";
export default function Shop() {
  return (
    <div>
      <ShopByCategory />
       {/* New Explore by Occasion Section */}
      <ExploreByOccasion />
         <ExploreByRegion />
    </div>
  );
}
