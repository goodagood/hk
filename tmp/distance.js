


function toRad(d) {  return d * Math.PI / 180; }

function getDisance(lat1, lng1, lat2, lng2) { // distance in meter

    var dis = 0;

    var radLat1 = toRad(lat1);

    var radLat2 = toRad(lat2);

    var deltaLat = radLat1 - radLat2;

    var deltaLng = toRad(lng1) - toRad(lng2);

    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));

    return dis * 6378137;  // 637... radius of earth globe

}

console.log(  getDisance(39.91917,116.3896,39.91726,116.3940) );


