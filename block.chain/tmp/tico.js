

const cryptico = require('cryptico');

var p = console.log;

(function(c){
    var parametersBigint = ["n", "d", "p", "q", "dmp1", "dmq1", "coeff"];

    c.privateKeyString = function(rsakey) {
        var keyObj = {};
        parametersBigint.forEach(function(parameter){
            keyObj[parameter] = c.b16to64(rsakey[parameter].toString(16));
        });
        // e is 3 implicitly
        return JSON.stringify(keyObj);
    }
    c.privateKeyFromString = function(string) {
        var keyObj = JSON.parse(string);
        var rsa = new RSAKey();
        parametersBigint.forEach(function(parameter){
            rsa[parameter] = parseBigInt(c.b64to16(keyObj[parameter].split("|")[0]), 16);
        });
        rsa.e = parseInt("03", 16);
        return rsa
    }
})(cryptico)


