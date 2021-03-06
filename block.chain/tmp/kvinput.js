

var pug = require('pug');
var $ = require('jquery');


kvTemp = `
div(class="key-value")
    form
        input(type="text", name="key" class="key")
        input(type="text", name="value" class="value")
        input(type="submit" value="OK" class="ok")
`


var kvDiv = pug.compile(kvTemp, {pretty:true});
//console.log(  kvDiv()  );


function kvInput(callback){
    var htmlStr = kvDiv();
    var kvElement = $(htmlStr);

    kvElement.find('.ok').first().click(function(e){
        e.preventDefault();
        //console.log('ok clicked');

        var key = kvElement.find('.key').first().val();
        var val = kvElement.find('.value').first().val();
        callback(null, key, val);
    });

    
    kvElement.prependTo("#info");
    kvElement.find('.key').first().focus();
}


module.exports.kvInput = kvInput;
