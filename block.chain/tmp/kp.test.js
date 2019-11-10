
var keypair = require('keypair');

var pair = keypair();
console.log(pair);

function showInfo(iddiv, text){
        var paragraph = document.createElement("p");
        var textnode = document.createTextNode(text);
        paragraph.appendChild(textnode);

        var where = document.getElementById(iddiv);
        where.insertBefore(paragraph, slogan.firstChild);
}


window.kp = keypair;
window.pair = pair;
