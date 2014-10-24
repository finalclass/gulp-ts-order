/// <reference path="typings/tsd.d.ts"/>
var through = require('through');
var DependencyResolver = require('dependency-resolver');
var path = require('path');
function getFileReferences(contents) {
    var regex = 'reference path="(.+)"';
    var matches = contents.match(new RegExp(regex, 'g'));
    if (!matches) {
        return [];
    }
    return matches.map(function (m) {
        return m.match(new RegExp(regex))[1];
    });
}
function tsOrder() {
    var res = new DependencyResolver();
    var files = {};
    function onFile(file) {
        files[file.path] = file;
        res.add(file.path);
        getFileReferences(file.contents.toString()).forEach(function (p) {
            var depPath = path.resolve(path.dirname(file.path), p);
            res.setDependency(file.path, depPath);
        });
    }
    function onEnd() {
        var _this = this;
        res.sort().forEach(function (serv) {
            _this.emit('data', files[serv]);
        });
        return this.emit('end');
    }
    return through(onFile, onEnd);
}
module.exports = tsOrder;
