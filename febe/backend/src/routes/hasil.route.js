const Boom = require('@hapi/boom');
const Joi = require('joi');
const { saveResultsHandler, getResultsHandler, deleteResultHandler, getRekapHandler } = require('../handlers/hasil.handler');

module.exports = [
    {
        method: 'POST',
        path: '/hasil',
        options: {
            auth: 'jwt',
            cors: true,
            validate: {
                payload: Joi.object({
                    results : Joi.array().items(Joi.object({
                        siswaId: Joi.string().required(),
                        skor: Joi.number().required(),
                        status: Joi.string().required()
                    }))
                }),
                failAction: (request, h, err) => {
                    console.error('Validation Error:', err.message);
                    throw Boom.badRequest(err.message);
                }
            }
        },
        handler: saveResultsHandler
    },
    {
        method: 'GET',
        path: '/hasil',
        options: {
            auth: 'jwt',
            cors: true
        },
        handler: getResultsHandler
    },
    {
        method: 'DELETE',
        path: '/hasil/{id}',
        options: {
            auth: 'jwt',
            cors: true
        },
        handler: deleteResultHandler
    },
    {
        method: 'GET',
        path: '/hasil/rekap',
        options: {
            auth: 'jwt',
            cors: true
        },
        handler: getRekapHandler
    }
];
