/*
 * 游戏页面
 */
exports.list = function(req, res){
    var options = {
        'title':'游戏',
        'userdata':req.cookies['userdata']
    };

    res.render('game', options);
};
