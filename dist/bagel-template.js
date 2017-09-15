/**
 * Bagel Template
 * @summary Simple templating library.
 * @author Jacob Stair
 * @license MIT License
 * @see https://github.com/bobtheowl/bagel-template
 */
var BagelTemplate;!function(){"use strict";function t(t){return Object.keys(t).map(function(e,o){null===t[e]&&void 0===this.options.modifiers[e]&&(t[e]="")}),t}function e(){var t,e={};return Array.prototype.slice.call(arguments).forEach(function(o){for(t in o)o.hasOwnProperty(t)&&(e[t]=o[t])}),e}function o(t){var e={};return t.optional.forEach(function(o){e[o]=t.defaultTo}),e}function i(t,e,o,n){var r,s=t.options.delimiters[0],p=t.options.delimiters[1];for(r in n)n.hasOwnProperty(r)&&(e=null!==n[r]&&"object"==typeof n[r]?i(t,e,o?o+"."+r:r,n[r]):"function"==typeof t.options.modifiers[r]?e.replace(new RegExp(s+(o?o+"."+r:r)+p,"g"),t.options.modifiers[r](n[r])):e.replace(new RegExp(s+(o?o+"."+r:r)+p,"g"),n[r]));return e}var n={delimiters:["{","}"],optional:[],defaultTo:"",modifiers:{}};(BagelTemplate=function(t,o){var i=this;"#"===t.substr(0,1)&&(t=t.substr(1)),i.template=document.getElementById(t).innerHTML,i.options=e(n,void 0!==o?o:{})}).prototype.make=function(n){var r=this.template+"",n=t(e(o(this.options),n));this.options.delimiters[0],this.options.delimiters[1];return i(this,r,"",n)}}();