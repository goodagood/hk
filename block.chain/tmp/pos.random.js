




const hk = {lat: 22.28552, lng: 114.15769};  // Hong Kong
const dimondHill = { lat: 22.34121, lng: 114.20112};
const mongKok = { lat: 22.32025, lng: 114.16982};
const princeEdward = { lat: 22.32478, lng: 114.1683272};
const peLeft = { lat: 22.33478, lng: 114.1683272};

const japServer = {lat: 35.6761919, lng: 139.65031059999998};
const manhattan = {lat: 40.748  , lng: -73.988  };  // Manhattan

const p = console.log; 




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

    p(x,y);

    pos['lat'] = center['lat'] + x;
    pos['lng'] = center['lng'] + y;

    return pos;
}



// test
var ppos = randomPos(mongKok);
console.log(ppos);
