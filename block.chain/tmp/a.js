

var a = {
    a: 1,
    b: 2,
    _a: 3,
    _b: 4,
}

//console.log(__dirname);

// check some basics

var subobj = {
    one: 1,
    two: 2,

    sub: {
        one: 1.1,
        two: 2.2
    }
};

var five = [1,2,3,4,5];


var TAFFY = require('taffy');


// Create DB and fill it with records
var friends = TAFFY([
	{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active"},
	{"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active"},
	{"id":3,"gender":"M","first":"Jeff","last":"Stevenson","city":"Washington, D.C.","status":"Active"},
	{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active"}	
]);
