

/*
 * Buttons, DOM element
 */

const Vue = require('vue');

var myutil = require('../util.js');


Vue.component('CmdButton',{
    props: ['b'],
    template: '<button v-on:click="clickMe">{{b.text}}</button>',
    methods: {
        clickMe: function(){console.log('buttone click');},
    },
});

var ButtList = new Vue({
    el: "#vueButtons",
    data:{
        buttList:[
            {text: 'one'},
            {text: 'two'},
        ],
    }
});


document.getElementById('time').onclick = function(e){
    myutil.showInfo('info', Date.now().toLocaleString() + ' milli seconds from 1970...');
};
