import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to College Connect
      </h1>
      <p className="text-gray-600 mb-8">
        Join clubs, explore events, and connect with your college community.
      </p>
      <Link
        href="/login"
        className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
      >
        Go to Login
      </Link>
    </main>
  );
}
