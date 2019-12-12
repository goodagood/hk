
/*
RC2
Examples
*/


var forge = require('node-forge');


someBytes = `
By themselves the primitive operations do not necessarily provide any security.
The concept of a cryptographic scheme is to define higher level algorithms or
uses of the primitives so they achieve certain security goals.

There are two schemes for encryption and decryption:

RSAES-OAEP: improved Encryption/decryption Scheme; based on the Optimal
    Asymmetric Encryption Padding scheme proposed by Mihir Bellare and Phillip
    Rogaway.
RSAES-PKCS1-v1_5: older encryption/decryption scheme as first standardized in
version 1.5 of PKCS #1.


`;

// generate a random key and IV
var key = forge.random.getBytesSync(16);
console.log(`key ${typeof key}  hex: `, forge.util.encode64(key));
var iv = forge.random.getBytesSync(8);

// encrypt some bytes
var cipher = forge.rc2.createEncryptionCipher(key);
cipher.start(iv);
cipher.update(forge.util.createBuffer(someBytes));
cipher.finish();
var encrypted = cipher.output;
// outputs encrypted hex
console.log(encrypted.toHex());

//// decrypt some bytes
//var cipher = forge.rc2.createDecryptionCipher(key);
//cipher.start(iv);
//cipher.update(encrypted);
//cipher.finish();
//// outputs decrypted hex
//console.log(cipher.output.toHex());
//console.log(cipher.output);
