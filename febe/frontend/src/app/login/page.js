"use client";

import { useState } from "react"; // Import useState
import { useRouter } from "next/navigation"; // Import useRouter from 'next/navigation' untuk Next.js 13 ke atas
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";
import Link from "next/link";

export default function Login() {
  const [loading, setLoading] = useState(false); // State untuk animasi loading
  const router = useRouter(); // Next.js router untuk navigasi halaman

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah form submit default
    setLoading(true); // Menampilkan animasi loading

    // Simulasi proses login (misalnya mengarahkan ke halaman admin setelah 2 detik)
    setTimeout(() => {
      // Arahkan ke halaman admin setelah login (tanpa backend)
      router.push("/admin"); // Pindah ke halaman admin
    }, 2000); // Animasi loading berlangsung selama 2 detik
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <h1 className={styles.title}>
            <span className={styles.icon} aria-hidden="true">🎓</span> SPK PIP
          </h1>
          <p className={styles.subtitle}>Masuk ke Akun Anda</p>
          <p className={styles.description}>
            Masukkan email dan password untuk mengakses sistem
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="nama@sekolah.ac.id"
              className={styles.input}
              required
            />
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className={styles.input}
              required
            />
            <div className={styles.forgotRemember}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="remember"/>
                Ingat saya
              </label>
              <Link href="#" className={styles.forgotLink}>Lupa password?</Link>
            </div>
            <button type="submit" className={`${styles.btnPrimary} ${loading ? styles.loading : ''}`}>
              {loading ? "Loading..." : "Masuk"}
            </button>
          </form>
          <p className={styles.bottomText}>
            Belum memiliki akun?{" "}
            <Link href="/register" className={styles.link}>Daftar sekarang</Link>
          </p>
          <p className={styles.backHome}>
            ← <Link href="/">Kembali ke Beranda</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
