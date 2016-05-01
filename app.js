var http = require("http");
var uaparse = require('user-agent-parser');
var fs = require("fs");
var dispatcher = require("httpdispatcher");
var io = require('socket.io').listen(8081);

var nspMobile = io.of('/mobile');
var nspDesktop = io.of('/desktop');


nspDesktop.on('connection', function(socket) {
    socket.on('end', function (data) {
        nspMobile.emit('end');
    })
});

nspMobile.on('connection', function(socket) {
    socket.on('movement', function (data) {
        nspDesktop.emit('movement', data);
    })
});

dispatcher.setStatic("static");
dispatcher.setStaticDirname('.');

function serveIndex(req, res) {
    var parsed = uaparse(req.headers['user-agent']);
    if(parsed.os.name === 'iOS' || parsed.os.name === 'Android') {
        req.url = '/static/index_mobile.html';
        fs.readFile('static/index_mobile.html', function (err, data) {
            if (err) {
                res.response.writeHead(500);
                res.end();
                return;
            }
            res.end(data.toString().replace('localhost:8081', req.headers.host.replace('8080', '8081')));
        })
    }
    else {
        req.url = '/static/index.html';
        dispatcher.staticListener(req, res);
    }
}

dispatcher.onGet("/", serveIndex);

var server = http.createServer(function(req, res) {
    dispatcher.dispatch(req, res)
});

server.listen(8080);