const prisma = require('../utils/prisma');
const { hashPassword, comparePassword } = require('../utils/hash');
const jwt = require('@hapi/jwt');

const register = async (payload) => {
    const { email, password, nama, noHp, alamat, role } = payload;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error('Email sudah terdaftar');

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
        data: { email, password: hashed, nama, noHp, alamat, role },
    });

    return { id: user.id, email: user.email, role: user.role };
};

const login = async ({ email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Email tidak ditemukan');

    const match = await comparePassword(password, user.password);
    if (!match) throw new Error('Password salah');

    const token = jwt.token.generate(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        {
            key: process.env.JWT_SECRET,
            algorithm: 'HS256',
        }
    );

    return { token };
};

module.exports = { register, login };
