

/*
 * Better to use normal DB when data grow up.
 */

const _ = require('lodash');

const p = console.log;

const Transaction = [];

function pubkeyDb(){
    const Pubkey = {};

    var obj = new Object();

    obj.Pubkey = Pubkey;

    function keyInfo (){
        var k = Object.keys(Pubkey);
        p(`Pubkey has ${k.length} keys`);
    };
    //obj.keyInfo = keyInfo;

    obj.addKey = function addKey(json){

        const pubKeyPem = json['pubpem'];

        var obj = _.omit(json, ['action', ]);

        Pubkey[pubKeyPem] = obj;

        p('add obj: ', obj);
        keyInfo();
        return {addKey: 'add a public key in simplest pubkeyDb'};
    }

    obj.findKeys = function findKeys(json){
        const pubKeyPem = json['pubKeyPem'];

        var allkeys = _.omit(Pubkey, [pubKeyPem]);

        // omit more accordingly ...

        return allkeys;
    }

    return obj;
}

const Pub   = pubkeyDb();


function jsonAction(json){
    // json is an object, must has json['action']

    if(json['action'] == 'find public keys'){ return Pub.findKeys(json); };
    if(json['action'] == 'add public key') { return Pub.addKey(json); };

    // must give a return
    return {err: 'do not know the action'};
}



module.exports.jsonAction = jsonAction;
