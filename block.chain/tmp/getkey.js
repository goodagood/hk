


var forge = require('./forge.js');
var myutil = require('../util.js');

//const p = console.log;

// names
const publicKey = 'public.key,pem';
const privateKey = 'private.key,pem';


// move to util.js
function getLocalStore(){
    const type = "localStorage";
    if(myutil.storageAvailable(type)){
        //p('available');
        var store = window[type];
        return store;
    }else{
        return null;
    }
}


function getKeyPair(){
    var store = myutil.getLocalStore();
    if (!store) return null;

    var o = {};
    o.pripem = store.getItem('private.key.pem');
    o.pubpem = store.getItem('public.key.pem');

    return o;
}


function setKeyPair(kp){
    var store = myutil.getLocalStore();
    if (!store) return null;

    store.setItem('private.key.pem', kp.pripem);
    store.setItem('public.key.pem', kp.pubpem);
}


function getKey(callback){
    var o = getKeyPair();
    if(o.pripem && o.pubpem){
        return callback(null, o);
    }

    forge.genkey(callback);
}



module.exports.getKey = getKey;
module.exports.setKeyPair = setKeyPair;
