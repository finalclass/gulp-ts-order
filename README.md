gulp-ts-order
=============

Change the order of given files based on ///<reference path="(.+)"/>.

```js
var gulp = require('gulp');
var tsc = require('gulp-tsc');
var tsOrder = require('gulp-ts-order');
var concat = require('gulp-concat');

gulp.task('client-ts-compile', function () {
  var tscConfig = {
    module: 'amd',
    target: 'ES5',
    noImplicitAny: true,
    emitError: false
  };

  gulp.src('public/**/*.ts')
    .pipe(tsc(tscConfig))
    .pipe(tsOrder())
    .pipe(concat('public/build.js'))
    .pipe(gulp.dest(''));
});

```
