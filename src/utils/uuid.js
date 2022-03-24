import {loadFromLocalStorage} from "./localstorage";

const uuidGen = () => Math.max(...(loadFromLocalStorage("todos").map(e => e.id)), 0) + 1;

export default uuidGen;
