"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HomeIcon,
  UserGroupIcon,
  PresentationChartBarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: HomeIcon,
  },
  {
    label: "Data Siswa",
    icon: UserGroupIcon,
    submenu: [
      { label: "Daftar Siswa", href: "/admin/data-siswa" },
      { label: "Tambah Siswa", href: "/admin/data-siswa/tambah-siswa" },
      { label: "Input Data", href: "/admin/data-siswa/input-data" },
      { label: "Import Data", href: "/admin/data-siswa/import-data" },
    ],
  },
  {
    label: "Hasil Prediksi",
    icon: PresentationChartBarIcon,
    submenu: [
      {
        label: "Daftar Prediksi",
        href: "/admin/hasil-prediksi/daftar-prediksi",
      },
      { label: "Cetak Hasil", href: "/admin/hasil-prediksi/cetak-hasil" },
    ],
  },
  {
    label: "Statistik",
    href: "/admin/statistik",
    icon: ChartBarIcon,
  },
  {
    label: "Pengaturan",
    icon: Cog6ToothIcon,
    submenu: [
      { label: "Umum", href: "/admin/pengaturan/umum" },
      { label: "Model Prediksi", href: "/admin/pengaturan/model-prediksi" },
      { label: "Database", href: "/admin/pengaturan/database" },
      { label: "Keamanan", href: "/admin/pengaturan/keamanan" },
      { label: "Pengguna", href: "/admin/pengaturan/pengguna" },
    ],
  },
];

export default function AdminNavbar({ isOpen, toggleSidebar }) {
  // State untuk submenu yang terbuka (key: label menu utama)
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col transition-width duration-300 ease-in-out
      ${isOpen ? "w-64" : "w-16"}`}
      style={{ zIndex: 1300 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <svg
            className="h-7 w-7 text-blue-600 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 14l4-4 4 4"
            />
          </svg>
          {isOpen && (
            <h1 className="text-lg font-bold text-gray-900 select-none truncate">
              PIP Decision
            </h1>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {isOpen ? (
            <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
          ) : (
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto mt-4">
        <ul className="space-y-1 px-1">
          {menuItems.map(({ label, href, icon: Icon, submenu }) => (
            <li key={label} className="relative">
              {/* Jika ada submenu */}
              {submenu ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(label)}
                    className={`flex items-center justify-between w-full gap-3 px-4 py-3 rounded-md
                      text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors
                      select-none truncate
                      ${isOpen ? "text-left" : "justify-center"}`}
                    aria-expanded={!!openSubmenus[label]}
                    aria-controls={`${label}-submenu`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 flex-shrink-0" />
                      {isOpen && <span className="font-medium">{label}</span>}
                    </div>
                    {isOpen && (
                      <>
                        {openSubmenus[label] ? (
                          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </>
                    )}
                  </button>

                  {/* Submenu */}
                  {openSubmenus[label] && isOpen && (
                    <ul
                      id={`${label}-submenu`}
                      className="ml-10 mt-1 space-y-1 border-l border-gray-300"
                    >
                      {submenu.map(({ label: subLabel, href: subHref }) => (
                        <li key={subHref}>
                          <Link
                            href={subHref}
                            className="block px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors select-none truncate"
                          >
                            {subLabel}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Menu tanpa submenu
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md
                    text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors
                    select-none truncate
                    ${isOpen ? "justify-start" : "justify-center"}`}
                  title={label}
                >
                  <Icon className="h-6 w-6 flex-shrink-0" />
                  {isOpen && <span className="font-medium">{label}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="border-t border-gray-200 p-4">
        <Link
          href="/login"
          className={`flex items-center gap-3 px-4 py-3 rounded-md
            text-red-600 hover:bg-red-50 transition-colors select-none truncate`}
          title="Keluar"
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6 flex-shrink-0" />
          {isOpen && <span className="font-medium">Keluar</span>}
        </Link>
      </div>
    </aside>
  );
}
