# Learning Path Front End Back End Developer

## **Front End**
# 🎓 SPK PIP Frontend

Frontend aplikasi **Sistem Pendukung Keputusan PIP (Program Indonesia Pintar)** yang memungkinkan pengguna untuk mengakses, mengelola, dan menilai data siswa berdasarkan kriteria kelayakan bantuan. Proyek ini dirancang dengan antarmuka pengguna yang **responsif**, **dinamis**, dan **mudah digunakan**.

---

## 📦 Teknologi yang Digunakan

| Teknologi     | Deskripsi                                                                 |
|---------------|---------------------------------------------------------------------------|
| **Next.js**   | Framework React dengan kemampuan Server-Side Rendering & Static Generation |
| **React**     | Library JavaScript untuk membangun antarmuka pengguna                     |
| **Tailwind CSS** | CSS framework utility-first untuk desain cepat dan responsif           |
| **Axios**     | Library HTTP client untuk komunikasi dengan backend API                   |
| **Material-UI** | Komponen UI untuk desain dan interaktivitas yang konsisten dengan prinsip Material Design |
| **Cookies & LocalStorage** | Teknologi untuk mengelola sesi pengguna dan menyimpan data login |
| **Lucide React** | Ikon untuk memperindah dan memberikan petunjuk visual dalam UI |

---

## 🚀 Fitur Utama

- ✅ Akses dan manajemen data siswa
- ✅ Penilaian kelayakan bantuan PIP berdasarkan kriteria tertentu
- ✅ Desain antarmuka yang responsif dan mobile-friendly
- ✅ Navigasi antar halaman tanpa reload
- ✅ Komunikasi real-time dengan backend API

---

## 🛠️ Instalasi dan Menjalankan Proyek


# 1. Clone repositori ini
```bash
git clone https://github.com/username/spk-pip-frontend.git
cd spk-pip-frontend
```

# 2. Instal dependensi
```bash
npm install
```

# 3. Setup Environment Variable
Buat file `.env` dan isi:  
```env  
JWT_SECRET="secretmu"  
 ```

# 4. Jalankan aplikasi
```bash
npm run dev
```

Aplikasi akan berjalan di http://localhost:3000

---

## 🧩 Struktur Proyek

```bash
frontend/                   
├── .next/                 # Folder otomatis yang dibuat oleh Next.js saat build
├── node_modules/          # Folder untuk dependensi Node.js yang diinstall
├── public/                # Folder untuk aset statis (gambar, favicon, dll)
├── src/                   # Sumber kode aplikasi
│   ├── app/               # Folder utama untuk aplikasi yang dikelola oleh Next.js
│   │   ├── admin/         # Halaman dan komponen terkait admin
│   │   ├── components/    # Komponen UI yang digunakan ulang
│   │   ├── login/         # Halaman login pengguna
│   │   ├── register/      # Halaman registrasi pengguna
│   │   ├── super-admin/   # Halaman dan komponen khusus untuk super admin
│   │   ├── favicon.ico    # Favicon untuk aplikasi
│   │   ├── layout.js      # Layout umum untuk aplikasi
│   │   ├── page.js        # Halaman utama untuk routing di setiap direktori
│   │   └── middleware.js  # Middleware untuk penanganan request
│   └── styles/            # File CSS dan styling aplikasi
├── .env                   # File untuk environment variables
├── .gitignore             # Daftar file atau folder yang diabaikan oleh Git
├── eslint.config.mjs      # Konfigurasi ESLint untuk linting kode JavaScript
├── jsonconfig.json        # File konfigurasi JSON (kemungkinan untuk linting atau build)
├── next-env.d.ts          # Definisi TypeScript untuk Next.js
├── next.config.mjs        # Konfigurasi Next.js
├── package-lock.json      # Kunci versi dari dependensi npm
├── package.json           # Daftar dependensi dan skrip proyek
├── postcss.config.mjs     # Konfigurasi PostCSS untuk styling
└── tsconfig.json          # Konfigurasi TypeScript untuk proyek Next.js
```




