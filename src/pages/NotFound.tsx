import { Link } from "react-router-dom";
import { ImageIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-10 bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800 px-6 text-center">
      <div className="mb-6 animate-pulse">
        <ImageIcon className="w-20 h-20 text-gray-500" />
      </div>

      <h1 className="text-5xl font-mainBold mb-4">404 - გვერდი ვერ მოიძებნა</h1>
      <p className="text-lg mb-6 font-mainRegular">
        უი! გვერდი, რომელსაც ეძებდით, ვერ მოიძებნა. სცადეთ დაბრუნება გალერეაში.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-მდ transition duration-300"
      >
        დაბრუნდი მთავარ გვერძე
      </Link>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-40 h-28 bg-gray-400 rounded-lg shadow-inner animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
