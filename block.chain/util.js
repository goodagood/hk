

function showInfo(infoDivID, text){
        var paragraph = document.createElement("pre");
        var textnode = document.createTextNode(text);
        paragraph.appendChild(textnode);

        var where = document.getElementById(infoDivID);
        where.insertBefore(paragraph, where.firstChild);
}


module.exports.showInfo = showInfo;
