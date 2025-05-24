const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { prediksiKelayakan } = require('../utils/aiRekomendasi');

async function inputSiswa(
    userId,
    { 
        namaSiswa, 
        jenisKelamin, 
        agama, 
        alatTransportasi, 
        pekerjaanOrtu, 
        penghasilan, 
        tanggungan, 
        statusKIP, 
        statusPKH 
    }) {
    const status = prediksiKelayakan(
        alatTransportasi, 
        pekerjaanOrtu, 
        penghasilan, 
        tanggungan, 
        statusKIP, 
        statusPKH);

    const hasil = await prisma.hasil.create({
        data: {
            namaSiswa,
            jenisKelamin,
            Agama : agama,
            alatTransportasi,
            pekerjaanOrtu, 
            penghasilan, 
            tanggungan, 
            statusKIP, 
            statusPKH,
            status,
            userId
        }
    });

    return hasil;
}



module.exports = { inputSiswa };
