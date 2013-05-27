/*
 * 修改页面
 */
exports.list = function(req, res){
    var options = {
        'title':'首页',
        'userdata':req.cookies['userdata']
    };
    console.log(options);
  res.render('update', options);
};
