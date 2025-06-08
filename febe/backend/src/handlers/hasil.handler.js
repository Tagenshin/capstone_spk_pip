const resultService = require('../services/hasil.service');

module.exports = {
    saveResultsHandler: async (request, h) => {
        try {
            const user = request.auth.credentials;

            const hasil = await resultService.saveResults(user.id, request.payload);
            return h.response({ status: 'success', hasil }).code(201);
        } catch (err) {
            return h.response({ status: 'fail', message: err.message }).code(400);
        }
    },

    getResultsHandler: async (request, h) => {
        try {
            const user = request.auth.credentials;
            const hasil = await resultService.getResults(user.id);
            return h.response({ status: 'success', hasil }).code(200);
        } catch (err) {
            return h.response({ status: 'fail', message: err.message }).code(401);
        }
    },

    deleteResultHandler: async (request, h) => {
        try {
            await resultService.deleteResult(request.params.id);
            return h.response({ status: 'success' }).code(200);
        } catch (err) {
            return h.response({ status: 'fail', message: err.message }).code(401);
        }
    },
};
