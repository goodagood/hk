

var _ = require('lodash');

const forge = require('./forge.js');

function makeTransaction (timestamp=null, payer=null, payee=null, data=null){
    // payer => from, payee => to

    let obj = {};
    //obj.payer = payer || 'payer pub key';
    obj.from = payer || 'payer pub key';

    //obj.payee = payee || 'payee pub key';
    obj.to = payee || 'payee pub key';

    obj['from-finger'] = forge.fingerprint(payer) || 'payer pub key finger printer';
    obj['to-finger'] = forge.fingerprint(payee) || 'payee pub key finger printer';

    obj.timestamp = timestamp || new Date().getTime();
    obj.position = {payer: {lat:0, lng:0}, payee: {lat:0, lng:0}}; // position pair

    obj.amount = 0 || data.amount; //'coins number';
    obj.cashUnit = 'HKD';

    obj.negative = null;

    obj.randomNumber = 0;

    obj.sponsor = 'who aid the payment...';
    obj.data = data;
    obj.talk = "Money/Block can talk";

    obj.signatures = [];

    obj.print = function(){
        var o = {};
        o['timestamp']     = obj.timestamp;
        o['amount']        = obj.amount;
        o['payer']   = '...[71]' + obj.payer.slice(72, 108);
        o['payee']   = '...[71]' + obj.payee.slice(72, 108);
        o['fingerPayer']   = obj.fingerPayer;
        o['fingerPayee']   = obj.fingerPayee;
        o['data']          = obj.data;
        //o['talk']          = obj.talk;
        o['position']      = obj.position;
        
        return JSON.stringify(o, null, 4); // 4 space indent
    }
    
    obj.extract = function(){
        var o = _.pick(obj, ['position', 'talk', 'data', 'timestamp',
        'amount', 'unit', 'from', 'to', 'negative']);
        //o['timestamp']   = obj.timestamp;
        //o['amount']      = obj.amount;
        //o['unit']        = obj.unit;
        //o['payer']       = obj.payer;
        //o['payee']       = obj.payee;
        //o['data']        = obj.data;
        //o['talk']        = obj.talk;
        //o['position']    = obj.position;
        
        return o;
    }

    obj.dataOnly = function(){
        return _.omit(obj, ['dataOnly', 'extract', 'print']);
    }


    // Should appear after payer sign.
    //obj.signature ;

    return obj;
}


module.exports.makeTransaction = makeTransaction;


//if(typeof window == "undefined" ){
//    //testing in console
//    var t = makeTransaction(0, 'we want free lunch');
//    console.log(t.print());
//}
