'use strict';

var basic = require('./basic');

var instances = {};

function getInstance(base) {
  var instance = instances[base];
  if (!instance) {
    instance = new CachedProjectOfFile(base);
    instances[base] = instance;
  }
  return instance;
}

function CachedProjectOfFile(base) {
  this.base = base;
  this.paths = {};
  this.names = {};
}

CachedProjectOfFile.prototype.path = function path(file) {
  var p = this.paths[file]
  if (!p) {
    p = basic.path(file, this.base);
    this.paths[file] = p;
  }
  return p;
};

CachedProjectOfFile.prototype.name = function name(file) {
  var n = this.names[file]
  if (!n) {
    n = basic.name(file, this.base);
    this.names[file] = n;
  }
  return n;
};

module.exports.get = getInstance;
