
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);// 首页

/*
注册
 */
var regist = require('./routes/default/regist');
app.get('/regist', regist.list);
app.post('/regist', regist.list);

/*
登录
 */
var login = require('./routes/default/login');
app.get('/login', login.list);
app.post('/login', login.list);


/*
修改
 */
var update = require('./routes/default/update');
app.get('/update', update.list);
app.post('/update', update.list);

/*
 退出
 */
var logout = require('./routes/default/logout');
app.get('/logout', logout.list);
app.post('/logout', logout.list);

/*
 socket
 */
var socket = require('./routes/default/socket');
app.get('/socket', socket.list);
app.post('/socket', socket.list);

/*
 game
 */
var game = require('./routes/default/game');
app.get('/game', game.list);
app.post('/game', game.list);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
