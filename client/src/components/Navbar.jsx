import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <div>
        <Link href="/gallery">Gallery</Link>
        <Link href="/upload" className="ml-4">
          Upload
        </Link>
        <Link href="/profile" className="ml-4">
          Profile
        </Link>
      </div>
      <div>
        <Link href="/auth/sign-in">Sign In</Link>
      </div>
    </nav>
  );
}
