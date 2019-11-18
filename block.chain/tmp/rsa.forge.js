

// RSA with node-forge
"use strict";

// npm install node-forge
const forge = require("node-forge");

new Promise((f, r) => forge.pki.rsa.generateKeyPair(
    2048, (err, pair) => err ? r(err) : f(pair)))
    .then(keypair => {
        console.log("[Enc/Dec]");
        const priv = keypair.privateKey;
        const pub = keypair.publicKey;

        const encrypted = pub.encrypt("Hello World!");
        console.log("encrypted:", forge.util.encode64(encrypted));
        
        const decrypted = priv.decrypt(encrypted);
        console.log("decrypted:", decrypted);
        return keypair;
    }).then(keypair => {
        console.log("[Sign/Verify]");
        const priv = keypair.privateKey;
        const pub = keypair.publicKey;        
        
        const md = forge.md.sha256.create();
        md.update("Hello World!");
        const data = md.digest().bytes();
        const sign = priv.sign(md);
        console.log("sign:", forge.util.encode64(sign));
        
        console.log("verify:", pub.verify(data, sign));
        return keypair;
    }).then(keypair => {
        console.log("[Sign/Verify with PSS]");
        const priv = keypair.privateKey;
        const pub = keypair.publicKey;        
        
        const md = forge.md.sha256.create();
        md.update("Hello World!");
        const data = md.digest().bytes();

        // Alice: sign
        const pss1 = forge.pss.create({
            md: forge.md.sha256.create(),
            mgf: forge.mgf.mgf1.create(forge.md.sha256.create()),
            saltLength: 28,
        });
        var sign = priv.sign(md, pss1);
        console.log("sign:", forge.util.encode64(sign));

        // Bob: verify
        const pss2 = forge.pss.create({
            md: forge.md.sha256.create(),
            mgf: forge.mgf.mgf1.create(forge.md.sha256.create()),
            saltLength: 28,
        });
        console.log("verify:", pub.verify(data, sign, pss2));
        return keypair;
    }).then(keypair => {
        console.log("[Key Exchange]");
        const priv = keypair.privateKey;
        const pub = keypair.publicKey;        

        // Alice: shared key generation
        const kdf11 = new forge.kem.kdf1(forge.md.sha256.create());
        const kem1 = forge.kem.rsa.create(kdf11);
        const share = kem1.encrypt(pub, 16);
        const keyenc = share.encapsulation;
        console.log("shared key:", forge.util.encode64(share.key));
        console.log("encrypted shared key", forge.util.encode64(keyenc));

        // Alice: enc data
        const iv = forge.random.getBytesSync(12);
        const cipher = forge.cipher.createCipher("AES-GCM", share.key);
        cipher.start({iv: iv});
        cipher.update(forge.util.createBuffer("Hello World!"));
        cipher.finish();
        const enc = cipher.output.bytes();
        const tag = cipher.mode.tag.bytes();
        console.log("iv:", forge.util.encode64(iv));
        console.log("cipher tag:", forge.util.encode64(tag));
        console.log("encrypted data:", forge.util.encode64(enc));

        // Bob: dec shared key
        const kdf12 = new forge.kem.kdf1(forge.md.sha256.create());
        const kem2 = forge.kem.rsa.create(kdf12);
        const keydec = kem2.decrypt(priv, keyenc, 16);
        console.log("decrypted shared key", forge.util.encode64(keydec));

        // Bob: dec data
        const decipher = forge.cipher.createDecipher("AES-GCM", keydec);
        decipher.start({iv: iv, tag: tag});
        decipher.update(forge.util.createBuffer(enc));
        const ok = decipher.finish();
        console.log("decrypted data:", decipher.output.bytes());
        
        return keypair;
    }).catch(err => console.log(err));

