var BagelTemplate;

(function () {
    'use strict';

    // Private global properties
    var defaultOptions = {
        'delimiters': ['{', '}'],
        'optional': [],
        'defaultTo': '',
        'modifiers': {}
    };

    // Private global methods

    /**
     * Goes through each value and if it is null and doesn't have an assigned
     * modifier, the value is set to an empty string.
     * @param {object} fixObject Object of values to check
     * @param {object} modifiers Object of modifiers to check
     * @return {object}
     */
    function fixNullValues(fixObject, modifiers) {
        Object.keys(fixObject).map(function(key, index) {
            if (fixObject[key] === null && typeof modifiers[key] === 'undefined') {
                fixObject[key] = '';
            }//end if
        });
        return fixObject;
    }

    /**
     * Merges two Javascript objects together.
     * @param {object}* Each argument is an object to be merged.
     * @return {object}
     */
    function mergeObjects() {
        var args = Array.prototype.slice.call(arguments),
            merged = {},
            key;

        args.forEach(function (obj) {
            for (key in obj) {if (obj.hasOwnProperty(key)) {
                merged[key] = obj[key];
            }}//end for
        });

        return merged;
    }

    /**
     * Creates an object of default values to be merged with the values object.
     * @param {object} options
     * @return {object}
     */
    function createOptionalObject(options) {
        var optionalObj = {};

        options.optional.forEach(function (key) {
            optionalObj[key] = options.defaultTo;
        });

        return optionalObj;
    }

    /**
     * @summary Loops through the values object and replaces placeholders as needed.
     * @param {object} templateObj The current BagelTemplate instance
     * @param {string} returnStr The current template string being worked on
     * @param {string} prefix The current object key prefix
     * @param {object} values An object containing values to replace
     * @return {string}
     */
    function loopThroughValues(templateObj, returnStr, prefix, values) {
        var openDelimiter = templateObj.options.delimiters[0],
            closeDelimiter = templateObj.options.delimiters[1],
            key;

        for (key in values) {if (values.hasOwnProperty(key)) {
            if (values[key] !== null && typeof values[key] === 'object') {
                returnStr = loopThroughValues(
                    templateObj,
                    returnStr,
                    ((prefix) ? prefix + '.' + key : key),
                    values[key]
                );
            } else if (typeof templateObj.options.modifiers[key] === 'function') {
                returnStr = returnStr.replace(
                    new RegExp(openDelimiter + ((prefix) ? prefix + '.' + key : key) + closeDelimiter, 'g'),
                    templateObj.options.modifiers[key](values[key])
                );
            } else {
                returnStr = returnStr.replace(
                    new RegExp(openDelimiter + ((prefix) ? prefix + '.' + key : key) + closeDelimiter, 'g'),
                    values[key]
                );
            }//end if/else
        }}//end for

        return returnStr;
    }//end loopThroughValues()

    /**
     * @class
     * @summary Simple templating library.
     * @author Jacob Stair
     */
    BagelTemplate = function BagelTemplate(templateId, options) {
        // Private instance properties
        var self = this;

        if (templateId.substr(0, 1) === '#') {
            templateId = templateId.substr(1);
        }//end if

        // Public properties
        self.template = document.getElementById(templateId).innerHTML;
        self.options = mergeObjects(defaultOptions, ((typeof options !== 'undefined') ? options : {}));
    };//end BagelTemplate

    // Public global methods

    /**
     * @summary Fills in template with values and returns produced string.
     * @param {object} values Object containing values to replace placeholders with
     * @return {string}
     */
    BagelTemplate.prototype.make = function (values) {
        var returnStr = (this.template + ''),
            optionalObj = createOptionalObject(this.options),
            values = fixNullValues(mergeObjects(optionalObj, values), this.options.modifiers),
            openDelimiter = this.options.delimiters[0],
            closeDelimiter = this.options.delimiters[1],
            key;

        return loopThroughValues(this, returnStr, '', values);

        for (key in values) {if (values.hasOwnProperty(key)) {
            if (typeof this.options.modifiers[key] === 'function') {
                returnStr = returnStr.replace(
                    new RegExp(openDelimiter + key + closeDelimiter, 'g'),
                    this.options.modifiers[key](values[key])
                );
            } else {
                returnStr = returnStr.replace(new RegExp(openDelimiter + key + closeDelimiter, 'g'), values[key]);
            }//end if/else
        }}//end for

        return returnStr;
    };//end BagelTemplate.make()
}());

//end bagel-template.js