const Boom = require('@hapi/boom');
const Joi = require('joi');
const { saveResultsHandler, getResultsHandler, deleteResultHandler } = require('../handlers/hasil.handler');

module.exports = [
    {
        method: 'POST',
        path: '/hasil',
        options: {
            auth: 'jwt',
            cors: true,
            validate: {
                payload: Joi.object({
                    skor: Joi.string().required(),
                    status: Joi.string().required(),
                    siswaId: Joi.string().required()
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
    }
];
