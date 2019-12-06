

//var Vue = require("vue");
var _ = require("lodash");

var forge = require('./forge.js');

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
        var pre = document.createElement("pre");

        var Obj = _.pick(k, ['milliseconds', '_id', 'name']);

        var finger = forge.fingerprint(k.pubpem);
        p('finger : ', finger);

        Obj['finger-print of public key'] = finger;
        Obj.pubpem = k.pubpem.slice(0,128) + ' ...';
        p(a);

        var s = JSON.stringify(Obj, null, 4);
        //p('str: ', s);
        pre.textContent = s;

        paragraph.appendChild(pre);
        var a = createAnchor(k.pubpem, finger, callback);
        paragraph.appendChild(a);
        return paragraph;
}


function createAnchor(pem, finger, callback){
	// Create anchor element. 
	var a = document.createElement('a');  

	// Create the text node for anchor element. 
	var link = document.createTextNode(finger); 

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
