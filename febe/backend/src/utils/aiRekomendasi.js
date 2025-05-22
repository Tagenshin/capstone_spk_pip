function prediksiKelayakan(namaSiswa, nomorIdentitas) {
    const hasil = Math.random() > 0.5 ? "layak" : "tidak";
    return hasil;
}

module.exports = { prediksiKelayakan };
