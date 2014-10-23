/// <reference path="typings/tsd.d.ts"/>

import through = require('through');

interface IFile {
  path:string;
  contents:string;
}

function getFileReferences(contents:string):string[] {
  var regex:string = 'reference path="(.+)"';
  var matches:string[] = contents.match(new RegExp(regex, 'g'));
  if (!matches) {
    return [];
  }
  return matches.map((m:string):string => {
    return m.match(new RegExp(regex))[1];
  });
}

function tsOrder():NodeJS.ReadWriteStream {

  var files:IFile[] = [];

  function onFile(file:IFile):void {
    console.log(getFileReferences(file.contents.toString()));
  }

  function onEnd():void {
    // after file is processed emit "data" event
    return this.emit('end');
  }


  return through(onFile, onEnd)
}

export = tsOrder;
