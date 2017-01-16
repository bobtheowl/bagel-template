/**
 * Bagel Template
 * @summary Simple templating library.
 * @author Jacob Stair
 * @license MIT License
 * @see https://github.com/bobtheowl/bagel-template
 */
var BagelTemplate;!function(){"use strict";function t(){var t,e=Array.prototype.slice.call(arguments),o={};return e.forEach(function(e){for(t in e)e.hasOwnProperty(t)&&(o[t]=e[t])}),o}function e(t){var e={};return t.optional.forEach(function(o){e[o]=t.defaultTo}),e}function o(t,e,i,n){var r,s=t.options.delimiters[0],a=t.options.delimiters[1];for(r in n)n.hasOwnProperty(r)&&(e=null!==n[r]&&"object"==typeof n[r]?o(t,e,i?i+"."+r:r,n[r]):"function"==typeof t.options.modifiers[r]?e.replace(new RegExp(s+(i?i+"."+r:r)+a,"g"),t.options.modifiers[r](n[r])):e.replace(new RegExp(s+(i?i+"."+r:r)+a,"g"),n[r]));return e}var i={delimiters:["{","}"],optional:[],defaultTo:"",modifiers:{}};BagelTemplate=function(e,o){var n=this;"#"===e.substr(0,1)&&(e=e.substr(1)),n.template=document.getElementById(e).innerHTML,n.options=t(i,"undefined"!=typeof o?o:{})},BagelTemplate.prototype.make=function(i){var n=this.template+"",r=e(this.options),i=t(r,i);this.options.delimiters[0],this.options.delimiters[1];return o(this,n,"",i)}}();