/**
 * 游戏js
 * User: lihuanchun
 * Date: 13-5-22
 * Time: 上午11:11
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {


var init = {
    'map':{
        'x':5,
        'y':10
    },
    snake:{

    }
};


var MAP = {
    'create':function(){
        var t = [];
        t.push("<table class='snake_table'>");
        for (var i = 1; i <= init.map.x; i++) {
            t.push("<tr>");
            for (var j = 1; j <= init.map.y; j++) { t.push("<td></td>"); }
            t.push("</tr>");
        }
        t.push("</table>");
        $('#score_div').html(t.join(''));
    }



}


MAP.create();


});