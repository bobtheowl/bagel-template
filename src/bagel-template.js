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

    function createOptionalObject(options) {
        var optionalObj = {};

        options.optional.forEach(function (key) {
            optionalObj[key] = options.defaultTo;
        });

        return optionalObj;
    }

    /**
     * @summary
     * @param
     * @retval
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
     * @param object values Object containing values to replace placeholders with
     * @retval string
     */
    BagelTemplate.prototype.make = function (values) {
        var returnStr = (this.template + ''),
            optionalObj = createOptionalObject(this.options),
            values = mergeObjects(optionalObj, values),
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