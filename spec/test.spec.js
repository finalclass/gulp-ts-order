var File = require('gulp-util').File;
var tsOrder = require('../build/index.js');
var path = require('path');

newFile = function(filepath, contents) {
  var base = '/';
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
      expect(files[0].path).toBe('/1.ts');
      expect(files[1].path).toBe('/2.ts');
      expect(files[2].path).toBe('/3.ts');
      expect(files[3].path).toBe('/4.ts');
      next();
    });

    stream.write(newFile('4.ts', '/// <reference path="3.ts"/>\n/// <reference path="1.ts"/>'));
    stream.write(newFile('3.ts', '/// <reference path="2.ts"/>'));
    stream.write(newFile('2.ts', '/// <reference path="1.ts"/>'));
    stream.write(newFile('1.ts', ''));

    return stream.end();
  });

});
