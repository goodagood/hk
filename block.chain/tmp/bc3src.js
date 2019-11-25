
/*
 * do transactions
 *
 */

var myutil = require('../util.js');
var forge = require('./forge.js');

var listUserPem = require('./listpubkey.js');
var trans = require('./transac.js');

const p = console.log;


forge.genkey(function(err, key){
    if(err) { return p(err); }
    p('generate key pair');
    myutil.showInfo('info', 'generate kay pair...');

    // variables
    var _payee;

    window.key = key;
    var privateKey = key.privateKey;
    var publicKey  = key.publicKey;
    var pripem = key.pripem;
    var pubpem = key.pubpem;
    myutil.showInfo('info', pubpem);  // show public key in browser

    function setPayee(pem){
        _payee = pem;
        window.payee = pem; //test
    }

    myutil.post({
        action: 'add public key',
        pubpem: pubpem
    }, '/json');


    function transfer(payer_pem, payee_pem, message=null){
        if(!message){
            message = document.getElementById('textBox').value || 'Money Silent';
        }
        var tr = trans.makeTransaction(0, payer_pem, payee_pem, message);
        window.tranx = tr; //debug
        p(tr.print());

        //k1.privateKey.sign();
        var sig = forge.hashSign2Hex(key.privateKey, JSON.stringify(tr.extract()));
        p(sig);
        window.sig = sig; //debug
    }

    document.getElementById('newPubKey').onclick = function(e){
        // delete the old pubkey
        //myutil.showInfo('info', pubpem);
        p('to make new key, delete storage');
    };
    document.getElementById('time').onclick = function(e){
        myutil.showInfo('info', new Date().toString() + '...');
    };
    document.getElementById('publish').onclick = function(e){
        myutil.post({
            action: 'add public key',
            pubpem: pubpem
        },
        '/json',
        function(jReply){
            p(jReply);
        });
    };
    document.getElementById('findKey').onclick = function(e){
        myutil.post({
            action: 'find public keys',
            pubpem: pubpem
        },
        '/json',
        function(jReply){
            p('number of keys: ', Object.keys(jReply).length);
            window.myfind = jReply;
            listUserPem.listUserPem(jReply, 'info', setPayee);
            //for(let k in jReply){
            //    myutil.showInfo('info', k);
            //}
        });
    };
    document.getElementById('transaction').onclick = function(e){
        p('to make new key, delete storage');
        if(_payee){
            transfer(0, key.pubpem, _payee, 'test debug');
        }
    };
});





function getLatlng(cb){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(pos);

            return cb(null, pos);

            //putInfo(map, pos, text);
            // This change center to browser's pos
            //map.setCenter(pos);
        }, function(err) {
            p(err);
            cb(err); // err is true
        });
    }else{
        cb('!navigator.geolocation');
    }
}




function sha256hex(text){
    var md = forge.md.sha256.create();
    md.update(text);
    return md.digest().toHex();
}


if(window){
}
