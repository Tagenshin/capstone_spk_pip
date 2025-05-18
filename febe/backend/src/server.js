require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const authRoutes = require('./routes/auth.route');
const siswaRoutes = require('./routes/siswa.route');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'] // aktifkan CORS
            }
        }
    });

    // Register plugin
    await server.register([
        Jwt,
        Inert
    ]);

    // Auth strategy
    server.auth.strategy('jwt', 'jwt', {
        keys: process.env.JWT_SECRET || 'supersecret',
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            exp: true
        },
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: {
                    id: artifacts.decoded.payload.id,
                    role: artifacts.decoded.payload.role
                }
            };
        }
    });
    server.auth.default('jwt');

    server.route([
        ...authRoutes,
        ...siswaRoutes
    ]);
    
    // TODO: Tambahkan route di sini nanti
    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: false
        },
        handler: (request, h) => {
            return { status: 'API is ready mathafaka ✅' };
        }
    });

    await server.start();
    console.log('🚀 Server running at:', server.info.uri);
};

init();
