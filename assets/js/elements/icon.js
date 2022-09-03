import { Element } from "./element.js";

export class Icon extends Element{
    constructor(name, flat){
        super('span', {class: flat ? 'material-icons' : 'material-icons-outlined'})
        this.content(name);
    }
}