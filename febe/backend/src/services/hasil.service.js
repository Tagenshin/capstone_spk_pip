const prisma = require('../utils/prisma');
const jwt = require('@hapi/jwt');

const saveResults = async (userId, payload) => {
    const { skor, status, siswaId  } = payload;
    const hasil = await prisma.hasil.create({
        data: { skor, status, siswaId, userId },
    });

    return { hasil };
};

const getResults = async (userId) => {
    const hasil = await prisma.hasil.findMany({ where: { userId } });

    return { hasil };
};

const deleteResult = async (hasilId) => {
    await prisma.hasil.delete({ where: { id: hasilId } });
    return { status: 'success' };
};

module.exports = { saveResults, getResults, deleteResult };
