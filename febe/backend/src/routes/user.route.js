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
                    namaSekolah: Joi.string(),
                    tingkat: Joi.string(),
                    email: Joi.string(),
                    password: Joi.string(),
                    noHp: Joi.string(),
                    alamat: Joi.string(),
                    logo: Joi.string()
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
