var File = require('gulp-util').File;
var tsOrder = require('../build/index.js');
var path = require('path');

newFile = function(filepath, contents) {
  var base = path.join(__dirname, 'fixtures');
  return new File({
    path: path.join(base, filepath),
    base: base,
    cwd: process.cwd(),
    contents: new Buffer(contents)
  });
};


describe('gulp-ts-order', function () {

  it('works', function (next) {
    var stream = tsOrder();
    var files = [];
    stream.on('data', files.push.bind(files));
    stream.on('end', function onEnd() {
      //check the order of files
      console.log('end', files);
      next();
    });

    stream.write(newFile('file4.ts', '/// <reference path="file2.ts"/>\n/// <reference path="file1.ts"/>'));
    stream.write(newFile('file3.ts', '/// <reference path="file2.ts"/>'));
    stream.write(newFile('file2.ts', '/// <reference path="file1.ts"/>'));
    stream.write(newFile('file1.ts', ''));

    return stream.end();
  });

});
