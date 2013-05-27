/*
 * 登录
 */
exports.list = function(req, res){
    var options = {
        'title':'用户登录',
        'show': '',
        'userdata':req.cookies['userdata']
    };
    var action = req.body.action;

    switch(action){
        case 'logining':

            var name_or_mail = req.body.name_or_mail;
            var password = req.body.password;
            var key = 'name';
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(myreg.test(name_or_mail)){
                key = 'mail';
            }
            var redis = require('redis').createClient();
            redis.GET('node:user:'+key+':'+ name_or_mail,function(err,id){
                if(id){
                    redis.HGETALL('node:user:id:'+id,function(err,data){
                        if(data.password != password){
                            res.write(JSON.stringify({data:false,msg:'密码错误'}));
                        }else{
                            data.password = '';
                            res.cookie('userdata',data, {expires: new Date(Date.now() + 900000),maxAge:600000, path:'/'});
                            res.write(JSON.stringify({data:true,msg:'登录成功'}));
                        }
                        res.end();
                        return false;
                    });
                }else{
                    res.write(JSON.stringify({data:false,msg:'无此用户'}));
                    res.end();
                    return false;
                }
            });
        break;
        default :
            res.render('login',options);
    }




};
