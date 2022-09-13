import { Element } from "./element.js";

export class Icon extends Element{
    constructor(name, flat){
        super('span', {class: flat ? 'material-symbols' : 'material-symbols-outlined'})
        this.content(name);
    }

    static error = 'emergency_home'
    static warn = 'error'
    static success = 'check_circle'
}