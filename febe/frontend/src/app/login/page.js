"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      router.push("/admin");
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm p-8 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-xl font-bold mt-2 text-blue-600">🎓 SPK PIP</h1>
          </div>

          <h2 className="text-lg font-bold mb-1 text-center">Masuk ke Akun Anda</h2>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Masukkan email dan password untuk mengakses sistem
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="nama@sekolah.ac.id"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                Password
                <Link href="#" className="absolute right-0 top-0 text-blue-600 text-xs hover:underline">
                  Lupa password?
                </Link>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-700 select-none">
                Ingat saya
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white font-semibold ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              } transition`}
            >
              {loading ? "Loading..." : "Masuk"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Belum memiliki akun?{" "}
            <Link href="/register" className="text-blue-600 hover:underline font-semibold">
              Daftar sekarang
            </Link>
          </p>

          <p className="text-center text-gray-500 text-sm mt-3">
            ←{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Kembali ke Beranda
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
