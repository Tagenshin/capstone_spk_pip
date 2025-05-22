const Boom = require('@hapi/boom');
const Joi = require('joi');
const { inputSiswa } = require('../services/siswa.service');

const inputSiswaHandler = async (request, h) => {
    try {
        const user = request.auth.credentials;
        const payload = request.payload;

        const siswa = await inputSiswa(user.id, payload);

        return h.response({ message: 'Data berhasil disimpan', data: siswa }).code(201);
    } catch (err) {
        console.error(err);
        throw Boom.internal('Gagal input data siswa');
    }
};

module.exports = { inputSiswaHandler };
