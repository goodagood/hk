
var forge = require('./forge.js');
var trans = require('./transac.js');

const p = console.log;

var kone;
forge.genkey(function(err, k1){
    if(err) { return p(err);}

    p(k1.pripem);

    forge.genkey(function(err, k2){
        if(err) { return p(err);}

        p(k2.pripem);
        if(k1 == k2) p('k1 == k2');

        var tr = trans.makeTransaction(0, k1.pubpem, k2.pubpem, 'test 2 keys');
        p(tr.print());

        //k1.privateKey.sign();
        var sig = forge.hashSign2Hex(k1.privateKey, JSON.stringify(tr.extract()));
        p(sig);

    });

});
