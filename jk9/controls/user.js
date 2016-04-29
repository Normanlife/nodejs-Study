var Db = require('mysql-activerecord');

//连接数据库的玩意
var db = new Db.Adapter({
    server: 'localhost',
    username: 'root',
    password: '',
    database: 'phpmyadmin'
});

//添加新闻
function addNews(req, res) {
    var data = req.body;
    //sql添加数据库语句
    db.insert('baijia', {
        cat: data.cat,
        title: data.title,
        content: data.content,
        img: data.img,
        time: data.time
    })

    res.json({}) //需要给ajax一个回应才能生效
}
//查找新闻
function findNews(req, res) {
    var data = req.body;
    db
        .select('*')
        .where({ cat: data.cat })
        .order_by('id desc')
        .get('baijia', function(err, rows, fields) {
            res.json({ response: rows }); //json格式返回数据
        })
}
//删除新闻
function delNews(req, res) {
    var data = req.body;
    db
        .where({ id: data.id })
        .delete('baijia', function(err) {
            res.json({});
        })
}
//更改新闻前查找
function upDate_find(req, res) {
    var data = req.body;
    db
        .where({ id: data.id })
        .get('baijia', function(err, rows, fields) {
            res.json({ response: rows });
        })
}
//修改新闻
function upDate(req, res) {
    var data = req.body;
    db
        .where({ id: data.id })
        .update('baijia',{
            cat: data.cat,
            title: data.title,
            content: data.content,
            img: data.img,
            time: data.time
        }, function(err) {
            res.json({})
        })
}

module.exports = {
    addNews: addNews,
    findNews: findNews,
    delNews: delNews,
    upDate_find: upDate_find,
    upDate: upDate
}
