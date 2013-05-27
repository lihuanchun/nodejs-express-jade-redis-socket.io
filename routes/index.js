
/*
 * GET home page.
 */

exports.index = function(req, res){
    var options = {
        'title':'首页',
        'userdata':req.cookies['userdata']
    }
    res.render('index',options);
};

