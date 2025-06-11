"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Cookies from 'js-cookie';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedEmail = Cookies.get('rememberedEmail');
    const savedPassword = Cookies.get('rememberedPassword');
    
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
    if (savedEmail || savedPassword) setRememberMe(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);
      

      if (!res.ok) {
        throw new Error(data.message || "Gagal login. Coba lagi.");
      }

      // Simpan token
      if (data.token) {
        localStorage.setItem("token", data.token);
        Cookies.set('token', data.token, { expires: 7 });
      }

      // Handle remember me
      if (rememberMe) {
        Cookies.set('rememberedEmail', email, { expires: 30 });
        Cookies.set('rememberedPassword', password, { expires: 30 });
      } else {
        Cookies.remove('rememberedEmail');
        Cookies.remove('rememberedPassword');
      }
       
      router.push("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

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

          {error && (
            <div className="mb-4 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
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