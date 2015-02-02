# `project-of-file`

Find the project that a particular file belongs to by traversing up the directory tree.

Looks for `package.json` (npm) and `bower.json` (bower).

## Usage

    npm install --save project-of-file

Then somewhere in your code:

    var projectOfFile = require('project-of-file');
    var projectPath = projectOfFile.path('node_modules/foo/node_modules/bar/bax/qux.png', process.cwd());
    var projectName = projectOfFile.name('node_modules/foo/node_modules/bar/bax/qux.png', process.cwd());

## License

GPLv3

Created by Brendan Graetz
