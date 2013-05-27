
var socket = io.connect('http://127.0.0.1:8080');
var name_txt = '游客'+ parseInt(100*Math.random())+':';
socket.on('connect', function(){
    $('#toMsg').click(function(){
        var msg = $("input:[name='msgTxt']").val();
        if(msg.length===0){
            return;
        }
        // 发送公共消息
        var userdata = $.cookie('userdata');

        if(userdata){
            userdata = eval("("+userdata.split('j:')[1]+")");
            name_txt = userdata.name+':';
        }

        socket.emit('public message',name_txt + msg, function(ok){
            if (ok) {
                allMsg+='<br>我:'+msg;
                $('#p').html(allMsg);
                $("input:[name='msgTxt']").val('');
            }
        });
    });
});
// 接收到公共消息
var allMsg = '';
socket.on('public message', function(from, msg){
    allMsg+='<br>'+msg;
    $('#p').html(allMsg);
});
