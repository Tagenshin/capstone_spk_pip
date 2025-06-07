const Boom = require('@hapi/boom');
const Joi = require('joi');
const { inputSiswaHandler, GetSiswa, GetSiswaById, UpdateSiswa, DeleteSiswa, importSiswaExcelHandler } = require('../handlers/siswa.handler');

module.exports = [
    {
        method: 'POST',
        path: '/siswa',
        options: {
            auth: 'jwt',
            cors: true,
            validate: {
                payload: Joi.object({
                    namaSiswa: Joi.string().required(),
                    alatTransportasi: Joi.string().required(),
                    pekerjaanOrtu: Joi.string().required(),
                    penghasilan: Joi.string().required(),
                    tanggungan: Joi.string().required(),
                    statusKIP: Joi.string().required(),
                    statusPKH: Joi.string().required()
                }),
                failAction: (request, h, err) => {
                    console.error('Validation Error:', err.message);
                    throw Boom.badRequest(err.message);
                }
            }
        },
        handler: inputSiswaHandler
    },
    {
        method: 'POST',
        path: '/siswa/import',
        options: {
            auth: 'jwt',
            cors: true,
            payload: {
                output: 'stream',
                parse: true,
                multipart: true,
                allow: 'multipart/form-data',
                maxBytes: 1024 * 1024 * 5 
            }
        },
        handler: importSiswaExcelHandler
    },
    {
        method: 'GET',
        path: '/siswa',
        options: {
            auth: 'jwt',
            cors: true
        },
        handler: GetSiswa
    },
    {
        method: 'GET',
        path: '/siswa/{id}',
        options: {
            auth: 'jwt',
            cors: true
        },
        handler: GetSiswaById
    },
    {
        method: 'PUT',
        path: '/siswa/{id}',
        options: {
            auth: 'jwt',
            cors: true,
            validate: {
                payload: Joi.object({
                    namaSiswa: Joi.string(),
                    alatTransportasi: Joi.string(),
                    pekerjaanOrtu: Joi.string(),
                    penghasilan: Joi.string(),
                    tanggungan: Joi.string(),
                    statusKIP: Joi.string(),
                    statusPKH: Joi.string()
                }),
                failAction: (request, h, err) => {
                    console.error('Validation Error:', err);
                    throw Boom.badRequest(err.message);
                }
            }
        },
        handler: UpdateSiswa
    },
    {
        method: 'DELETE',
        path: '/siswa/{id}',
        options: {
            auth: 'jwt',
            cors: true
        },
        handler: DeleteSiswa
    }
];
