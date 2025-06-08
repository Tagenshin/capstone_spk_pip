import streamlit as st
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
import seaborn as sns
import matplotlib.pyplot as plt


# Load model yang sudah dilatih
model = load_model("../model/model_ann.h5")

# Fungsi untuk mengategorikan 'Penghasilan Orang Tua'
def kategori_penghasilan(nilai):
    if nilai <= 1500000:
        return "Rendah"
    elif nilai <= 3000000:
        return "Sedang"
    else:
        return "Tinggi"


# Fungsi untuk encoding data kategori
def fit_label_encoders(unique_values):
    label_encoders = {}
    for col, classes in unique_values.items():
        le = LabelEncoder()
        le.fit(classes)
        label_encoders[col] = le
    return label_encoders


def transform_df(df, label_encoders):
    df_encoded = df.copy()
    for col, le in label_encoders.items():
        if col in df_encoded.columns:
            df_encoded[col] = le.transform(df_encoded[col])
    return df_encoded


# Inisialisasi label_encoders secara global
label_encoders = fit_label_encoders(
    {
        "Alat Transportasi": ["Jalan kaki", "Sepeda motor", "Lainnya"],
        "Pekerjaan Orang Tua": ["Wirausaha", "Lainnya", "Peternak", "Petani", "Buruh"],
        "Penghasilan Orang Tua": ["Tinggi", "Sedang", "Rendah"],
        "Jumlah Tanggungan": ["1", "Lebih dari 3", "2", "3"],
        "Pemilik KIP": ["Tidak", "Ya"],
        "Pemilik KPS": ["Tidak", "Ya"],
    }
)

# Streamlit UI
st.title("Prediksi Status Kelayakan Siswa")
st.write(
    "Aplikasi ini memprediksi status kelayakan siswa berdasarkan data yang diberikan."
)

# Unggah file untuk prediksi (tanpa label)
uploaded_file = st.file_uploader(
    "Pilih file untuk diprediksi (tanpa label)", type=["xlsx", "csv"]
)

if uploaded_file is not None:
    # Membaca file yang diunggah
    df = pd.read_excel(uploaded_file)
    df_test = df.copy().drop(columns="Nama")

    # Proses data
    df_test["Penghasilan Orang Tua"] = df["Penghasilan Orang Tua"].apply(
        kategori_penghasilan
    )
    df_encoded = transform_df(df_test, label_encoders)

    # Prediksi
    X = df_encoded
    y_pred_probs = model.predict(X)
    y_pred = (y_pred_probs > 0.5).astype(int).reshape(-1)

    label_mapping = {0: "Tidak Layak", 1: "Layak"}
    df["Status"] = [label_mapping[p] for p in y_pred]

    st.subheader("Hasil Prediksi")
    st.write(df)

    # # Matriks kebingungannya (optional, jika ada data label untuk diuji)
    # cm = classification_report(df["Prediksi"], df["Prediksi"])
    # st.subheader("Classification Report")
    # st.text(cm)

    # # Menampilkan confusion matrix (optional)
    # cm_data = pd.crosstab(
    #     df["Prediksi"], df["Prediksi"], rownames=["Actual"], colnames=["Predicted"]
    # )
    # fig, ax = plt.subplots(figsize=(6, 5))
    # sns.heatmap(cm_data, annot=True, fmt="d", cmap="Blues", cbar=True, ax=ax)
    # st.subheader("Confusion Matrix")
    # st.pyplot(fig)

    # Menyimpan hasil prediksi
    output_file = "hasil_prediksi.xlsx"
    df.to_excel(output_file, index=False)

    # Menambahkan tombol unduh di Streamlit
    st.download_button(
        label="Unduh Hasil Prediksi",
        data=open(output_file, "rb").read(),
        file_name=output_file,
        mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

# Form untuk prediksi real-time dengan memasukkan data manual
st.subheader("Masukkan Data untuk Prediksi Real-time")

with st.form(key="prediction_form"):
    # Mengizinkan pengguna untuk menginputkan data untuk setiap fitur
    nama = st.text_input("Nama Lngkap")
    alat_transportasi = st.selectbox(
        "Alat Transportasi", ["Jalan kaki", "Sepeda motor", "Lainnya"]
    )
    pekerjaan_ortu = st.selectbox(
        "Pekerjaan Orang Tua", ["Wirausaha", "Peternak", "Petani", "Buruh", "Lainnya"]
    )
    penghasilan = st.number_input("Penghasilan Orang Tua (Rp)", min_value=0)
    tanggungan = st.selectbox("Jumlah Tanggungan", ["1", "2", "3", "Lebih dari 3"])
    pemilik_kip = st.selectbox("Pemilik KIP", ["Tidak", "Ya"])
    pemilik_kps = st.selectbox("Pemilik KPS", ["Tidak", "Ya"])

    # Tombol untuk mengirimkan data dan melakukan prediksi
    submit_button = st.form_submit_button(label="Prediksi")

    if submit_button:
        # Menyiapkan data input untuk prediksi
        input_data = pd.DataFrame(
            {
                "Nama": [nama],
                "Alat Transportasi": [alat_transportasi],
                "Pekerjaan Orang Tua": [pekerjaan_ortu],
                "Penghasilan Orang Tua": [kategori_penghasilan(penghasilan)],
                "Jumlah Tanggungan": [tanggungan],
                "Pemilik KIP": [pemilik_kip],
                "Pemilik KPS": [pemilik_kps],
            }
        )

        st.write("Data Input Real-time:")
        st.dataframe(input_data)

        # # Melakukan encoding data input
        input_data_encoded = transform_df(
            input_data.drop(columns=["Nama"]), label_encoders
        )
        # st.write("Data Input Real-time setelah Preprocessing:")
        # st.write(input_data_encoded)

        # Melakukan prediksi
        prediction_prob = model.predict(input_data_encoded)
        prediction = (prediction_prob > 0.5).astype(int).reshape(-1)

        # Menampilkan hasil prediksi
        label_mapping = {0: "Tidak Layak", 1: "Layak"}
        result = label_mapping[prediction[0]]
        st.subheader(f"Prediksi: {nama} {result} diusulkan")
