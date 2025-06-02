"use client";

import Link from "next/link";

export default function Footer() {
  const links = [
    { label: "Beranda", href: "/#hero" },
    { label: "Fitur", href: "/#features" },
    { label: "Tentang", href: "/#about" },
    { label: "Kontak", href: "/#contact" },
    { label: "Masuk", href: "/login" },
    { label: "Daftar", href: "/register" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-lg">SPK PIP</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Sistem Pendukung Keputusan Penerima Bantuan PIP
            <br />
            Berbasis Machine Learning
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wide">Tautan</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {links.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-blue-600 transition-colors duration-200 block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Subscribe */}
        <div id="contact" className="space-y-4">
          <h4 className="text-white font-semibold mb-2 text-sm tracking-wide">Kontak</h4>
          <p className="text-gray-400 text-sm">info@spkpip.ac.id</p>
          <p className="text-gray-400 text-sm">(021) 1234-5678</p>
          <p className="text-gray-400 text-sm">
            Jl. Pendidikan No. 123, Jakarta Pusat, DKI Jakarta 10110
          </p>

          <h4 className="text-white font-semibold mt-6 mb-2 text-sm tracking-wide">Berlangganan</h4>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Fitur berlangganan belum diimplementasi");
            }}
          >
            <input
              type="email"
              placeholder="Email Anda"
              className="flex-grow px-4 py-2 rounded border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors duration-200 whitespace-nowrap"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-gray-500 text-xs select-none">
        © 2025 SPK PIP. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}
