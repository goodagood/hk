
/*
 * Give basic functions of generate keys, signing, hash
 *
 */

var forge = require('node-forge');
var myutil= require('../util.js');

var rsa = forge.pki.rsa;

const p = console.log;


// generate an RSA key pair synchronously
// *NOT RECOMMENDED*: Can be significantly slower than async and may block
// JavaScript execution. Will use native Node.js 10.12.0+ API if possible.
var kpOne = rsa.generateKeyPair({bits: 2048, e: 0x10001});
var kpTwo = rsa.generateKeyPair({bits: 2048, e: 0x10001});

var privateKey = kpOne.privateKey;
var publicKey  = kpOne.publicKey;


// give printable string
var pripem = forge.pki.privateKeyToPem(privateKey);
var pubpem = forge.pki.publicKeyToPem(publicKey);
myutil.showInfo('info', pubpem);  // show public key in browser

document.getElementById('showPubkey').onclick = function(e){
    myutil.showInfo('info', pubpem);
};
document.getElementById('showPrikey').onclick = function(e){
    myutil.showInfo('info', pripem);
};


// how to hash sha256
var md = forge.md.sha256.create();
md.update('The quick brown fox jumps over the lazy dog');
console.log(md.digest().toHex());
// output: d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592

// how to sign the md
var sig = privateKey.sign(md);
var sigHex64 = forge.util.encode64(sig);


function sliceObj(obj) {
    var o = {}
    , keys = [].slice.call(arguments, 1);
    for (var i=0; i<keys.length; i++) {
        if (keys[i] in obj) o[keys[i]] = obj[keys[i]];
    }
    return o;
}

/*
 *

// generate an RSA key pair asynchronously (uses web workers if available)
// use workers: -1 to run a fast core estimator to optimize # of workers
// *RECOMMENDED*: Can be significantly faster than sync. Will use native
// Node.js 10.12.0+ or WebCrypto API if possible.
//rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
  // keypair.privateKey, keypair.publicKey
//});

// generate an RSA key pair in steps that attempt to run for a specified period
// of time on the main JS thread
var state = rsa.createKeyPairGenerationState(2048, 0x10001);
var step = function() {
  // run for 100 ms
  if(!rsa.stepKeyPairGenerationState(state, 100)) {
    setTimeout(step, 1);
  }
  else {
    // done, turn off progress indicator, use state.keys
    p(state);
  }
};
// turn on progress indicator, schedule generation to run
setTimeout(step);


// sign data with a private key and output DigestInfo DER-encoded bytes
// (defaults to RSASSA PKCS#1 v1.5)
var md = forge.md.sha1.create();
md.update('sign this', 'utf8');
var signature = privateKey.sign(md);
//p(md, signature);

// verify data with a public key
// (defaults to RSASSA PKCS#1 v1.5)
var verified = publicKey.verify(md.digest().bytes(), signature);
 *
*/


// sign data using RSASSA-PSS where PSS uses a SHA-1 hash, a SHA-1 based
// masking function MGF1, and a 20 byte salt
var md = forge.md.sha1.create();
md.update('sign this', 'utf8');
var pss = forge.pss.create({
  md: forge.md.sha1.create(),
  mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
  saltLength: 20
  // optionally pass 'prng' with a custom PRNG implementation
  // optionalls pass 'salt' with a forge.util.ByteBuffer w/custom salt
});
var signature = privateKey.sign(md, pss);

/*

// verify RSASSA-PSS signature
var pss = forge.pss.create({
  md: forge.md.sha1.create(),
  mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
  saltLength: 20
  // optionally pass 'prng' with a custom PRNG implementation
});
var md = forge.md.sha1.create();
md.update('sign this', 'utf8');
publicKey.verify(md.digest().getBytes(), signature, pss);

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

document.getElementById('block').onclick = function(e){
    myutil.showInfo('info', b.repr());
}
document.getElementById('hash').onclick = function(e){
    myutil.showInfo('info', b.hash);
}

document.getElementById('doBlockchain').onclick = function(e){
    //myutil.showInfo('info', b.hash);
    var text = document.getElementById('textBox').value || 'no user input';
    p(text)

    var bloc = makeBlock(new Date().getTime(), text);
    myutil.showInfo('info', JSON.stringify(bloc.repr(), null, 4));

    b = bloc;
    window.b = bloc;
}

function sha256hex(text){
    var md = forge.md.sha256.create();
    md.update(text);
    return md.digest().toHex();
}


if(window){
    window.f = forge;
    window.b = b;
    window.pri = privateKey;
    window.pub = publicKey;
    window.md = md;
    b.getLatlng();
    console.log('ready, f,b,pri,pub');
}
