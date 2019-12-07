

function showInfo(infoDivID, text){
        var paragraph = document.createElement("pre");
        var textnode = document.createTextNode(text);
        paragraph.appendChild(textnode);

        var where = document.getElementById(infoDivID);
        where.insertBefore(paragraph, where.firstChild);
}


function sliceObj(obj) {
    var o = {}
    , keys = [].slice.call(arguments, 1);
    for (var i=0; i<keys.length; i++) {
        if (keys[i] in obj) o[keys[i]] = obj[keys[i]];
    }
    return o;
}


function getLatlng(cb){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(pos);

            return cb(null, pos);

            //putInfo(map, pos, text);
            // This change center to browser's pos
            //map.setCenter(pos);
        }, function(err) {
            p(err);
            cb(err); // err is true
        });
    }else{
        cb('!navigator.geolocation');
    }
}


function post(data, url='/json', cb=console.log ){
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        p ('xhr   ', xhr.readyState , xhr.status) ;
        if (xhr.readyState === 4 && xhr.status === 200) 
        {
            console.log('xhr.responseText'); console.log(xhr.responseText);

            var jsonReply = JSON.parse(xhr.responseText);
            cb(jsonReply);
        }// do't do else
    };

    var json = JSON.stringify(data);
    //console.log('post json data: ', json);
    xhr.send(json);
}


function storageAvailable(type) {
    // type: 'localStorage' or 'sessionStorage'

    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}


function getLocalStore(){
    const type = "localStorage";
    if(storageAvailable(type)){
        //p('available');
        var store = window[type];
        return store;
    }else{
        return null;
    }
}



// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
} // type should be mime type, 'text/plain' should be ok for text.

// another save file from browser:
// https://github.com/eligrey/FileSaver.js


module.exports.showInfo = showInfo;
module.exports.sliceObj = sliceObj;
module.exports.post = post;
module.exports.storageAvailable = storageAvailable;
module.exports.getLocalStore = getLocalStore;
