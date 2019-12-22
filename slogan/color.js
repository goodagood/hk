

var Color = require("color");

const Coo = require("./cookie.js");


const BLACK = '#000000';
const WHITE = '#FFFFFF';

// 3 aa-large 4.5 aa 7 aaa 21


// 2017 1016



function bodyColor(foreground,background){
    foreground = foreground || BLACK;
    background = background || WHITE;

    document.body.style.color = foreground;
    document.body.style.backgroundColor = background;

    Coo.setCookie('color', foreground, 365)
    Coo.setCookie('bgcolor', background, 365)
}


function divColor(divid, foreground,background){
    if(!divid) return false;

    foreground = foreground || BLACK;
    background = background || WHITE;

    var el = document.getElementById(divid);
    el.style.color = foreground;
    el.style.backgroundColor = background;
}


function randomColor(){
    return Color.rgb(
        parseInt(Math.random()*256),
        parseInt(Math.random()*256),
        parseInt(Math.random()*256)
        );
}

function randomHexColorPair(){
    const r = 4.5;

    var fore = randomColor();
    var back = randomColor();
    //console.log(fore.toString(), back.toString(), 'hex: ', fore.hex(), back.hex());

    //window.fore = fore;

    ratio=fore.contrast(back) ;
    while(ratio < r){
        back = randomColor();
        ratio=fore.contrast(back) ;

        //window.back = back;
        //console.log(fore.toString(), back.toString(), 'hex: ', fore.hex(), back.hex());
    }

    var fHex = typeof fore === 'string' ? fore:fore.hex();
    var bHex = typeof back === 'string' ? back:back.hex();

    return [fHex, bHex];
}


function randomBodyColor(){
    [fore, back] = randomHexColorPair();
    //console.log(fore.toString(), back.toString(), 'hex: ', fore.hex(), back.hex());
    //console.log(fore.toString(), back.toString(), );

    bodyColor(fore, back);
}

function randomDivColor(divid){
    if(!divid) return false;

    [fore, back] = randomHexColorPair();

    divColor(divid, fore, back);
}

function rollBodyForeground(){
    var r = 4.5;

    //var fore = document.body.style.color;
    var back = document.body.style.backgroundColor;

    var f = randomColor(), b = Color(back);

    var ratio = f.contrast(b);
    console.log(`ratio < r ? ${ratio} < ${r}`);
    while(ratio < r){
        f = randomColor();
        ratio = f.contrast(b);
    }

    console.log(f.hex(), b.hex(), ratio);

    //document.body.style.color = f.hex();
    //document.body.style.backgroundColor = b.hex();
    bodyColor(f.hex(), b.hex());
}


function adjustDivTextColor(divId){
    var r = 4.5;

    //var fore = document.body.style.color;
    var el = document.getElementById(divId);
    var back = el.style.backgroundColor;

    var f = randomColor(), b = Color(back);

    var ratio = f.contrast(b);
    console.log(`ratio < r ? ${ratio} < ${r}`);
    while(ratio < r){
        f = randomColor();
        ratio = f.contrast(b);
    }

    console.log(f.hex(), b.hex(), ratio);

    //bodyColor(f.hex(), b.hex());
    divColor(divId, f.hex(), b.hex());
}

//document.getElementById('randombodycolor').onclick = randomBodyColor;
//document.getElementById('redoColor').onclick = redoColor;
//document.getElementById('rollBodyForeground').onclick = rollBodyForeground;


//window.randomHexColorPair = randomHexColorPair;
//window.randomColor = randomColor;
//window.randomBodyColor = randomBodyColor;


module.exports.bodyColor = bodyColor;
module.exports.randomBodyColor = randomBodyColor;
module.exports.rollBodyForeground = rollBodyForeground;
module.exports.randomDivColor = randomDivColor;
module.exports.adjustDivTextColor = adjustDivTextColor;

//debug
window.randomDivColor = randomDivColor;
