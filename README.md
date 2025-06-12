
# **Sistem Pendukung Keputusan dalam Menentukan Penerima Program Indonesia Pintar dengan Teknologi Deep Learning**

## **Deskripsi**
Penelitian ini mengembangkan sebuah Sistem Pendukung Keputusan (SPK) berbasis Deep Learning untuk mempercepat dan meningkatkan akurasi dalam seleksi penerima Program Indonesia Pintar (PIP). Sistem ini memanfaatkan teknologi Artificial Neural Network (ANN) untuk memproses data sosial dan ekonomi calon penerima bantuan, seperti penghasilan orang tua, jumlah tanggungan, dan kepemilikan KIP/KPS, guna menghasilkan keputusan yang lebih objektif dan akurat. Model ANN yang dibangun menunjukkan akurasi 91% pada data uji dan dapat memprediksi kelayakan penerima bantuan dengan tingkat kesalahan yang minimal. Sistem ini juga dilengkapi dengan antarmuka web yang memudahkan pengguna dalam mengakses dan menggunakan SPK PIP. Dokumentasi dan implementasi sistem dapat diakses melalui repository ini.

## Team
| Name                        | Student ID    | University                            | Role                           | LinkedIn  | Github   |
|-----------------------------|---------------|----------------------------------------|---------------------------------|-----------|----------|
| Trio Anggoro               | MC427D5Y0300  | Universitas Bina Insan                 | Machine Learning                | [Click Me](https://www.linkedin.com/in/trio-anggoro-166479335/) | [Click Me](https://github.com/Tagenshin/) |
| Muhammad Daffa Rachman     | MC314D5Y0997  | Universitas Singaperbangsa Karawang    | Machine Learning                | [Click Me](#) | [Click Me](#) |
| Azel Fabian Azmi           | MC314D5Y0547  | Universitas Singaperbangsa Karawang    | Machine Learning                | [Click Me](#) | [Click Me](#) |
| Paundra Afif Zamroni       | FC525D5Y0009  | Politeknik Negeri Banyuwangi           | Front-End dan Back-End Developer| [Click Me](https://www.linkedin.com/in/paundra-afif-zamroni-8603b4341/) | [Click Me](https://github.com/Pafaz) |
| Muhammad Fariz Nur Hidayat| FC120D5Y2012  | Telkom University Purwokerto           | Front-End dan Back-End Developer | [Click Me](#) | [Click Me](#) |

# Learning Path Machine Learning
## **Dataset**
Berikut ini adalah link [Dataset PIP](https://drive.google.com/drive/folders/1iADr7XhA5aghODKH9SYVi85xkQ1jc1F9?usp=drive_link)

## **Struktur Proyek**
- `app/app.py`: Aplikasi Streamlit untuk prediksi kelayakan.
- `model/model_ann.h5`: Model ANN yang telah dilatih dan disimpan.
- `dataset/`: Folder untuk menyimpan dataset.
- `data_test/`: Folder untuk data uji dan data aktual.

## **Instalasi dan Persiapan Lingkungan**
1. **Clone repository ini:**
   ```bash
   git clone https://github.com/Tagenshin/capstone_spk_pip.git
   ```

2. **Install dependensi:**
   Gunakan `pip` untuk menginstall semua dependensi yang diperlukan.
   ```bash
   pip install -r requirements.txt
   ```
3. **Melatih ulang model**<br>
   Untuk melatih model ulang pada berkas notebook .ipynb, Anda bisa menjalankan langkah-langkah berikut:<br>
   - Gunakan platform seperti Jupyter Notebook atau Google Colab untuk membuka berkas .ipynb yang berisi kode yang ingin Anda jalankan.
   - Di Jupyter Notebook, Anda dapat menekan Shift + Enter untuk menjalankan sel satu per satu, atau pilih "Run All" untuk menjalankan semua sel dalam notebook.
   
   Untuk melatih model ulang pada berkas .py, Anda bisa menjalankan langkah-langkah berikut:<br>
   - Untuk menjalankan berkas .py, buka terminal atau command prompt, lalu navigasikan ke direktori tempat berkas .py berada dan jalankan dengan perintah:
      ```bash
      python nama_berkas.py
      ```

## **Cara Menggunakan Aplikasi**

1. **Menjalankan Aplikasi:**
   Jalankan aplikasi dengan menggunakan perintah berikut:
   ```bash
   streamlit run app.py
   ```

2. **Menggunakan Prediksi File:**
   - Unggah file Excel atau CSV yang berisi data calon penerima bantuan (tanpa label) di form yang disediakan.
   - Aplikasi akan memproses dan memberikan hasil prediksi berdasarkan model yang dilatih.
   - Contoh file Excel :
   ![image](https://github.com/user-attachments/assets/e645328b-579f-4dbb-8189-d784ebd962e7)
   - note** pastikan nama kolom nya sama seperti contoh diatas. 

3. **Prediksi Real-time:**
   - Isi form untuk memasukkan data secara manual.
   - Aplikasi akan memprediksi status kelayakan secara langsung dan menampilkan hasilnya di layar.

4. **Unduh Hasil:**
   - Setelah prediksi selesai, Anda dapat mengunduh hasilnya dalam format Excel.


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
| **React Router** | Library navigasi antar halaman pada aplikasi React SPA                |

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

