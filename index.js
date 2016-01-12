'use strict';
const   HAPI        = require('hapi'),
        GOOD        = require('good'),
        HBS         = require('handlebars'),
        PATH        = require('path');

let server = new HAPI.Server();
server.connection({ port: 3000 });
server.views({
    engines: {
        html: HBS
    },
    relativeTo: __dirname,
    path: './public/views',
    layout: true,
    layoutPath: PATH.join(__dirname,'./public/views/layout'),
});

server.route({
    method: 'GET',
    path: '/',
    handler(request, reply) {
        reply.view('home/index',{title:"Don't worry be Hapi!!!"});
    }
});

server.route({
    method: 'GET',
    path: '/contact',
    handler(request, reply) {
        reply.view('contact/contact',{title:"Contact Page"});
    }
});

server.register({
    register: GOOD,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, (err) => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(() => {
        server.log('info', `Server running at: ${server.info.uri}`);
    });
});
