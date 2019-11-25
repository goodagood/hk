

var Vue = require("vue");



function listUserPem(jData, infoDivID, clickCallback){
    for(let k in jData){
        insertInfo(infoDivID, k, clickCallback);
    }
}

function insertInfo(infoDivID, k, callback){
    var where = document.getElementById(infoDivID);

    var info = buildPubpemClick(infoDivID, k, callback);
    where.insertBefore(info, where.firstChild);
}

function buildPubpemClick(infoDivID, pem, callback){
        var paragraph = document.createElement("p");
        var a = createAnchor(pem, callback);
        paragraph.appendChild(a);

        return paragraph;
}


function createAnchor(pem, callback){
	// Create anchor element. 
	var a = document.createElement('a');  

	// Create the text node for anchor element. 
	var link = document.createTextNode(pem); 

	// Append the text node to anchor element. 
	a.appendChild(link);  

	// Set the title. 
	a.title = "pem of public key";  


	// Set the href property. 
	a.href = ".";  

    a.onclick = function(e){
        e.preventDefault();
        console.log(pem.slice(72,108));
        callback(pem);
    };

	return a;
}


module.exports.listUserPem = listUserPem;
