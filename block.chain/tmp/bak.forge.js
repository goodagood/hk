
/*
 * Give basic functions of generate keys, signing, hash
 *
 */

var forge = require('node-forge');

var rsa = forge.pki.rsa;

const p = console.log;


// generate an RSA key pair synchronously
// *NOT RECOMMENDED*: Can be significantly slower than async and may block
// JavaScript execution. Will use native Node.js 10.12.0+ API if possible.
var kpOne = rsa.generateKeyPair({bits: 2048, e: 0x10001});
var kpTwo = null;
rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
    if(err){console.log(err); return;}

    kpTwo = keypair;
    // keypair.privateKey, keypair.publicKey
});

var privateKey = kpOne.privateKey;
var publicKey  = kpOne.publicKey;


// give printable string
var pripem = forge.pki.privateKeyToPem(privateKey);
var pubpem = forge.pki.publicKeyToPem(publicKey);

function genkey(cb){
    var kp;
    rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
        if(err){cb(err); return;}

        keypair.pripem = forge.pki.privateKeyToPem(keypair.privateKey);
        keypair.pubpem = forge.pki.publicKeyToPem(keypair.publicKey);
        cb(null, keypair);
    });
}


//// how to hash sha256
//var md = forge.md.sha256.create();
//md.update('The quick brown fox jumps over the lazy dog');
//console.log(md.digest().toHex());
// output: d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592

//// how to sign the md
// ? DigestInfo DER-encoded bytes
// ? defaults to RSASSA PKCS#1 v1.5
//var sig = privateKey.sign(md);
//var sigHex64 = forge.util.encode64(sig);

// verify data with a public key
// (defaults to RSASSA PKCS#1 v1.5)
// var verified = publicKey.verify(md.digest().bytes(), signature);


function hashSign2Hex(key, text){
    // think the key is RSA private key
    var md = forge.md.sha256.create();
    md.update(text);
    var sig = key.sign(md);
    var sigHex64 = forge.util.encode64(sig);
    return sigHex64;
}


/*

// encrypt data with a public key (defaults to RSAES PKCS#1 v1.5)
var encrypted = publicKey.encrypt(bytes);

// decrypt data with a private key (defaults to RSAES PKCS#1 v1.5)
var decrypted = privateKey.decrypt(encrypted);

// encrypt data with a public key using RSAES PKCS#1 v1.5
var encrypted = publicKey.encrypt(bytes, 'RSAES-PKCS1-V1_5');

// decrypt data with a private key using RSAES PKCS#1 v1.5
var decrypted = privateKey.decrypt(encrypted, 'RSAES-PKCS1-V1_5');

// encrypt data with a public key using RSAES-OAEP
var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP');

// decrypt data with a private key using RSAES-OAEP
var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP');

// encrypt data with a public key using RSAES-OAEP/SHA-256
var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP', {
  md: forge.md.sha256.create()
});

// decrypt data with a private key using RSAES-OAEP/SHA-256
var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
  md: forge.md.sha256.create()
});

// encrypt data with a public key using RSAES-OAEP/SHA-256/MGF1-SHA-1
// compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP', {
  md: forge.md.sha256.create(),
  mgf1: {
    md: forge.md.sha1.create()
  }
});

// decrypt data with a private key using RSAES-OAEP/SHA-256/MGF1-SHA-1
// compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
  md: forge.md.sha256.create(),
  mgf1: {
    md: forge.md.sha1.create()
  }
});

//*/
//


/*
 * Block, blockchain, hash
 *
 */

function makeBlock (timestamp=null, data=null, previousHash=null){
    let obj = {};
    obj.previousHash = previousHash;
    obj.timestamp = timestamp || new Date().getTime();  // new Date().getTime()
    obj.transactionRoot = {};
    obj.nonce = null;
    obj.paymentAccount = 'Face to face, my paypal account...';
    obj.data = data;
    obj.talk = "Money/Block can talk";

    obj.hash = null;


    obj.latlng = null;
    obj.getLatlng = function(){
        getLatlng(function(err, pos){
            p('get lat lng', err, pos);
            if (err){
                obj.latlng = {};
                return;
            }

            p(pos);
            obj.latlng = pos;
        });
    };

    obj.repr = function(){
        var o = {};
        o['previousHash']  = obj.previousHash;
        o['timestamp']     = obj.timestamp;
        o['paymentAccount']= obj.paymentAccount;
        o['data']          = obj.data;
        o['talk']          = obj.talk;
        o['latlng']        = obj.latlng;       
        
        return JSON.stringify(o, null, 4); // 4 space indent
    }

    obj.calculateHash = function() {
        obj.hash = sha256hex( obj.repr());
        return obj.hash;
    };
    obj.hash = obj.calculateHash();

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
        }, function(err) {
            p(err);
            cb(err); // err is true
        });
    }else{
        cb('!navigator.geolocation');
    }
}

var b = makeBlock(new Date().getTime(), "Genesis Block");


function sha256hex(text){
    var md = forge.md.sha256.create();
    md.update(text);
    return md.digest().toHex();
}


module.exports.sha256hex = sha256hex;
module.exports.genkey = genkey;
module.exports.hashSign2Hex = hashSign2Hex;

/*
p(typeof window == "undefined" )
if(typeof window == "undefined" ){
    //testing in console
}
*/
