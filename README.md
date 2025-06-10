
# **Prediksi Status Kelayakan Siswa - Program Indonesia Pintar (PIP)**

## **Deskripsi**
Aplikasi ini mengimplementasikan sistem berbasis **Deep Learning** untuk memprediksi status kelayakan penerima bantuan dari Program Indonesia Pintar (PIP). Model menggunakan **Artificial Neural Network (ANN)** untuk memproses data sosial dan ekonomi guna mengklasifikasikan kelayakan penerima bantuan secara lebih akurat, cepat, dan objektif.

## **Fitur**
- **Prediksi menggunakan file Excel atau CSV**: Pengguna dapat mengunggah file untuk memprediksi status kelayakan calon penerima bantuan.
- **Prediksi Real-time**: Pengguna dapat memasukkan data secara manual melalui form yang disediakan, dan aplikasi akan memberikan hasil prediksi kelayakan secara langsung.
- **Unduh Hasil Prediksi**: Pengguna dapat mengunduh hasil prediksi dalam format Excel setelah proses selesai.

## **Struktur Proyek**
- `app.py`: Aplikasi Streamlit untuk prediksi kelayakan.
- `model/model_ann.h5`: Model ANN yang telah dilatih dan disimpan.
- `dataset/`: Folder untuk menyimpan dataset.
- `data_test/`: Folder untuk data uji dan data aktual.

## **Instalasi dan Persiapan Lingkungan**
1. **Clone repository ini:**
   ```bash
   git clone https://github.com/username/repository_name.git
   cd repository_name
   ```

2. **Install dependensi:**
   Gunakan `pip` untuk menginstall semua dependensi yang diperlukan.
   ```bash
   pip install -r requirements.txt
   ```

3. **Pastikan TensorFlow, scikit-learn, dan Streamlit terinstall.**
   ```bash
   pip install tensorflow scikit-learn streamlit
   ```

4. **Persiapkan model ANN:**
   Pastikan Anda memiliki model yang sudah dilatih dalam format `model_ann.h5`. Model ini digunakan untuk memprediksi kelayakan penerima bantuan.

## **Cara Menggunakan Aplikasi**

1. **Menjalankan Aplikasi:**
   Jalankan aplikasi dengan menggunakan perintah berikut:
   ```bash
   streamlit run app.py
   ```

2. **Menggunakan Prediksi File:**
   - Unggah file Excel atau CSV yang berisi data calon penerima bantuan (tanpa label) di form yang disediakan.
   - Aplikasi akan memproses dan memberikan hasil prediksi berdasarkan model yang dilatih.

3. **Prediksi Real-time:**
   - Isi form untuk memasukkan data secara manual.
   - Aplikasi akan memprediksi status kelayakan secara langsung dan menampilkan hasilnya di layar.

4. **Unduh Hasil:**
   - Setelah prediksi selesai, Anda dapat mengunduh hasilnya dalam format Excel.

## **Struktur File**
- `app.py`: Kode aplikasi Streamlit untuk antarmuka pengguna.
- `model_ann.h5`: Model yang telah dilatih.
- `requirements.txt`: Daftar dependensi Python yang dibutuhkan.
- `data_test/`: Folder untuk menyimpan file data uji dan data aktual.

## **Membuat Model (jika ingin melatih ulang)**

1. **Persiapkan Data:**
   - Gunakan dataset yang sesuai dengan fitur yang dibutuhkan seperti `Penghasilan Orang Tua`, `Pekerjaan Orang Tua`, `Jumlah Tanggungan`, dll.

2. **Pelatihan Model:**
   - Gunakan kode yang ada pada notebook untuk mempersiapkan data dan melatih model dengan menggunakan **ANN**.
   - Simpan model yang telah dilatih dalam format H5.

3. **Evaluasi Model:**
   - Lakukan evaluasi dengan menggunakan data uji dan tampilkan hasil menggunakan **Confusion Matrix** dan **Classification Report**.

## **Catatan**
- Aplikasi ini menggunakan **TensorFlow** untuk model Deep Learning dan **Streamlit** untuk antarmuka pengguna.
- Pastikan file input yang diunggah memiliki format yang sesuai agar dapat diproses dengan benar oleh aplikasi.
