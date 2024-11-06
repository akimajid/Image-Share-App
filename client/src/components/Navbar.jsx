import Link from "next/link";

export default function Navbar() {
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
            href="/profile"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            Profile
          </Link>
        </div>

        {/* Right Side: Auth Links */}
        <div>
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-white text-blue-500 font-semibold rounded-md hover:bg-gray-100 transition-colors duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
