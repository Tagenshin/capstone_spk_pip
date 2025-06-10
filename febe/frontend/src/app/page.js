"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  ChartBarIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        {/* Hero Section */}
        <section id="hero" className="bg-blue-600 text-white py-16 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <span className="inline-block bg-blue-500 bg-opacity-20 text-white text-sm px-4 py-2 rounded-3xl mb-6">
                Program Indonesia Pintar
              </span>
              <h1 className="text-4xl font-bold mb-4">
                Sistem Pendukung Keputusan Penerima Bantuan PIP
              </h1>
              <p className="text-base mb-6 max-w-lg">
                Solusi cepat dan akurat untuk menyeleksi siswa penerima Program
                Indonesia Pintar menggunakan teknologi Machine Learning.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="/login"
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md text-sm font-semibold"
                >
                  Mulai Sekarang
                </a>
                <a
                  href="#features"
                  className="border border-white text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-white hover:text-blue-600 transition"
                >
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div
              className="flex-1 border-4 border-blue-300 bg-gray-100 bg-cover object-fill rounded-xl 
                          sm:h-72 md:h-80 lg:h-[500px] min-w-[280px]"
              style={{
                backgroundImage: 'url("/images/about.png")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              aria-label="Hero image"
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gray-50 py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <span className="inline-block text-blue-600 text-xs border border-blue-600 px-3 py-1 rounded-md mb-2">
              Fitur Utama
            </span>
            <h2 className="text-3xl font-bold mb-3">Solusi Lengkap untuk Seleksi PIP</h2>
            <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
              Sistem kami menyediakan berbagai fitur untuk membantu proses seleksi penerima bantuan PIP secara efisien dan akurat.
            </p>

            <div className="flex flex-wrap justify-center gap-8">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md max-w-xs flex flex-col items-start transition-shadow duration-300 hover:shadow-lg">
                <ChartBarIcon className="h-10 w-10 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 mx-auto">Dashboard Analitik</h3>
                <p className="text-gray-700">
                  Visualisasi data dan statistik untuk memantau proses seleksi dan hasil prediksi.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md max-w-xs flex flex-col items-start transition-shadow duration-300 hover:shadow-lg">
                <UserGroupIcon className="h-10 w-10 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 mx-auto">Manajemen Data Siswa</h3>
                <p className="text-gray-700">
                  Kelola data siswa dengan mudah melalui antarmuka yang intuitif dan responsif.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md max-w-xs flex flex-col items-start transition-shadow duration-300 hover:shadow-lg">
                <PresentationChartLineIcon className="h-10 w-10 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2 mx-auto">Prediksi Otomatis</h3>
                <p className="text-gray-700">
                  Prediksi penerima bantuan PIP menggunakan model Machine Learning yang akurat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 flex-wrap">
            {/* About Image */}
            <div
              className="flex-1 border-4 border-blue-300 bg-gray-100 bg-cover rounded-xl
                         h-56 sm:h-72 md:h-80 lg:h-[500px] min-w-[280px]"
              style={{
                backgroundImage: 'url("/images/hero.png")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
              }}
              aria-label="About image"
            />
            <div className="flex-1 min-w-[280px]">
              <span className="inline-block text-blue-600 text-xs border border-blue-600 px-3 py-1 rounded-md mb-3">
                Tentang Kami
              </span>
              <h2 className="text-3xl font-bold mb-4">Sistem Pendukung Keputusan PIP</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Sistem Pendukung Keputusan (SPK) Penerima Bantuan PIP adalah solusi berbasis website dan machine learning yang dirancang untuk membantu sekolah menyeleksi siswa penerima Program Indonesia Pintar secara cepat dan akurat.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Dengan menggunakan model klasifikasi TensorFlow yang dilatih dari data sosial-ekonomi siswa melalui pendekatan CRISP-DM, sistem kami mampu memberikan rekomendasi yang objektif dan transparan.
              </p>
              <a
                href="/register"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition"
              >
                Bergabung Sekarang
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
