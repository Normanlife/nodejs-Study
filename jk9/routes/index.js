
var issue = require('./issue');

exports.all = function(app) {
    //根目录时渲染cat=0 的 index.html
    app.get('/', function(req, res, next) {
        req.models.baijia.find({
                cat: 0
            },
            function(err, baijia) {
                if (err) res.send(err)
                res.render('index.html', { response: baijia });
            });

    });
    //收到back请求时渲染后台页面
    app.get('/back', function(req, res) {
            res.render('back.html');
        })
        //渲染首页
    app.get('/:cat', function(req, res, next) {

        req.models.baijia.find({ cat: req.params.cat },
            function(err, baijia) {
                if (err) res.send(err)

                res.render('index.html', { response: baijia });
            });
    });

    //添加新闻接口,接收后台POST数据issue.addNews
    app.post('/back/add', issue.addNews)
    //查找新闻接口
    app.post('/back/find',issue.findNews)
    //删除新闻接口
    app.post('/back/delete',issue.delNews)
    //更改前查找
    app.post('/back/upDate_find',issue.upDate_find)
    //更改新闻
    app.post('/back/upDate',issue.upDate)
    
}
