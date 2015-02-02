'use strict';

var basic = require('./basic');
var multiton = require('./multiton');

module.exports.path = basic.path;
module.exports.name = basic.name;
module.exports.cachedInstance = multiton.get;
