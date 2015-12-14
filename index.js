const   hapi        = require('hapi'),
        good        = require('good'),
        hbs         = require('handlebars'),
        path        = require('path');

var server = new hapi.Server();
server.connection({ port: 3000 });
server.views({
    engines: {
        html: hbs
    },
    relativeTo: __dirname,
    path: './public/views',
    layout: true,
    layoutPath: path.join(__dirname,'./public/views/layout'),
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('home/index',{title:"Don't worry be Hapi!!!"});
    }
});

server.route({
    method: 'GET',
    path: '/contact',
    handler: function (request, reply) {
        reply.view('contact/contact',{title:"Contact Page"});
    }
});

server.register({
    register: good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
