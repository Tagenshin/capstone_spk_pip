const authService = require('../services/auth.service');

module.exports = {
    registerHandler: async (request, h) => {
        try {
            const user = await authService.register(request.payload);
            return h.response({ status: 'success', user }).code(201);
        } catch (err) {
            return h.response({ status: 'fail', message: err.message }).code(400);
        }
    },

    loginHandler: async (request, h) => {
        try {
            const { token } = await authService.login(request.payload);
            return h.response({ status: 'success', token }).code(200);
        } catch (err) {
            return h.response({ status: 'fail', message: err.message }).code(401);
        }
    },
};
