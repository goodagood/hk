
function showInfo(iddiv, text){
        var paragraph = document.createElement("p");
        var textnode = document.createTextNode(text);
        paragraph.appendChild(textnode);

        var where = document.getElementById(iddiv);
        where.insertBefore(paragraph, slogan.firstChild);
}


module.exports.showInfo = showInfo;

