const prisma = require('../utils/prisma');

const saveResults = async (userId, results) => {
    const inserted = await prisma.hasil.createMany({
        data: results.map((r) => ({
            siswaId: r.siswaId,
            status: r.status,
            skor: r.skor.toString(),
            userId
        })),
        skipDuplicates: true,
    });

    const totalLayak = await prisma.hasil.count({
        where: { userId, status: "Layak" },
    });
    const totalTidak = await prisma.hasil.count({
        where: { userId, status: "Tidak Layak" },
    });
    const totalSiswa = await prisma.hasil.count({
        where: { userId },
    });

    // Dapatkan awal bulan (misalnya 2025-06-01)
    const now = new Date();
    const bulan = new Date(now.getFullYear(), now.getMonth(), 1);

    // Cek apakah rekap bulan ini sudah ada
    const existingRekap = await prisma.rekapHasil.findUnique({
        where: {
            userId_bulan: {
                userId,
                bulan,
            },
        },
    });

    if (existingRekap) {
        // Update jika sudah ada
        await prisma.rekapHasil.update({
            where: {
                userId_bulan: {
                    userId,
                    bulan,
                },
            },
            data: {
                totalLayak,
                totalTidak,
                totalSiswa,
            },
        });
    } else {
        // Buat baru
        await prisma.rekapHasil.create({
            data: {
                userId,
                totalLayak,
                totalTidak,
                totalSiswa,
                bulan,
            },
        });
    }

    return { inserted };
};

const getResults = async (userId) => {
    const hasil = await prisma.hasil.findMany({
        where: { userId },
        include: {
            siswa: {
                select: {
                    namaSiswa: true,
                },
            },
        },
    });

    return { hasil };
};

const deleteResult = async (hasilId) => {
    // Cari data hasil yang akan dihapus, untuk dapatkan userId dan tanggal
    const hasil = await prisma.hasil.findUnique({
        where: { id: hasilId },
        select: {
            userId: true,
            tanggal: true, // diasumsikan kamu punya kolom tanggal
        },
    });

    if (!hasil) {
        throw new Error("Hasil tidak ditemukan.");
    }

    const { userId, tanggal } = hasil;

    // Hapus data hasil
    await prisma.hasil.delete({ where: { id: hasilId } });

    // Dapatkan awal bulan dari tanggal tanggal
    const bulan = new Date(tanggal.getFullYear(), tanggal.getMonth(), 1);

    // Hitung ulang total setelah penghapusan
    const totalLayak = await prisma.hasil.count({
        where: { userId, status: "Layak" },
    });
    const totalTidak = await prisma.hasil.count({
        where: { userId, status: "Tidak Layak" },
    });
    const totalSiswa = await prisma.hasil.count({
        where: { userId },
    });

    // Update rekap untuk bulan itu
    const existingRekap = await prisma.rekapHasil.findUnique({
        where: {
            userId_bulan: {
                userId,
                bulan,
            },
        },
    });

    if (existingRekap) {
        if (totalSiswa === 0) {
            // Jika semua hasil terhapus, hapus juga rekap bulan ini
            await prisma.rekapHasil.delete({
                where: {
                    userId_bulan: {
                        userId,
                        bulan,
                    },
                },
            });
        } else {
            // Kalau masih ada hasil, update angkanya
            await prisma.rekapHasil.update({
                where: {
                    userId_bulan: {
                        userId,
                        bulan,
                    },
                },
                data: {
                    totalLayak,
                    totalTidak,
                    totalSiswa,
                },
            });
        }
    }

    return { status: 'success' };
};


const getRekapHasil = async (userId) => {
    const rekapList = await prisma.rekapHasil.findMany({
        where: {
            userId
        },
        orderBy: {
            bulan: 'asc' 
        }
    });

    return { rekapList };
};

module.exports = { saveResults, getResults, deleteResult, getRekapHasil };
