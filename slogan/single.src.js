
const $ = require("jquery");

const pcolor = require("./color.js");

const p = console.log;


// Hook up functions to page elements
// Color and Text Color:
document.getElementById('randomColor').onclick = function(e){
    if(e) e.preventDefault();
    pcolor.randomBodyColor();
    //pcolor.randomDivColor('slogan');
};
document.getElementById('textColor').onclick = function(e){
    if(e) e.preventDefault();
    pcolor.rollBodyForeground();
};



/*
 * Do body font size
 */

var Obj = {baseSize : 0};

function getBaseSize(){
    if(Obj.baseSize < 5){
        Obj.baseSize = getBodyFontSize();
        return Obj.baseSize;
    }else{
        return Obj.baseSize;
    }
}

function getBodyFontSize(){
    var fs = document.body.style.fontSize;
    if (fs && fs !== ""){
        ;
        //
    }else{
        fs = window.getComputedStyle(document.body).fontSize;
    }
    var intSize  = parseInt(fs);
    return intSize;
}


function increaseBodyFontSize(e){
    if(e) {e.preventDefault();}

    var size = getBaseSize();

    Obj.baseSize = size + 1;
    big = size + 1;
    bigPx = `${big}px`;
    //p(`size + 1: ${big}, `);
    //document.body.style.fontSize = `${big}px`;

    var paragraphs = document.getElementsByTagName('p');
    //p(`paragraphs len: ${paragraphs.length}`);
    $('p').each(function(index, pa){
        pa.style.lineHeight = `${big + big * 0.2}px`;
        pa.style.fontSize   = bigPx;
    });
}
function decreaseBodyFontSize(e){
    //if(e) {e.preventDefault();}
    var size = getBaseSize();
    Obj.baseSize = size - 1;
    small = size - 1;

    var paragraphs = document.getElementsByTagName('p');
    $('p').each(function(index, pa){
        pa.style.lineHeight = `${small + small * 0.2}px`;
        pa.style.fontSize   = `${small}px`;
    });
}

var increaseEl = document.getElementById("increaseBodyFontSize");
if (increaseEl.addEventListener){
    increaseEl.addEventListener("click", increaseBodyFontSize, false);
}else if (increaseEl.attachEvent){
    increaseEl.attachEvent('onclick', increaseBodyFontSize);
}

$("#increaseBodyFontSize").mousedown(function(e){
    var id = setInterval(function(){
        increaseBodyFontSize();
    }, 50);

    $(this).mouseup(function(){
        p('mouse up');
        clearInterval(id);
    });
});

var decreaseEl = document.getElementById("decreaseBodyFontSize");
if (decreaseEl.addEventListener){
    decreaseEl.addEventListener("click", decreaseBodyFontSize, false);
}else if (decreaseEl.attachEvent){
    decreaseEl.attachEvent('onclick', decreaseBodyFontSize);
}


// Body Color



document.getElementById('yes').onclick = function(e){
    if(e) e.preventDefault(); var textel = document.getElementById('textInput');
    const text = textel.value || " ";
    p(textel.value);

    var paragraph = document.createElement("p");
    //paragraph.className += " row"; // for bootstrap css

    var textnode = document.createTextNode(text);
    paragraph.appendChild(textnode);

    var slogan = document.getElementById('slogan');
    slogan.insertBefore(paragraph, slogan.firstChild);
};


