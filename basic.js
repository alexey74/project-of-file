'use strict';

var path = require('path');
var fs = require('fs');

/*
 * Finds the package.json file or bower.json file in the nearest parent directory
 * of the passed in file.
 * If none are found before traversing up the folder structure beyond the base path
 * `undefined` is returned.
 *
 * @param {string} file Path of the file in question
 * @param {string} base Base path beyond which search should terminate
 * @return {string} Path of either a package.json or a bower.json file,
 *   or `undefined` if unable to determine.
 */
function findProjectJsonOfFile(file, base) {
  if (!file) {
    throw '`file` unspecified';
  }
  if (!base) {
    throw '`base` unspecified';
  }
  var currentDir = path.dirname(file);
  if (currentDir.length < base.length ||
      currentDir.indexOf(base) !== 0) {
    throw '`base` value illegal relative to `file` value\nbase: '+base+'\nfile: '+file;
  }
  var projectJson;
  do {
    if (fs.existsSync(path.join(currentDir, 'package.json'))) {
      projectJson = path.join(currentDir, 'package.json');
    }
    else if (fs.existsSync(path.join(currentDir, 'bower.json'))) {
      projectJson = path.join(currentDir, 'bower.json');
    }
    else {
      currentDir = path.resolve(currentDir, '..');
    }
  }
  while (!projectJson && currentDir.length >= base.length);
  return projectJson;
};

/*
 * Obtains the name of the project that this file belongs to.
 *
 * @see Use in conjunction with `findProjectJsonFile` function.
 * @param {string} file Path of the file in question
 * @param {string} base Base path beyond which search should terminate
 * @return {string} Name of the project that the file belonged to,
 *   or `'unknown'` if not able to determine.
 */
function findProjectNameOfFile(file, base) {
  var projectJson = findProjectJsonOfFile(file, base);
  if (projectJson) {
    var json = require(projectJson);
    return json.name;
  }
  return 'unknown';
}

/*
 * Obtains the name and version of the project that this file belongs to.
 *
 * @see Use in conjunction with `findProjectJsonFile` function.
 * @param {string} file Path of the file in question
 * @param {string} base Base path beyond which search should terminate
 * @return {Array|null} Name and version of the project that the file belonged to,
 *   or `null` if not able to determine.
 */
function findProjectNameVersionOfFile(file, base) {
  var projectJson = findProjectJsonOfFile(file, base);
  if (projectJson) {
    var json = require(projectJson);
    return [json.name, json.version];
  }
  return null;
}

module.exports.path = findProjectJsonOfFile;
module.exports.name = findProjectNameOfFile;
module.exports.nameVer = findProjectNameVersionOfFile;
