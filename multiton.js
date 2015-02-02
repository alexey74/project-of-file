'use strict';

var basic = require('./basic');

var instances = {};

/*
 * Gets or retrieves existing instance of a `CachedProjectOfFile`
 *
 * @param {string} id: Unique ID for the instance wanted
 * @param {string} base: The base folder to terminate directory tree traversal
 */
function getInstance(id, base) {
  var instance = instances[id];
  if (!instance) {
    instance = new CachedProjectOfFile(base);
    instances[id] = instance;
  }
  return instance;
}

/*
 * Constructor function for each instance
 * Caches maps of file to path and file to project name
 */
function CachedProjectOfFile(base) {
  this.base = base;
  this.paths = {};
  this.names = {};
}

/*
 * @see `./basic.js`
 */
CachedProjectOfFile.prototype.path = function path(file) {
  var p = this.paths[file]
  if (!p) {
    p = basic.path(file, this.base);
    this.paths[file] = p;
  }
  return p;
};

/*
 * @see `./basic.js`
 */
CachedProjectOfFile.prototype.name = function name(file) {
  var n = this.names[file]
  if (!n) {
    n = basic.name(file, this.base);
    this.names[file] = n;
  }
  return n;
};

module.exports.get = getInstance;
