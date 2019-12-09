

var myutil = require('../util.js');
var trans = require('./transac.js');
var forge = require('./forge.js');


function getBalanceFromLocalStore(){
    var store = myutil.getLocalStore();
    if (!store) return null;

    var balanceStr = store.getItem('balance');
    var balance = parseFloat(balanceStr);

    return balance;
}


function setBalanceToLocalStore(ba){
    var store = myutil.getLocalStore();
    if (!store) return null;

    store.setItem('balance', ba);
    return ba;
}

function init(){
    if(getBalanceFromLocalStore() == null){
        setBalanceToLocalStore(0);
    }
}


function signTransaction(privateKey, transaction ){
    var amount = parseFloat(transaction.amount);

    var before = getBalanceFromLocalStore();
    var now    = before - amount;
    console.log('set balance ', now);
    setBalanceToLocalStore(now);

    if(now <= 0.0){
        transaction.negative = true;
    }

    // transaction.dataOnly??
    var sig = forge.hashSign2Hex(privateKey, JSON.stringify(transaction.extract()));
    transaction.signatures.push(sig);

    return transaction;
}


function selfTransfer(myPem, amount, message){
    var milli = Date.now();
    var data = {
        amount: amount,
        message: message
    };

    var tr = trans.makeTransaction(milli, myPem, myPem, data);
    //p(tr.print());


    //var sig = forge.hashSign2Hex(key.privateKey, JSON.stringify(tr.extract()));

    //tr.signatures.append({pem: myPem, sig: sig});
    
    return tr;
}

// function receive, reject, sync to server, server list 


module.exports.getBalanceFromLocalStore = getBalanceFromLocalStore;
module.exports.setBalanceToLocalStore   = setBalanceToLocalStore;
module.exports.signTransaction   = signTransaction;
module.exports.selfTransfer   = selfTransfer;


if(typeof window === 'undefined'){
    var myforge = require('./forge.js');
    var nforge = require('node-forge');

    var kpi = nforge.kpi;

    var p = console.log;

    var k;

    myforge.genkey(function(err,key){
        //p(key);

        k = key;

        
        var trans = selfTransfer(key.pubpem, 38, 'test test'  );

        var sig = myforge.hashSign2Hex(key.privateKey, JSON.stringify(trans.extract()));
        p(sig);
        var veri = myforge.hashVerify(key.publicKey, JSON.stringify(trans.extract()) , sig);
        p(veri);
        p( 
            myforge.hashVerify(key.publicKey, JSON.stringify(trans.extract()) + "." , sig)
         );
    });

}
