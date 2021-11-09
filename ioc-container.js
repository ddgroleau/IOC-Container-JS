class IocContainer {
    constructor() {
        this._services = {}
        this._dependencies = {}
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
        if(dependencies) {
            this.dependencies[serviceName] = dependencies; 
        } else {
            this.dependencies[serviceName] = [];
        }
    }

    _resolveDependencies(serviceName) {
        let dependencyInstances = [];
        let serviceDependencies = this._dependencies[serviceName];
        if(serviceDependencies) {
            serviceDependencies.forEach(dependency => {
            let instance = this.injectService(`${dependency}`.split(" ")[1]);
            dependencyInstances.push(instance);
           });
        }
        return dependencyInstances;
    }
}

const iocContainer = new IocContainer();
module.exports = iocContainer;