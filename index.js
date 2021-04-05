#!/usr/bin/env node

'use strict';

var basic = require('./basic');
var multiton = require('./multiton');

module.exports.path = basic.path;
module.exports.name = basic.name;
module.exports.nameVer = basic.nameVer;
module.exports.cachedInstance = multiton.get;


if (require.main === module) {
    var args = process.argv.slice(2);

    var projectNameVer = basic.nameVer(args[0], args[1]);

    if (projectNameVer) {
        console.log(projectNameVer[0], projectNameVer[1]);
    } else {
        console.log('');
    }
}
