"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { label: "Beranda", href: "/#hero" },
    { label: "Fitur", href: "/#features" },
    { label: "Tentang", href: "/#about" },
    { label: "Kontak", href: "/#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 md:px-8 h-14 flex items-center justify-between">
      {/* Logo kiri */}
      <div className="flex items-center gap-3">
        <Link href="/#hero" className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#2563eb"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
            <path d="M8 14l4-4 4 4" />
          </svg>
          <span>🎓 SPK PIP</span>
        </Link>
      </div>

      {/* MENU TENGAH */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex gap-10 list-none m-0 p-0">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-gray-700 hover:text-blue-600 transition px-2 py-1 rounded-md"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tombol hamburger (mobile) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#000"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#2563eb"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Menu dan actions mobile */}
      <div
        className={`
          fixed top-14 left-0 right-0 bg-white shadow-md flex flex-col
          md:static md:flex-row md:items-center md:gap-10 md:shadow-none
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          md:translate-x-0 z-40 md:z-auto
          `}
      >
        {/* Menu untuk mobile */}
        <ul className="flex flex-col md:hidden list-none m-0 p-4 gap-4">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 px-4 text-gray-700 hover:text-blue-600 rounded-md transition"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-0 border-t border-gray-200 md:border-none">
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="text-blue-600 border border-blue-600 rounded-md px-5 py-2 text-center font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            onClick={() => setMenuOpen(false)}
            className="bg-blue-600 text-white rounded-md px-5 py-2 text-center font-semibold hover:bg-blue-700 transition"
          >
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}
