require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const authRoutes = require('./routes/auth.route');
const siswaRoutes = require('./routes/siswa.route');
const userRoutes = require('./routes/user.route');
const hasilRoutes = require('./routes/hasil.route');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Content-Type', 'Authorization'],
                additionalHeaders: ['X-Requested-With'],
                credentials: true
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
        ...siswaRoutes,
        ...userRoutes,
        ...hasilRoutes,
        {
            method: 'OPTIONS',
            path: '/{any*}',
            options: {
                auth: false,
                cors: true
            },
            handler: (request, h) => {
                return h.response().code(200);
            }
        }
    ]);

    server.ext('onPreResponse', (request, h) => {
        const response = request.response;
        
        if (response.isBoom) {
            response.output.headers['Access-Control-Allow-Origin'] = '*';
            response.output.headers['Access-Control-Allow-Headers'] = 'Accept, Content-Type, Authorization';
            response.output.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS';
        } else if (response.header) {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization');
            response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        }

        return h.continue;
    });


    await server.start();
    console.log('🚀 Server running at:', server.info.uri);
};

init();
