const Boom = require('@hapi/boom');
const { UpdateUser, getUser } = require('../services/user.service');

const SettingUser = async (request, h) => {
    try {
        const user = request.auth.credentials;
        const payload = request.payload;
        
        const siswa = await UpdateUser(user.id, payload);

        return h.response({ message: 'Data berhasil disimpan', data: siswa }).code(201);
    } catch (err) {
        console.error(err);
        throw Boom.internal('Gagal input data siswa');
    }
};

const GetUser = async (request, h) => {
    try {
        const user = request.auth.credentials;
        const sekolah = await getUser(user.id);

        return h.response({ message: 'Data berhasil disimpan', data: sekolah }).code(201);
    } catch (err) {
        console.error(err);
        throw Boom.internal('Gagal input data sekolah');
    }
};

module.exports = { SettingUser, GetUser };
