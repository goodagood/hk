
const pcolor = require("./color.js");

const p = console.log;


// Hook up functions to page elements
// Color and Text Color:
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

function getBodyFontSize(){
  var fs = document.body.style.fontSize;
  if (fs && fs !== ""){
    return fs;
  }
  return window.getComputedStyle(document.body).fontSize;
}


function increaseBodyFontSize(e){
  e.preventDefault();
  var size = getBodyFontSize();
  intSize  = parseInt(size);
  //p(`size: ${size}, `);
  big = intSize + 1;
  //p(`size + 1: ${big}, `);
  document.body.style.fontSize = `${big}px`;
}
function decreaseBodyFontSize(e){
  e.preventDefault();
  var size = getBodyFontSize();
  intSize  = parseInt(size);
  //p(`size: ${size}, `);
  small = intSize - 1;
  //p(`size - 1: ${small}, `);
  document.body.style.fontSize = `${small}px`;
}

var increaseEl = document.getElementById("increaseBodyFontSize");
if (increaseEl.addEventListener){
    increaseEl.addEventListener("click", increaseBodyFontSize, false);
}else if (increaseEl.attachEvent){
    increaseEl.attachEvent('onclick', increaseBodyFontSize);
}

var decreaseEl = document.getElementById("decreaseBodyFontSize");
if (decreaseEl.addEventListener){
    decreaseEl.addEventListener("click", decreaseBodyFontSize, false);
}else if (decreaseEl.attachEvent){
    decreaseEl.attachEvent('onclick', decreaseBodyFontSize);
}


// Body Color



document.getElementById('yes').onclick = function(e){
    if(e) e.preventDefault();

    var textel = document.getElementById('textInput');
    const text = textel.value || " ";
    p(textel.value);

    var paragraph = document.createElement("p");
    var textnode = document.createTextNode(text);
    paragraph.appendChild(textnode);

    var slogan = document.getElementById('slogan');
    slogan.insertBefore(paragraph, slogan.firstChild);
};


