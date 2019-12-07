

/*
 * Better to use normal DB when data grow up.
 */

const _ = require('lodash');

// use NeDb as db
const NEDB = require('nedb');
// make an memory data store
var dbmem = new NEDB({'inMemoryOnly':true});
dbmem.loadDatabase((err)=>{'do nothing';});

// db keys: 
//            'pubpem': pubpem,
//            'name': 'server',
//            'milliseconds': Date.now()
//

var dbs = {'default': dbmem}; // a group of db



function insertSrvPem(callback){
    var forge = require('./tmp/forge.js');

    forge.genkey(function(err, key){
        var privateKey = key.privateKey;
        var publicKey  = key.publicKey;
        var pripem = key.pripem;
        var pubpem = key.pubpem;

        var serverRecord = {
            'pubpem': pubpem,
            'name': 'server',
            'milliseconds': Date.now()
        }

        // insert server's key
        dbmem.insert(serverRecord); 
        callback(null, dbmem);
    })
}

function addPem(pem, callback){
    //p('add pem ', pem);
    var data = {};
    data.milliseconds = Date.now();

    if(typeof pem === 'string'){
        data.pubpem = pem;
    }else if(typeof pem === 'object' && typeof pem.pubpem === 'string'){
        data.pubpem = pem.pubpem;
        _.merge(data, pem);
    }

    if(typeof data.action !== 'undefined'){ delete data.action; }

    p('insert pem ', data);
    dbmem.insert(data, callback); 
    //callback(null, dbmem);
}

function findPem(json, callback){
    //json is not used now, because all pem send back
    
    var what = {pubpem: {$exists:true}};

    dbmem.count(what, function(err, num){
        p('dbmem count: ', num);
    });
    dbmem.find(what, callback);
}

function addKV(json, callback){
    var what = {pubpem: json.pubpem};

    var kv = {what: 'key-value'};
    //var kv = {json['key'] :  json['value']};
    kv[json['key']] =  json['value'];

    dbmem.find(what, function(err, docs){
        var first = docs[0];
        var obj = _.merge(first, kv);
        p('dbmem add k,v: ');
        dbmem.update({"_id": obj['_id']}, obj, callback);
    });
}

function saveTransaction(json, callback){
    dbmem.insert(json, callback); 
}

const p = console.log;




function jsonAction(json, callback){
    // json is an object, must has json['action']

    if(typeof json['action'] == 'undefined'){
        return callback({err: 'no action specified'});
    }

    
    if(json['action'] == 'find public keys'){ 
        return findPem(json, callback);
    };
    if(json['action'] == 'add public key') { 
        return addPem(json, callback);
    };
    if(json['action'] == 'add key value') { 
        return addKV(json, callback);
    };
    if( json['action'] == "broadcast transaction" ) { 
        //return saveTransaction(json, callback);
        return dbmem.insert(json, callback); 
    };
            

    // must give a return
    return callback({err: 'do not know the action'});
}



module.exports.jsonAction = jsonAction;

// this serve as init db, 
// good to pass db as variable, 
// instead of require it from different places
module.exports.insertSrvPem = insertSrvPem;


//if(typeof window === 'undefined'){
//    p('window is undefined');
//    var db;
//    insertSrvPem(function(err, d){
//        db = d;
//    });
//}
