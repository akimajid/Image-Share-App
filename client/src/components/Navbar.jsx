"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token") !== null);

    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("token") !== null);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: App Title */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold tracking-wide">Image Share</h1>
        </div>

        {/* Center Links */}
        <div className="flex space-x-6">
          <Link
            href="/gallery"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            Gallery
          </Link>
          <Link
            href="/upload"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            Upload
          </Link>
          <Link
            href="/images"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            Images
          </Link>
        </div>

        {/* Right Side: Auth Links */}
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-blue-500 font-semibold rounded-md hover:bg-gray-100 transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-white text-blue-500 font-semibold rounded-md hover:bg-gray-100 transition-colors duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
