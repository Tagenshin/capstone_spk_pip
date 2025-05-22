const { registerHandler, loginHandler } = require('../handlers/auth.handler');

module.exports = [
    {
        method: 'POST',
        path: '/auth/register',
        options: { auth: false },
        handler: registerHandler,
    },
    {
        method: 'POST',
        path: '/auth/login',
        options: { auth: false },
        handler: loginHandler,
    },
];
