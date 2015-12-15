"use strict";

module.exports = {
    getProcessArguments() {
        return process.argv.filter((arg) => {
            return arg.startsWith('-') && arg.indexOf('=') > 1;
        }).reduce((prev, arg) => {
            const argArray = arg.substr(1).split('=');
            prev[argArray[0]] = argArray[1];
            return prev;
        }, {});
    }
};
