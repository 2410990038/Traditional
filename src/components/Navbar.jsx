// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="flex justify-between items-center px-10 py-5 bg-[#fcf9eb] shadow-sm">
//       <h1 className="text-2xl font-semibold text-gray-800">ReetRiwaaz</h1>
//       <div className="flex gap-4">
//         <Link to="/login" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 ">
//           Log In
//         </Link>
//         <Link
//           to="/Signup"
//           className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
//         >
//           Sign Up
//         </Link>
//       </div>
//     </nav>
//   );
// }

// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="flex justify-between items-center px-10 py-5 bg-[#fcf9eb] shadow-sm">
//       <h1 className="text-2xl font-semibold text-gray-800">ReetReewaz</h1>
//       <div className="flex gap-4">
//         <Link to="/login" className="text-gray-700 hover:text-orange-600">
//           Log In
//         </Link>
//         <Link
//           to="/signup"
//           className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
//         >
//           Sign Up
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default function Navbar({ onLoginClick, isLoggedIn }) {
//   return (
//     <nav className="flex justify-between items-center px-10 py-5 bg-[#fcf9eb] shadow-md fixed top-0 left-0 w-full z-20">
//       <h1 className="text-2xl font-semibold text-gray-800">ReetReewaz</h1>
//       <div>
//         {isLoggedIn ? (
//           <span className="text-gray-700 font-medium">Welcome Back!</span>
//         ) : (
//           <button
//             onClick={onLoginClick}
//             className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition"
//           >
//             Log In / Sign Up
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default function Navbar({ onLoginClick, isLoggedIn, onLogout }) {
//   return (
//     <nav className="flex justify-between items-center px-8 md:px-12 py-4 bg-[#fcf9eb] shadow-md fixed top-0 left-0 w-full z-30">
//       <h1 className="text-2xl font-semibold text-gray-800">ReetRiwaaz</h1>

//       <div className="flex items-center gap-4">
//         <button
//           className="text-gray-700 hover:text-orange-600"
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         >
//           Home
//         </button>

//         {isLoggedIn ? (
//           <button
//             onClick={onLogout}
//             className="bg-transparent border border-orange-400 text-orange-600 px-3 py-1 rounded-md"
//           >
//             Log Out
//           </button>
//         ) : (
//           <button
//             onClick={onLoginClick}
//             className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
//           >
//             Log In / Sign Up
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  useUser, 
  UserButton,
  useAuth 
} from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const { isSignedIn, userId, getToken } = useAuth();
  if (isSignedIn ) {
    navigate("/shop");
  }
  return (
    <nav className="flex justify-between items-center px-8 md:px-12 py-4 bg-[#fcf9eb]/90 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-30">
      {/* Logo */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-wide">
        ReetRiwaaz
      </h1>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
        <button
          className="hover:text-orange-600 transition"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Home
        </button>
        <button
          className="hover:text-orange-600 transition"
          onClick={() => alert("Categories section coming soon!")}
        >
          Categories
        </button>
        <button
          className="hover:text-orange-600 transition"
          onClick={() => alert("Occasions section coming soon!")}
        >
          Occasions
        </button>
        <button
          className="hover:text-orange-600 transition"
          onClick={() => alert("Regions section coming soon!")}
        >
          Regions
        </button>
      </div>

      {/* Auth Buttons */}
      <div className="relative flex items-center gap-3">
        {/* When signed in */}
        <SignedIn>
          <button
            className="w-10 h-10 rounded-full border-2 border-orange-500 overflow-hidden hover:scale-105 transition"
            onClick={() => setShowProfile(!showProfile)}
          >
            <img
              src={user?.imageUrl}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Profile popup */}
          {showProfile && (
            <div className="absolute right-0 mt-12 w-56 bg-white shadow-lg rounded-lg border border-gray-200 p-4 z-40">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={user?.imageUrl}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {user?.fullName || "User"}
                  </p>
                  <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonBox: "w-full justify-center",
                    userButtonTrigger: "bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition w-full text-center",
                  },
                }}
              />
            </div>
          )}
        </SignedIn>

        {/* When signed out */}
        <SignedOut>
          <SignInButton
            afterSignInUrl="/shop"
            afterSignUpUrl="/shop"
            mode="modal"
            appearance={{
              elements: {
                rootBox:
                  "bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600 transition",
              },
            }}
          />
        </SignedOut>
      </div>
    </nav>
  );
}
