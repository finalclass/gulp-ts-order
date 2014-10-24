var gulp = require('gulp');
var tsc = require('gulp-tsc');
var newer = require('gulp-newer');
var jasmine = require('gulp-jasmine');

gulp.task('default', function () {
  gulp.start('ts-compile', 'test');
  gulp.watch(['src/**/*.ts', 'spec/**/*.js'], ['ts-compile', 'test']);
});

gulp.task('test', function () {
  return gulp.src('spec/**/*.js')
    .pipe(jasmine({verbose: true, includeStackTrace: true}));
});

gulp.task('ts-compile', function () {
  return gulp.src(['src/**/*.ts'])
    .pipe(newer('build/'))
    .pipe(tsc({
      tscPath: null,
      tscSearch: ['cwd', 'shell', 'bundle'],
      emitError: false,
      module: 'commonjs',
      target: 'ES5',
      out: null,
      outDir: 'src/',
      mapRoot: null,
      sourceRoot: null,
      allowbool: false,
      allowimportmodule: false,
      declaration: false,
      noImplicitAny: true,
      noResolve: false,
      removeComments: false,
      sourcemap: false,
      tmpDir: '',
      noLib: false,
      keepTree: true,
      pathFilter: null,
      safe: false
    }))
    .pipe(gulp.dest('build/'));
});
