
/*
 * do transactions
 *
 */

var _ = require('lodash');

//var Taffy = require('taffy');
//var Taff= Taffy({'start.time': Date.now()}); // add an db for all data
var Nedb = require('nedb/browser-version/out/nedb.min.js');
var ndb = new Nedb();
ndb.insert({a:1, b:2}, function(err){console.log('ndb err', err);});
window.ndb = ndb;

var forge = require('./forge.js');

var myutil = require('../util.js');
var listUserPem = require('./listpubkey.js');
var trans = require('./transac.js'); //?
var localKeys = require('./getkey.js');

var map = require('./map.js');

var button = require('./button.js');
var talk = require('./talk.js');
var kv = require('./kvinput.js');

var balance = require('./balance.js');
window.ba = balance;

var p = console.log;


localKeys.getKey(function(err, key){
    if(err) { return p(err); }
    myutil.showInfo('info', 'get kay pair...');

    var Dat = {}; // Data
    var Fun = {}; // Functions

    //Dat.key = key;
    window.dat = Dat; window.fun = Fun; //debug

    // variables
    var _payee, _transaction;

    window.key = key;
    Dat.privateKey = key.privateKey;
    Dat.publicKey  = key.publicKey;
    Dat.pripem = key.pripem;
    Dat.pubpem = key.pubpem;

    myutil.showInfo('info', Dat.pubpem);  // show public key in browser

    // init map
    //var mapDiv = document.getElementById("map");
    p('google map ... fetching ...');
    map.fetchGoogleMapApi(function(){
        Dat['map.object']= map.createMap(document.getElementById("map"), 300, {});
        myutil.showInfo('info', 'Google Map API ready');
        p('google map API ... fetched, bc3src');
    });

    function setPayee(pem){
        _payee = pem;
        Dat.payee = pem;
        window.payee = pem; //test
    }



    document.getElementById('newKey').onclick = function(e){
        // ?no delete the old pubkey
        forge.genkey(function(err, key){
            Dat.privateKey = key.privateKey;
            Dat.publicKey  = key.publicKey;
            Dat.pripem = key.pripem;
            Dat.pubpem = key.pubpem;
            localKeys.setKeyPair(key); // only pem
            balance.setBalanceToLocalStore(0.0);
            myutil.showInfo('info', Dat.pubpem);
        })
    };

    document.getElementById('state').onclick = function(e){
        myutil.showInfo('info', JSON.stringify(
                    _.pick(Dat, ['pubpem', 'payee']),
                    null, 4) 
                );
    };
    document.getElementById('clearPayee').onclick = function(e){
        Dat.payee = null;
        _payee = null;
    };
    document.getElementById('keyValue').onclick = function(e){
        kv.kvInput(function(err, k, v){
            p('back to callback');
            myutil.post({
                action: 'add key value',
                pubpem: Dat.pubpem,
                key: k,
                value: v
            },
            '/json',
            function(jReply){
                p('k,v, add ', jReply);
            });

        });
    };
    document.getElementById('balance').onclick = function(e){
        // check my balance
        var ba = balance.getBalanceFromLocalStore();
        myutil.showInfo('info', ba );
        p('balance', ba);
    };
    document.getElementById('privateKey').onclick = function(e){
        myutil.showInfo('info', Dat.pripem );
    };
    document.getElementById('publicKey').onclick = function(e){
        myutil.showInfo('info', Dat.pubpem );
    };
    document.getElementById('publish').onclick = function(e){
        myutil.post({
            action: 'add public key',
            pubpem: Dat.pubpem
        },
        '/json',
        function(jReply){
            p(jReply);
        });
    };
    document.getElementById('findKey').onclick = function(e){
        myutil.post({
            action: 'find public keys',
            pubpem: Dat.pubpem
        },
        '/json',
        function(jReply){
            p('number of keys: ', Object.keys(jReply).length);
            // list pem and make it clickable
            listUserPem.listUserPem(jReply, 'info', setPayee);
        });
    };
    document.getElementById('signTransaction').onclick = function(e){
        if(_transaction){
            var signed = balance.signTransaction(key.privateKey, _transaction);
            p('signed.signatures');
            p(signed.signatures);

            var data = signed.dataOnly();
            ndb.insert(data);
            data['action'] = "broadcast transaction";

            myutil.post(data, '/json',
            function(jReply){
                p('transaction post ed? ', jReply);
            });
        }
    };
    document.getElementById('showTransaction').onclick = function(e){
        myutil.showInfo('info', JSON.stringify(_transaction, null, 4));
    };
    document.getElementById('makeTransaction').onclick = function(e){
        var message = document.getElementById('textBox').value || '0.0 Money Silent';
        if(! _payee) { _payee = key.pubpem; }
        _transaction = trans.makeTransaction(0, key.pubpem, _payee, message);
        myutil.showInfo('info', JSON.stringify(_transaction, null, 4));
        //p(_transaction);
    };
    document.getElementById('talk').onclick = function(e){
        talk.talk(e, Dat.pubpem, Dat['map.object']);
    }
    document.getElementById('mapup').onclick = function(e){
        var mapDiv = document.getElementById("map");

        if( ! Dat['map.object']){
            p('no map object, reload google api!');
            map.fetchGoogleMapApi(function(){
                if(typeof google != 'undefined'){
                    Dat['map.object']= map.createMap(mapDiv, 300, {});
                    myutil.showInfo('info', 'Google Map API ready');
                    p('google map API ... loaded now');
                }else{
                    p('google: undefined ');
                }
            });

        }

        var info = document.getElementById('info');
        info.insertBefore(mapDiv, info.firstChild);
    };
});








function sha256hex(text){
    var md = forge.md.sha256.create();
    md.update(text);
    return md.digest().toHex();
}



// for test
var $ = require('jquery');
window.kv = kv;
window.$ = $;
//setTimeout(function(){
//    p('5000');
//    kv.kvInput(function(err, k,v){
//        p(k, v);
//    });
//},5000);

