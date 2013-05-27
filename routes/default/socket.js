/*
 * socket
 */
exports.list = function(req, res){
    var options = {
        'title':'socket.io测试',
        'show': '',
        'userdata':req.cookies['userdata']
    };
    res.render('socket', options );
};
