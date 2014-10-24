declare module "dependency-resolver" {

  class Service {
    public dependencies:Service[];
    public name:string
    constructor(name:string);
  }

  interface IServiceHash {
    [id:string]:Service;
  }

  class DependencyResolver {
    private services:IServiceHash;
    constructor();
    public add(name:string):void;
    private addAndGet(serviceName:string):Service;
    public setDependency(serviceName:string, dependencyName:string):void;
    public resolve(serviceName:string):string[];
    public sort():string[];
    private recursiveResolve(service:Service, resolved:Service[], unresolved:Service[]):void;

  }

  export = DependencyResolver;
}
