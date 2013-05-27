/*
    注册POST
 */
exports.list = function(req, res){
    var action = req.body.action;
    var options = {
        'title':'用户注册',
        'show': '',
        'userdata':req.cookies['userdata']
    };

    switch(action){
        case 'registing':

            var password_ = req.body.password_;

            var info = {
                name:req.body.name,
                mail:req.body.mail,
                password:req.body.password,
                age:req.body.age,
                sex:req.body.sex
            }

            // 验证用户信息
            var userVerinficationData = user.verification(info,password_);
            if(!userVerinficationData.data){
                options.show = userVerinficationData.msg;
                res.render('regist', options );
                return false;
            }

            var redis = require('redis').createClient();

            redis.GET('node:user:name:'+ info.name,function(err,data){
                if(data != undefined){
                    options.show = '有此用户名';
                    res.render('regist', options );
                    return false;
                }
                redis.GET('node:user:mail:'+ info.mail,function(err,data){
                    if(data != undefined){
                        options.show = '有此邮箱地址';
                        res.render('regist', options );

                        return false;
                    }
                    redis.INCR('node:user:id',function(err,data){
                        info.id = data;
                        redis.HMSET('node:user:id:'+ info.id,info);
                        redis.SET('node:user:name:'+ info.name,info.id);
                        redis.SET('node:user:mail:'+ info.mail,info.id);
                        redis.ZADD('node:user:email',info.id,info.mail);
                        redis.ZADD('node:user:age',info.id,info.age);
                        redis.ZADD('node:user:sex',info.id,info.sex);


                        info.password = '';
                        res.cookie('userdata',info, {expires: new Date(Date.now() + 900000),maxAge:600000, path:'/'});
                        res.redirect('/');
                        return false;


                        //options.show = '注册成功';
                        //
                    });
                });
            });
            break;

        case 'verification':
            var password_ = req.body.password_;

            var info = {
                name:req.body.name,
                mail:req.body.mail,
                password:req.body.password,
                age:req.body.age,
                sex:req.body.sex
            }
            // 验证用户信息



            res.write(JSON.stringify(user.verification(info,password_)));
            res.end();

        break;

        default :
            res.render('regist', options );

    }

};

var user = {
    'verification':function(info,password_){

        if(info.name==''||info.email==''||info.password==''||password_==''||info.age==''||info.sex==''){
            return {data:false,msg: '请填写完整'};
        }

        if(info.password!=password_){
            return {data:false,msg: '密码不一致'};
        }

        if(!parseInt(info.age)){
            return {data:false,msg: '请正确填写年龄'};
        }

        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!myreg.test(info.mail)){
            return {data:false,msg: '邮箱格式错误'};
        }
        return {data:true,msg: '验证通过'};
    }
};