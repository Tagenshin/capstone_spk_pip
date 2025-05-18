const Joi = require('joi');
const { inputSiswaHandler } = require('../handlers/siswa.handler');

module.exports = [
    {
        method: 'POST',
        path: '/siswa',
        options: {
            auth: 'jwt',
            validate: {
                payload: Joi.object({
                    namaSiswa: Joi.string().required(),
                    nomorIdentitas: Joi.string().required(),
                    tanggal: Joi.date().required()
                })
            }
        },
        handler: inputSiswaHandler
    }
];
