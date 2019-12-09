


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

        // add info as: from, milli-second

        myutil.post({
            action: 'talk',
            text:   text,
            pos:    pos,
            from: pubpem,
            milli: Date.now()
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


function encryptMsg(keys, toPubpem){
    var text = document.getElementById('textBox').value ;
    if(!text){
        myutil.showInfo('info', 'empty text?');
        return false;
    }

    map.getLatlng(function(err, pos){
        if(err) {return err;}

        var msg = {

            text:   text,
            pos:    pos,
            milli: Date.now(),

        };

        var cryptographSignature = forge.talkEncrypt(keys.privateKey, toPubpem, msg)
        //
        //{
        //    cryptograph: hex64-encoded-encrypted,
        //    signature: sig
        //}

        myutil.post({
            action: 'encrypted signed p2p msg',
            cs:   cryptographSignature,

            to:   toPubpem,
            from: keys.pubpem
        },
        '/json',
        function(jReply){
            p(jReply);
        });

        myutil.showInfo('info', 'encry.. message send out to srv: ' + 
                JSON.stringify(cryptographSignature));

    });
}

module.exports.talk = talk;
module.exports.encryptMsg = encryptMsg;
