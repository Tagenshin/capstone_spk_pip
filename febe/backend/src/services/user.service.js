const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function UpdateUser(
    userId,
    { 
        namaSekolah, 
        tingkat, 
        email, 
        noHp,
        alamat,
        logo
    }) {

    
    const user = await prisma.user.update({ where: { id: userId }, data: { email, namaSekolah, tingkat, noHp, alamat, logo } });

    return user;
}

async function getUser(userId) {

    const user = await prisma.user.findUnique({ where: { id: userId } });

    return user;
}


module.exports = { UpdateUser, getUser };
