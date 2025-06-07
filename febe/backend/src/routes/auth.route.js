const { registerHandler, loginHandler, logoutHandler } = require('../handlers/auth.handler');

module.exports = [
    {
        method: 'POST',
        path: '/auth/register',
        options: { auth: false, cors: true,  },
        handler: registerHandler,
    },
    {
        method: 'POST',
        path: '/auth/login',
        options: { auth: false, cors: true,  },
        handler: loginHandler,
    },
    {
        method: 'POST',
        path: '/auth/logout',
        options: { auth: 'jwt', cors: true,  },
        handler: logoutHandler,
    }
];
