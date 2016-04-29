var user=require('../controls/user');

function addNews(req,res){
	user.addNews(req,res)
}

function findNews(req,res){
	user.findNews(req,res)
}

function delNews(req,res){
	user.delNews(req,res)
}

function upDate_find(req,res){
	user.upDate_find(req,res)
}
function upDate(req,res){
	user.upDate(req,res)
}

module.exports={
	addNews:addNews,
	findNews:findNews,
	delNews:delNews,
	upDate_find:upDate_find,
	upDate:upDate
}