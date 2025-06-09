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
    await prisma.hasil.delete({ where: { id: hasilId } });
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
