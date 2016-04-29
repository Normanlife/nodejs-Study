$('#submit1').click(function() {

    // e.preventDefault();
    $.ajax({
        url: '/back/add',
        data: {
            cat: $('.cat').val(),
            title: $('.title').val(),
            content: $('.content').val(),
            img: $('.img').val(),
            time: $('.time').val()
        },
        dataType: 'json',
        type: 'post',
        success: function(ret) {
            alert('添加新闻成功！');
        },
        error: function() {
            console.log('addNews not ok!')
        }
        // return false;
    });

});

$('#submit2').click(function() {

    // e.preventDefault();
    // console.log($('.cat1').val());

    $.ajax({
        url: '/back/find',
        data: {
            cat: $('.cat1').val()
                // time: $('.time').val()
        },
        dataType: 'json',
        type: 'post',
        success: function() {
            alert('查找新闻成功！');
            //console.log($('.cat1').val())
        },
        error: function() {
            console.log('findNews not ok!')
        }
    }).done(function(data) {

        if ($('.tat')) {$('.tat').remove()}
        //console.log(data.response)
        for (var i = 0; i < data.response.length; i++) {
            var html = '<tr class="tat"><td class="t-id">' + data.response[i].id + '</td><td class="t-title">' + data.response[i].title + '</td><td class="t-content">' + data.response[i].content + '</td><td class="t-img">' + data.response[i].img + '</td><td class="t-time">' + data.response[i].time + '</td></tr>';
            $('#something').append(html);
        }
    });

});
//删除新闻版块
$('#submit3').click(function() {
    //先检测输入的是否为数字
    var id = $('#deletenum').val();
    //console.log(id);

    if (isNaN(id)) {
        alert('输入的不是数字');
        return;
    }
    confirm('确定要删除？');

    $.ajax({
        url: '/back/delete',
        dataType: 'json',
        type: 'post',
        data: {
            id: id
        },
        success:function(){
            alert('删除执行完成！')
        },
        error: function() {
            console.log('delNews not ok!')
        }
    });
});

//调出需要修改的新闻内容
$('#submit4').click(function() {
    var id = $('#rewirte-num').val();
    //console.log(id);
    if (isNaN(id)) {
        alert('输入的不是数字');
        return;
    }
    $.ajax({
        url: '/back/upDate_find',
        dataType: 'json',
        type: 'post',
        data: { id: id }
    }).done(function(data) {
        //console.log('data send back ok!');
        // console.log(data);
        // console.log(data.response[0]);
        //反回结果为空，即数据库中无此ID时
        if (!data.response[0].title) {
            alert('无此ID号！');
            return;
        } 
        //加载内容
        $('#reid').val(data.response[0].id);
        $('#retitle').val(data.response[0].title);
        $('#recontent').val(data.response[0].content);
        $('#reimg').val(data.response[0].img);
        $('#retime').val(data.response[0].time);
        $('#recat').val(data.response[0].cat);

        $('#rewrite').show();
    });
});

//修改调出后的新闻内容
$('#submit5').click(function() {
	console.log($('#retitle').val());
	console.log($('#recontent').val());
	console.log($('#reimg').val());
	console.log($('#retime').val());
	console.log($('#recat').val());
	console.log($('#reid').val());
    confirm('确定要修改吗？');

    $.ajax({
        url: '/back/upDate',
        dataType: 'json',
        type: 'post',
        data: {
        	id:$('#reid').val(),
            title:$('#retitle').val(),
            content:$('#recontent').val(),
            img:$('#reimg').val(),
            time:$('#retime').val(),
            cat:$('#recat').val()
        }
    }).done(function(){
    	alert('更改成功！');
    });
});

//后台操作界面切换
$('#content>div').eq(0).show() //默认显示添加新闻
$('#ul li').click(function(index) {
    $(this).tab('show');

    index=$(this).index();
    //console.log(index);
    $('#content>div').eq(index).show().siblings().hide();
});