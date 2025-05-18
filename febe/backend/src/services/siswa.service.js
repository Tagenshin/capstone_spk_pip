const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { prediksiKelayakan } = require('../utils/aiRekomendasi');

async function inputSiswa(userId, { namaSiswa, nomorIdentitas, tanggal }) {
    const status = prediksiKelayakan(namaSiswa, nomorIdentitas);

    const hasil = await prisma.hasil.create({
        data: {
            namaSiswa,
            nomorIdentitas,
            tanggal: new Date(tanggal),
            status,
            userId
        }
    });

    return hasil;
}



module.exports = { inputSiswa };
