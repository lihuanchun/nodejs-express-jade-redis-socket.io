$(document).ready(function() {
    $('#registSubmit').click(function(){

        var info = {
            name : $("input:[name='name']").val(),
            mail : $('input:[name=mail]').val(),
            password : $('input:[name=password]').val(),
            password_ : $('input:[name=password]').val(),
            sex :  $(':radio:[name=sex]').val(),
            age :  $('input:[name=age]').val()
        };

        info.action = 'verification';


        $.ajax({
            url: "/regist",
            type: "POST",
            dataType: 'json',
            data: info,
            success: function(json) {
                if(json.data){
                   $('#registForm').submit();
                }else{
                    alert(json.msg);
                }
            },
            timeout: 3000
        });

        return false;

        }

    );


    $('#buttonlogin').click(function(){
        var info = {
            name_or_mail : $('input:[name=name_or_mail]').val(),
            password : $('input:[name=password]').val()
        }

        info.action = 'logining';
        $.ajax({
            url: "/login",
            type: "POST",
            dataType: 'json',
            data: info,
            success: function(json) {
                if(!json.data){
                    alert(json.msg);
                }else{
                    location='/';
                }


            },
            timeout: 3000
        });


    })



});