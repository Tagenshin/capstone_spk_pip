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

3. **Prediksi Real-time:**
   - Isi form untuk memasukkan data secara manual.
   - Aplikasi akan memprediksi status kelayakan secara langsung dan menampilkan hasilnya di layar.

4. **Unduh Hasil:**
   - Setelah prediksi selesai, Anda dapat mengunduh hasilnya dalam format Excel.
