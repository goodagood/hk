



var keypair = require('keypair');

const InfoElementID = 'info';


function showInfo(iddiv, text){
        var paragraph = document.createElement("pre");
        var textnode = document.createTextNode(text);
        paragraph.appendChild(textnode);

        var where = document.getElementById(iddiv);
        where.insertBefore(paragraph, where.firstChild);
}


document.getElementById('showPubkey').onclick = function(e){
    showInfo('info', pair.public);
}
document.getElementById('showPrikey').onclick = function(e){
    showInfo('info', pair.private);
}

showInfo('info', 'Make a pair of keys, ...');
var pair = keypair();
console.log(pair);
showInfo('info', 'public key & private key: ' + pair.public + pair.private);


window.kp = keypair;
window.pair = pair;
window.show = showInfo;
