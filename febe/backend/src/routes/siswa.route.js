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
                    namaSiswa: Joi.string() . required(),
                    jenisKelamin: Joi.string() . required(),
                    agama : Joi.string() . required(),
                    alatTransportasi: Joi.string(). required(),
                    pekerjaanOrtu: Joi.string(). required(),
                    penghasilan: Joi.number(). required(),
                    tanggungan: Joi.string(). required(),
                    statusKIP: Joi.string(). required(),
                    statusPKH: Joi.string(). required()
                })
            }
        },
        handler: inputSiswaHandler
    }
];
