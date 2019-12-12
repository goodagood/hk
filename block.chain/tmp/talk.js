


var myutil = require('../util.js');

var forge = require('./forge.js');
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


//var quickEncrypt = require('quick-encrypt');
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

        //var cryptographSymSignature = forge.talkEncrypt(keys.privateKey, toPubpem, msg)
        //
        //{
        //    cryptograph: hex64-encoded-encrypted,
        //    signature: sig
        //}


        //var publicKey = forge.pki.publicKeyFromPem(toPubpem);
        //var msgJson = JSON.stringify(msg);
        //var cipherText = quickEncrypt.encrypt(msgJson, publicKey);

        var cipherText = forge.quickEncMsg(msg, toPubpem);


        
        myutil.post({
            action: 'sym encrypted signed p2p msg',
            cipherText:   cipherText,

            to:   toPubpem,
            from: keys.pubpem
        },
        '/json',
        function(jReply){
            p(jReply);
        });

        myutil.showInfo('info', 
                `encry.. message send out to srv:  
                ${cipherText.slice(0,38)} ... ${cipherText.length}
                `);

    });
}

module.exports.talk = talk;
module.exports.encryptMsg = encryptMsg;
