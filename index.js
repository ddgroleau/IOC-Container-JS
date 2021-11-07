import iocContainer from "./ioc-container.js";

console.log(iocContainer.services);
console.log(iocContainer.dependencies);
const person = iocContainer.injectService("Person");
console.log(person);