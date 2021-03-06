
var kk = require('./tmp/kp.a.js'); //!

//var keypair = require('keypair');

var p = console.log;

//var pair = keypair();

const SHA256 = require('js-sha256')


function makeBlock (timestamp=null, data=null, previousHash=null){
    let obj = {};
    obj.previousHash = previousHash;
    obj.timestamp = timestamp;  // new Date().getTime()
    obj.txRoot = {};
    obj.nonce = null;
    obj.paymentAccount = 'Face to face, my paypal account...';
    obj.data = null;
    obj.talk = "Block can talk";

    obj.repr = JSON.stringify(obj, null, 4); // 4 space indent

    obj.calculateHash = function() {
        return SHA256( obj.repr).toString();
    };
    obj.hash = obj.calculateHash();

    obj.latlng = {};
    obj.getLatlng = function(){
        getLatlng(function(err, pos){
            if (err){
                obj.latlng = {};
                return;
            }

            obj.latlng = pos;
        });
    };

    return obj;
}


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
        }, function() {
            cb(true); // err is true
        });
    }else{
        cb('!navigator.geolocation');
    }
}


function showInfo(iddiv, text){
        var paragraph = document.createElement("pre");
        var textnode = document.createTextNode(text);
        paragraph.appendChild(textnode);

        var where = document.getElementById(iddiv);
        where.insertBefore(paragraph, where.firstChild);
}




//// browser side key pair, ? is why not rsa 1024?
////const keyPair = await crypto.subtle.generateKey..
////const publicKey = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
////const privateKey = await crypto.subtle.exportKey("jwk", keyPair.privateKey);
////
//const keyPair = crypto.subtle.generateKey(
//    {
//        name: "RSA-OAEP",
//        modulusLength: 4096,
//        publicExponent: new Uint8Array([1, 0, 1]),
//        hash: "SHA-256"
//    },
//    true,
//    ["encrypt", "decrypt"]
//);
//const publicKey = crypto.subtle.exportKey("jwk", keyPair.publicKey);
//const privateKey = crypto.subtle.exportKey("jwk", keyPair.privateKey);



// console test
if(require.main == module){
    p('require main = module');
    var b = makeBlock(new Date().getTime(), "Genesis Block");
    p(b.repr);
    p(b.hash)
    return;
}
var b = makeBlock(new Date().getTime(), "Genesis Block");

document.getElementById('block').onclick = function(e){
    showInfo('info', b.repr);
}
document.getElementById('hash').onclick = function(e){
    showInfo('info', b.hash);
}

window.block = b;


//module.exports.makeBlock = makeBlock;
//module.exports.keypair = keypair;

// only during debugging
window.me = module.exports;

