
const pcolor = require("./color.js");
//const coo = require("./cookie.js");

const p = console.log;

window.pcolor = pcolor;
window.two = 2;

//const randomBodyColor = pcolor.randomBodyColor;
//const rollBodyForeground = pcolor.rollBodyForeground;

// Hook up functions to page elements
document.getElementById('randomColor').onclick = function(e){
    if(e) e.preventDefault();
    pcolor.randomBodyColor();
};
document.getElementById('textColor').onclick = function(e){
    if(e) e.preventDefault();
    pcolor.rollBodyForeground();
};



/*
 * Do body font size
 */



document.getElementById('yes').onclick = function(e){
    if(e) e.preventDefault();
    p('yes clicked');

};

