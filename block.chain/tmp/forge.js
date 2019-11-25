
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


module.exports.sha256hex = sha256hex;
module.exports.genkey = genkey;
module.exports.hashSign2Hex = hashSign2Hex;

/*
p(typeof window == "undefined" )
if(typeof window == "undefined" ){
    //testing in console
}
*/
