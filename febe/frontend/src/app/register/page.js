"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    schoolname: "",
    schooltype: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validasi manual
    if (!formData.email || !formData.schoolname || !formData.schooltype || !formData.password || !formData.confirmPassword) {
      return setError("Semua field wajib diisi.");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Password dan konfirmasi password tidak cocok.");
    }

    if (!formData.terms) {
      return setError("Anda harus menyetujui Syarat dan Ketentuan.");
    }

    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || 'Unknown error');
      }
      setSuccess(json.message);
      
      // Reset form
      setFormData({
        email: "",
        schoolname: "",
        schooltype: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });
      router.push('/login');
      setLoading(false);
      console.log('Register sukses:', json);
    } catch (err) {
      console.error('Register gagal:', err.message);
      setError(err.message);
      setLoading(false);
    }
  };

  (loading && <Loading />);
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm p-8 border border-gray-200 rounded-lg shadow-sm text-center">
          <h1 className="text-xl font-bold mt-2 text-blue-600">🎓 SPK PIP</h1>
          <h2 className="text-lg font-bold mb-1">Buat Akun Baru</h2>
          <p className="text-gray-600 mb-6 text-sm">Daftar untuk mengakses sistem pendukung keputusan PIP</p>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

          <form className="space-y-5 text-left" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="nama@sekolah.ac.id"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label htmlFor="schoolname" className="block mb-1 text-sm font-medium text-gray-700">
                Nama Sekolah
              </label>
              <input
                type="text"
                id="schoolname"
                name="schoolname"
                value={formData.schoolname}
                onChange={handleChange}
                required
                placeholder="Nama sekolah Anda"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label htmlFor="schooltype" className="block mb-1 text-sm font-medium text-gray-700">
                Jenis Sekolah
              </label>
              <select
                id="schooltype"
                name="schooltype"
                value={formData.schooltype}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="" disabled>Pilih jenis sekolah</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="SMK">SMK</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-gray-700 select-none">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              Saya menyetujui{" "}
              <a href="#" className="text-blue-600 hover:underline ml-1">
                Syarat dan Ketentuan
              </a>
            </label>

            <button
              type="submit"
              className="w-full py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
            >
              Daftar
            </button>
          </form>

          <p className="text-gray-600 text-sm mt-6">
            Sudah memiliki akun?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-semibold">
              Masuk
            </Link>
          </p>

          <p className="text-gray-500 text-sm mt-3">
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
