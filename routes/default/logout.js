/*
 * 退出
 */
exports.list = function(req, res){
    console.log(new Date(Date.now()));
    res.clearCookie('userdata', { path:'/'});

    res.redirect('/');

};
