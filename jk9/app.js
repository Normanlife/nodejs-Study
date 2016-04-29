var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.Server(app),
    routes = require('./routes'),
    bodyParser = require( 'body-parser' ),
    path = require('path'),
    orm = require('orm');

app.set('port', process.env.PORT || 3000);

app.set('vies', __dirname + '/views'); //视图文件

app.set('view engine', 'html'); //页面引擎
app.engine('html', require('ejs-mate')); //页面引擎

app.use('/', express.static(path.join(__dirname, '..', 'jk9-assets')));
app.use( bodyParser.urlencoded({ extended: false }));//用来解析ajax请求的data.body

//连接数据库
app.use(orm.express
("mysql://root:@localhost/phpmyadmin", {
    define: function(db, models, next) {
        models.baijia = db.define('baijia', {
            id: {
                type: 'serial',
                key: true
            },
            title: String,
            content: String,
            time: Date,
            img: String,
            cat: {
                type: 'serial',
                key: true
            }
        });
        next();
    }
}));

routes.all(app);//路由，所有的请求走routes.all里定义的函数

server.listen(app.get('port'), function() {
    console.log('toot server listening on port' + app.get('port'));
})

server.on('close', function() {
    console.log('close!!!!!!!!!!!!')
})
