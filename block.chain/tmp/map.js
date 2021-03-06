


const _ = require("lodash");



const hk = {lat: 22.28552, lng: 114.15769};  // Hong Kong
const dimondHill = { lat: 22.34121, lng: 114.20112};
const mongKok = { lat: 22.32025, lng: 114.16982};
const princeEdward = { lat: 22.32478, lng: 114.1683272};
const peLeft = { lat: 22.33478, lng: 114.1683272};

const japServer = {lat: 35.6761919, lng: 139.65031059999998};
const manhattan = {lat: 40.748  , lng: -73.988  };  // Manhattan

function createMap(DomElement, height, option){

    var myOptions = _.merge({
        center: new google.maps.LatLng( mongKok ),
        zoom: 15,
    }, option);

    var map = new google.maps.Map( DomElement, myOptions );
    return map;
}
 

function putInfo(map, pos, text='Empty Text'){
    var infoWindow = new google.maps.InfoWindow();

    infoWindow.setPosition(pos);
    infoWindow.setContent(text);
    infoWindow.open(map);
    return infoWindow;
}


function currentLocInfo(map, text){
    getLatlng(function(err, pos){
        if(err) {return console.log(err);}

        putInfo(map, pos, text);
    });
}


function putMarker(){
    //??

    var popo = new google.maps.Marker({
        position: { lat: 22.33478, lng: 114.1783272},
        map: map,
        icon: '32.trex.png',
        //size: google.maps.Size(64,64); // width, height
        //icon: '32.popo.png',
        title: '32 pixpopo'

    });
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

function fakeLatlng(cb){
    var pos = randomPos(mongKok);
    console.log('fake pos: ', pos);
    cb(null, pos);
}



const $s = require('scriptjs');

function fetchGoogleMapApi(callback){
    const url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDiwbgt72z6fOBoM0AnngaWBmdtZd_7t-g";

    $s(url, function(a,b,c){
        console.log('scriptjs got basic api of google maps ', a,b,c);
        console.log('google ', typeof google);

        //createMap('info', 300, {});
        //return createMap;
        if(callback){ callback(); }
    });
}
//fetchGoogleMapApi()


function randomPos(center, distance=1000.0){
    //Only in roughly manner
    //distance in meters

    var x,y;
    var pos = {};

    x = (Math.random() - 0.5) * distance/1E5;
    y = (Math.random() - 0.5) * distance/1E5;

    pos['lat'] = center['lat'] + x;
    pos['lng'] = center['lng'] + y;
    return pos;
}


module.exports.fetchGoogleMapApi = fetchGoogleMapApi;
module.exports.createMap = createMap;
module.exports.putInfo = putInfo;
module.exports.currentLocInfo = currentLocInfo;
//module.exports.getLatlng = getLatlng;
module.exports.getLatlng = fakeLatlng;  //debug


