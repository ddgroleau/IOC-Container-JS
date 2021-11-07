class Shoes {

}

class Person {
    constructor(shoes) {
        this._shoes=shoes;
    }
    get shoes() {
        return this._shoes;
    }
}

class IocContainer {
    constructor() {
        this._services = {}
        this._dependencies = {}

        this._registerService("Shoes", Shoes);
        this._registerService("Person", Person, [Shoes]);
    }

    get services() {
        return this._services;
    }

    get dependencies() {
       return this._dependencies;
    }

    injectService(serviceName) {
        let dependencies = this._resolveDependencies(serviceName);
        let instance = new this.services[serviceName](...dependencies);
        return instance;
    }

    _registerService(serviceName, className, dependencies) {
        this.services[serviceName] = className;
        this.dependencies[serviceName] = dependencies; 
    }

    _resolveDependencies(serviceName) {
        let dependencyInstances = [];
        let serviceDependencies = this._dependencies[serviceName];
        if(serviceDependencies) {
            for (let i = 0; i < serviceDependencies.length; i++) {
                let instance = this.injectService(`${serviceDependencies[i]}`.split(" ")[1]);
                dependencyInstances.push(instance);
            }
        }
        return dependencyInstances;
    }
}

const iocContainer = new IocContainer();

export default iocContainer;