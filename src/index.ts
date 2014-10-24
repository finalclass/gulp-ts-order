/// <reference path="typings/tsd.d.ts"/>

import through = require('through');
import DependencyResolver = require('dependency-resolver');
import path = require('path');

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

  var res:DependencyResolver = new DependencyResolver();
  var files:{[id:string]:IFile} = {};

  function onFile(file:IFile):void {
    files[file.path] = file;
    res.add(file.path);
    getFileReferences(file.contents.toString()).forEach((p:string):void => {
      var depPath:string = path.resolve(path.dirname(file.path), p);
      res.setDependency(file.path, depPath);
    });
  }

  function onEnd():void {
    res.sort().forEach((serv:string):void => {
      this.emit('data', files[serv]);
    });

    return this.emit('end');
  }

  return through(onFile, onEnd)
}

export = tsOrder;
