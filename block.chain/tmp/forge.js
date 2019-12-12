
/*
 * Give basic functions of generate keys, signing, hash
 *
 */

var forge = require('node-forge');

var rsa = forge.pki.rsa;

const p = console.log;


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

function hashVerify(pubKey, text, signature){

    var sig = forge.util.decode64(signature);
    var md = forge.md.sha256.create();
    md.update(text);
    return pubKey.verify(md.digest().bytes(), sig);
}

function signTrans(key, transactionObj){

    var sig = hashSign2Hex(key.privateKey, JSON.stringify(transactionObj.extract()));
    transactionObj.signature.append(sig);

    p(sig);
    return sig;
}

function verifyTrans(transactionObj){
    var pubpem = transactionObj.from;
    var publicKey = forge.pki.publicKeyFromPem(pubpem);

    var src = JSON.stringify(trans.extract());

    var len = transactionObj.signature.length;
    for(let i=0; i<len; i++){
        var sig = transactionObj.signature[i];
        var veri = hashVerify(key.publicKey, src, sig);
        if(veri) { return 'yes, verified on ' + i.toString(); }
    }

    return false;
}


//


/*
 * Block, blockchain, hash
 *
 */




function sha256hex(text){
    var md = forge.md.sha256.create();
    md.update(text);
    return md.digest().toHex();
}


// get public key from private pem
function publicKeyFromPrivatePem(pem){
    privateKey = forge.pki.privateKeyFromPem(pem)
    publicKey  = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e)
    //console.log(forge.pki.publicKeyToPem(publicKey))

    return {'private': privateKey, 'public':publicKey};
}

function fingerprint(publicKey){
    // hex, delimiter :,  string
    if(typeof publicKey === 'string'){
        publicKey = forge.pki.publicKeyFromPem(publicKey);
    }
    return forge.pki.getPublicKeyFingerprint(publicKey, {encoding: 'hex', delimiter: ':'});
}


function calculateKey(o){
    o.publicKey  = forge.pki.publicKeyFromPem(o.pubpem);
    o.privateKey = forge.pki.privateKeyFromPem(o.pripem);
    return o;
}

function randomArray(len=10){
    var a = [];
    for(var i = 0; i < len; i++){
        a.push(Math.random());
    }
    return a;
}


function talkEncrypt(privateKey, pubpem, msg){
    // pubpem is receiver's pubpem

    //var msg = {
    //    text:   text,
    //    pos:    pos
    //    milli:  
    //};

    if(typeof msg.randomArray === 'undefined'){
        p('random array');
        msg.randomArray = randomArray();
    }

    var msgJson = JSON.stringify(msg);
    //p(msg)

    // generate a random key and IV
    var symmetry = forge.random.getBytesSync(16);
    var iv = forge.random.getBytesSync(8);

    var cipher = forge.rc2.createEncryptionCipher(symmetry);
    cipher.start(iv);
    cipher.update(forge.util.createBuffer(msgJson));
    cipher.finish();
    var encrypted = cipher.output;
    var hex = encrypted.toHex();

    // outputs encrypted hex
    console.log(hex.slice(0,128));

    var symmetryHex = forge.util.encode64(symmetry);

    var publicKey = forge.pki.publicKeyFromPem(pubpem);
    p('pem ..');
    // use public key to encrypt symmetryHex
    var encryptedSym = publicKey.encrypt(symmetryHex);
    var symEncrypt64 = forge.util.encode64(encryptedSym);

    var sig = privateKey.sign(symEncrypt64);
    var sigE64 = forge.util.encode64(sig);
    p(`sig len ${sig.length}`);
    p(sigE64);

    return {
        // msg json stringigy, symmetric encrypted, toHex
        hex: hex,  
        // symmetric key, public key encrypted, encode64
        symmetricHex: symEncrypt64, 
        //
        sig64: sigE64
    };
}

function talkDecrypt(prikey, cryptoHex64){
    var cryptoJstr = forge.util.decode64(cryptoHex64);
    var jstr  = prikey.decrypt(cryptoJstr)
    var msgObj = JSON.parse(jstr);
    return msgObj;
}

var quickEncrypt = require('quick-encrypt');
function quickEncMsg(msg, pubpem){
    //var publicKey = forge.pki.publicKeyFromPem(pubpem);
    var msgJson = JSON.stringify(msg);
    var cipherText = quickEncrypt.encrypt(msgJson, pubpem);
    return cipherText;
}

// no test, 1210
function quickDecMsg(cipherText, privateKey){
    let decryptedText = quickEncrypt.decrypt( cipherText, privateKey);
    return decryptedText;
}


module.exports.sha256hex = sha256hex;
module.exports.genkey = genkey;
module.exports.hashSign2Hex = hashSign2Hex;
module.exports.hashVerify = hashVerify;
module.exports.fingerprint = fingerprint;
module.exports.publicKeyFromPrivatePem = publicKeyFromPrivatePem;
module.exports.verifyTrans = verifyTrans;
module.exports.calculateKey = calculateKey;
module.exports.talkEncrypt = talkEncrypt;
module.exports.talkDecrypt = talkDecrypt;
module.exports.quickEncMsg = quickEncMsg;
module.exports.quickDecMsg = quickDecMsg;

/*
if(window){
    window.f = forge;
}
*/
