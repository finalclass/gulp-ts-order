/// <reference path="typings/tsd.d.ts"/>
var through = require('through');
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
    var files = [];
    function onFile(file) {
        console.log(getFileReferences(file.contents.toString()));
    }
    function onEnd() {
        // after file is processed emit "data" event
        return this.emit('end');
    }
    return through(onFile, onEnd);
}
module.exports = tsOrder;
