

function listUser(jData){
    for(let k in jData){

    }
}

function buildPubpemClick(infoDivID, text){
        var paragraph = document.createElement("a");
        var textnode = document.createTextNode(text);
        paragraph.appendChild(textnode);

        var where = document.getElementById(infoDivID);
        where.insertBefore(paragraph, where.firstChild);
}


function createAnchor(data){
	// Create anchor element. 
	var a = document.createElement('a');  

	// Create the text node for anchor element. 
	var link = document.createTextNode(data['pubpem']); 

	// Append the text node to anchor element. 
	a.appendChild(link);  

	// Set the title. 
	a.title = "pem of public key";  

    a.data = data['pubpem'];  //?

	// Set the href property. 
	a.href = ".";  

	return a;
}