## **Back End**
# 🎓 SPK PIP API – Hapi.js + Prisma + PostgreSQL  
API backend untuk **Sistem Pendukung Keputusan PIP (Program Indonesia Pintar)** yang memungkinkan pengelolaan data siswa dan perhitungan hasil kelayakan bantuan berdasarkan kriteria tertentu.  
## ⚙️ Teknologi  
- [Hapi.js](https://hapi.dev/) – Web framework untuk Node.js  
- [Prisma ORM](https://www.prisma.io/) – ORM modern untuk akses database PostgreSQL  
- [PostgreSQL](https://www.postgresql.org/) – Database relasional open-source  
- [dotenv](https://www.npmjs.com/package/dotenv) – Pengelolaan environment variables  
## 📁 Struktur Folder  
```
.  
├── prisma/  
│   ├── schema.prisma     # Skema dan konfigurasi Prisma  
│   └── migrations/       # Riwayat migrasi database  
├── src/  
│   ├── routes/           # Route API (siswa, user, hasil, dll)  
│   ├── handlers/         # Logika bisnis dan response handler  
│   ├── services/         # Interaksi dengan Prisma Client  
│   ├── utils/            # Fungsi utilitas (jika ada)  
│   └── server.js         # Entry point aplikasi  
├── .env  
├── package.json  
└── README.md  
```  
## 🚀 Fitur Utama  
✅ **Autentikasi User**  
✅ **CRUD Siswa**  
✅ **CRUD Hasil**    
✅ **SPK Penilaian Otomatis** *(berbasis kriteria kelayakan)*  
## 🛠️ Instalasi  
1. **Clone repository**  
```bash  
git clone https://github.com/Tagenshin/capstone_spk_pip.git 
cd febe/backend  
```  
2. **Install dependencies**  
```bash  
npm install  
```  
3. **Setup environment variable**  
Buat file `.env` dan isi:  
```env  
DATABASE_URL="postgresql://user:password@localhost:5432/spk_pip"  
PORT=5000  
JWT_SECRET="secretmu"  
```  
4. **Setup Prisma**  
```bash  
npx prisma generate  
npx prisma migrate dev --name init  
```  
## 🧪 Menjalankan Server  
```bash  
npm run dev  
```  
## 🔐 Autentikasi  
- Menggunakan **JWT**.  
- User login akan menerima token yang digunakan untuk mengakses endpoint yang dilindungi.  
## 📦 API Endpoint  
### 📘 Auth  
| Method | Endpoint      | Deskripsi                |  
|--------|---------------|--------------------------|  
| POST   | /auth/register| Pendaftaran              |  
| POST   | /auth/login   | Masuk Aplikasi           |  
| POST   | /auth/logout  | Keluar Aplikasi          |  
### 📘 Siswa  
| Method | Endpoint     | Deskripsi                 |  
|--------|--------------|---------------------------|  
| GET    | /siswa       | Daftar siswa              |
| GET    | /siswa/{id}  | Detail siswa              |
| POST   | /siswa       | Tambah siswa              |
| POST   | /siswa/import| Tambah siswa dengan excel |
| PUT    | /siswa/{id}  | Ubah data siswa           |  
| DELETE | /siswa/{id}  | Hapus siswa               |  
### 📘 Hasil  
| Method | Endpoint     | Deskripsi                 |  
|--------|--------------|---------------------------|  
| GET    | /hasil       | Lihat semua hasil SPK     |  
| POST   | /hasil       | Tambah hasil penilaian    |  
| DELETE | /hasil/{id}  | Hapus hasil tertentu      |
| GET    | /hasil/rekap | Rekap hasil penilaian SPK |
### 📘 User  
| Method | Endpoint     | Deskripsi                 |  
|--------|--------------|---------------------------|  
| GET    | /user        | Detail user               |   
| PUT    | /user        | Update user               |   

