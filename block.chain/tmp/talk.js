


var myutil = require('../util.js');

var map = require('./map.js');



function talk(e, pubpem, mapobj){
    var text = document.getElementById('textBox').value ;
    if(!text){
        myutil.showInfo('info', 'empty text?');
        return false;
    }


    map.getLatlng(function(err, pos){
        if(err) {return err;}

        //console.log(pos);

        myutil.post({
            action: 'talk',
            pubpem: pubpem,
            text:   text,
            pos:    pos
        },
        '/json',
        function(jReply){
            p(jReply);
        });


        if(map){
            map.putInfo(mapobj, pos, text);
        }

            myutil.showInfo('info', 'message send to srv: ' + text);

    });
}

module.exports.talk = talk;
