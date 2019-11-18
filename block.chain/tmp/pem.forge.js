
// RSA with node-forge
"use strict";

// npm install node-forge
const forge = require("node-forge");

new Promise((f, r) => forge.pki.rsa.generateKeyPair(
    2048, (err, pair) => err ? r(err) : f(pair)))
    .then(keypair => {
        const priv = keypair.privateKey;
        const pub = keypair.publicKey;

        // PEM serialize: public key
        const pubPem  = forge.pki.publicKeyToPem(pub);
        console.log("Public Key PEM:", pubPem);
        const pub2 = forge.pki.publicKeyFromPem(pubPem);

        // PEM serialize: private key
        const privPem  = forge.pki.privateKeyToPem(priv);
        console.log("Private Key PEM:", privPem);
        const priv2 = forge.pki.privateKeyFromPem(privPem);

        // make public key from private key 
        const pub3 = forge.pki.rsa.setPublicKey(priv2.n, priv2.e);

        // enc/dec with Obj Pub and PEM Priv
        console.log("\n[Enc by Obj/Dec by PEM]");
        const encrypted = pub.encrypt("Hello World!");
        console.log("encrypted(by Obj):", forge.util.encode64(encrypted));
        const decrypted = priv2.decrypt(encrypted);
        console.log("decrypted(by PEM):", decrypted);

        // enc/dec with PEM Pub and Obj Priv 
        console.log("\n[Enc by PEM/Dec by Obj]");
        const encrypted2 = pub2.encrypt("Hello World!");
        console.log("encrypted(by PEM):", forge.util.encode64(encrypted2));
        const decrypted2 = priv.decrypt(encrypted2);
        console.log("decrypted(by Obj):", decrypted2);

        // enc/dec with Pub fron PEM Priv and Obj Priv 
        console.log("\n[Enc by Priv PEM/Dec by Obj]");
        const encrypted3 = pub3.encrypt("Hello World!");
        console.log("encrypted(by Priv):", forge.util.encode64(encrypted3));
        const decrypted3 = priv.decrypt(encrypted3);
        console.log("decrypted(by Obj):", decrypted3);

        return keypair;
    }).catch(err => console.log(err));

