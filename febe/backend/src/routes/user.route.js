const Joi = require('joi');
const { SettingUser, GetUser } = require('../handlers/user.handler');

module.exports = [
    {
        method: 'PUT',
        path: '/user',
        options: {
            auth: 'jwt',
            cors: true,
            validate: {
                payload: Joi.object({
                    namaSekolah: Joi.string().required(),
                    tingkat: Joi.string().required(),
                    email: Joi.string().email(),
                    noHp: Joi.string().allow(''),
                    alamat: Joi.string().allow(''),
                })
            }
        },
        handler: SettingUser
    },
    {
        method: 'GET',
        path: '/user',
        options: {
            auth: 'jwt'
        },
        handler: GetUser
    }
];
