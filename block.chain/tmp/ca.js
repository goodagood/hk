
var cryptico = require('cryptico');

// The passphrase used to repeatably generate this RSA key.
var PassPhrase = "The Moon is a Harsh Mistress."; 
 
// The length of the RSA key, in bits.
var Bits = 1024; 
  
var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);

//console.log(MattsRSAkey);
var p = console.log;


var MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey);       
p('MattsPublicKeyString');
p(MattsPublicKeyString);

var PlainText = "Matt, I need you to help me with my Starcraft strategy.";

var EncryptionResult = cryptico.encrypt(PlainText, MattsPublicKeyString);


var CipherText = "OOHoAlfm6Viyl7afkUVRoYQv24AfdLnxaay5GjcqpxvEK+dph5kUFZEZIFKo \
                  vVoHoZbtUMekSbMqHQr3wNNpvcNWr4E3DgNLfMZQA1pCAUVmPjNM1ZQmrkKY \
                  HPKvkhmVKaBiYAJGoO/YiFfKnaylLpKOYJZctkZc4wflZcEEqqg=?cJPt71I \
                  HcU5c2LgqGXQKcx2BaAbm25Q2Ku94c933LX5MObL9qbTJEVEv29U0C3gIqcd \
                  qwMV6nl33GtHjyRdHx5fZcon21glUKIbE9P71NwQ=";

var DecryptionResult = cryptico.decrypt(CipherText, MattsRSAkey);

var PassPhrase = "There Ain't No Such Thing As A Free Lunch."; 

var SamsRSAkey = cryptico.generateRSAKey(PassPhrase, 1024);

var PlainText = "Matt, I need you to help me with my Starcraft strategy.";

var EncryptionResult = cryptico.encrypt(PlainText, MattsPublicKeyString, SamsRSAkey);
p(EncryptionResult);

//var PublicKeyID = cryptico.publicKeyID(EncryptionResult.publickey);
//p(PublicKeyID);


// debugging
window.cry = cryptico;
