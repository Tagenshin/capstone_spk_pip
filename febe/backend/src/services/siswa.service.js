const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function inputSiswa(
    userId,
    { 
        namaSiswa, 
        alatTransportasi, 
        pekerjaanOrtu, 
        penghasilan, 
        tanggungan, 
        statusKIP, 
        statusPKH 
    }) {

    const hasil = await prisma.siswa.create({
        data: {
            namaSiswa,
            alatTransportasi,
            pekerjaanOrtu, 
            penghasilan, 
            tanggungan, 
            statusKIP, 
            statusPKH,
            userId
        }
    });

    return hasil;
}

async function getSiswa(userId) {
    const siswa = await prisma.siswa.findMany({ where: { userId } }); 

    return siswa;
}

async function getSiswabyId(siswaId) {
    const siswa = await prisma.siswa.findUnique({ where: { id: siswaId } }); 

    return siswa;
}

async function updateSiswa(siswaId, payload) {
    const siswa = await prisma.siswa.update({ where: { id: siswaId }, data: payload });

    return siswa;
}

async function deleteSiswa(siswaId) {
    const siswa = await prisma.siswa.delete({ where: { id: siswaId } });

    return siswa;
}


module.exports = { inputSiswa, getSiswa, getSiswabyId, updateSiswa, deleteSiswa };
