"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
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
import { useRouter } from "next/navigation";

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
      }
    ],
  },
  {
    label: "Pengaturan",
    href: "/admin/pengaturan/umum",
    icon: Cog6ToothIcon,
  },
];

export default function AdminNavbar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // State untuk submenu yang terbuka (key: label menu utama)
  const [openSubmenus, setOpenSubmenus] = useState({});

  const handleLogout = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        Authorization: `Bearer ${token}`,
        method: "POST",
      })

      if (response.ok) {
        localStorage.removeItem("token");
        router.push("/login");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Fungsi cek apakah menu utama atau submenu aktif
  const isActiveMenu = (href, submenu) => {
    if (href && pathname === href) return true;
    if (submenu) {
      return submenu.some((item) => pathname === item.href);
    }
    return false;
  };

  // Fungsi cek apakah submenu item aktif
  const isActiveSubmenuItem = (href) => pathname === href;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col transition-width duration-300 ease-in-out
      ${isOpen ? "w-64" : "w-16"}`}
      style={{ zIndex: 1300 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          {isOpen && (
            <h1 className="text-xl font-bold mt-2 text-blue-600">🎓 SPK PIP</h1>
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
          {menuItems.map(({ label, href, icon: Icon, submenu }) => {
            const menuIsActive = isActiveMenu(href, submenu);
            return (
              <li key={label} className="relative">
                {/* Jika ada submenu */}
                {submenu ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleSubmenu(label)}
                      className={`flex items-center justify-between w-full gap-3 px-4 py-3 rounded-md
                      transition-colors select-none truncate
                      ${
                        isOpen
                          ? "text-left"
                          : "justify-center"
                      } ${
                        menuIsActive
                          ? "bg-blue-100 text-blue-600 font-semibold"
                          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      }`}
                      aria-expanded={!!openSubmenus[label]}
                      aria-controls={`${label}-submenu`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-6 w-6 flex-shrink-0 ${
                            menuIsActive
                              ? "text-blue-600"
                              : "text-gray-600"
                          }`}
                        />
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
                        {submenu.map(({ label: subLabel, href: subHref }) => {
                          const subIsActive = isActiveSubmenuItem(subHref);
                          return (
                            <li key={subHref}>
                              <Link
                                href={subHref}
                                className={`block px-4 py-2 rounded-md transition-colors select-none truncate
                                  ${
                                    subIsActive
                                      ? "bg-blue-100 text-blue-600 font-semibold"
                                      : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                  }`}
                              >
                                {subLabel}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  // Menu tanpa submenu
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md
                    transition-colors select-none truncate
                    ${isOpen ? "justify-start" : "justify-center"}
                    ${
                      menuIsActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                    title={label}
                  >
                    <Icon
                      className={`h-6 w-6 flex-shrink-0 ${
                        menuIsActive ? "text-blue-600" : "text-gray-600"
                      }`}
                    />
                    {isOpen && <span className="font-medium">{label}</span>}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="border-t border-gray-200 p-4">
        <Link 
          href="/login" // atau path yang sesuai
          className={`flex items-center gap-3 px-4 py-3 rounded-md text-red-600 hover:bg-red-50 transition-colors select-none truncate`}
          title="Keluar"
        >
          <span onClick={handleLogout}>
            {/* Konten di sini */}
            {isOpen && <span className="font-medium">Keluar</span>}
          </span>
        </Link>
      </div>
    </aside>
  );
}
