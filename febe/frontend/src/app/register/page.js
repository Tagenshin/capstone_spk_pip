"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.registerContainer}>
          <h1 className={styles.title}>
            <span className={styles.icon} aria-hidden="true">🎓</span> SPK PIP
          </h1>
          <p className={styles.subtitle}>Buat Akun Baru</p>
          <p className={styles.description}>
            Daftar untuk mengakses sistem pendukung keputusan PIP
          </p>
          <form className={styles.form}>
            <label htmlFor="fullname" className={styles.label}>Nama Lengkap</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Nama lengkap Anda"
              className={styles.input}
              required
            />
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="nama@sekolah.ac.id"
              className={styles.input}
              required
            />
            <label htmlFor="schoolname" className={styles.label}>Nama Sekolah</label>
            <input
              type="text"
              id="schoolname"
              name="schoolname"
              placeholder="Nama sekolah Anda"
              className={styles.input}
              required
            />
            <label htmlFor="schooltype" className={styles.label}>Jenis Sekolah</label>
            <select
              id="schooltype"
              name="schooltype"
              className={styles.input}
              required
              defaultValue=""
            >
              <option value="" disabled>Pilih jenis sekolah</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="SMK">SMK</option>
            </select>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              required
            />
            <label htmlFor="confirmPassword" className={styles.label}>Konfirmasi Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={styles.input}
              required
            />
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="terms" required />
              Saya menyetujui <a href="#" className={styles.link}>Syarat dan Ketentuan</a>
            </label>
            <button type="submit" className={styles.btnPrimary}>Daftar</button>
          </form>
          <p className={styles.bottomText}>
            Sudah memiliki akun?{" "}
            <Link href="/login" className={styles.link}>Masuk</Link>
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
