

var Vue = require("vue");

var p = console.log;


function listUserPem(jData, infoDivID, clickCallback){
    let limit = 3;
    let i = 0;
    for(let k in jData){
        if(i++ > limit){return;}
        insertInfo(infoDivID, jData[k], clickCallback);
    }
}

function insertInfo(infoDivID, k, callback){
    var where = document.getElementById(infoDivID);

    var info = buildPubpemClick(infoDivID, k, callback);
    where.insertBefore(info, where.firstChild);
}

function buildPubpemClick(infoDivID, k, callback){
        var paragraph = document.createElement("p");

        if(typeof k['_id'] !== 'undefined'){
            paragraph.textContent += "id in db :" + k['_id'];
        }
        if(typeof k['milliseconds'] !== 'undefined'){
            paragraph.textContent += "milli : " + k['milliseconds'];
        }

        p(k);
        var a = createAnchor(k.pubpem, callback);
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
