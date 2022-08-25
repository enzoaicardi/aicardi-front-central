import { Element } from "./elements.js";


export class IconElement extends Element{

    constructor(name, flat){
        super('span', {class: flat ? 'material-icons' : 'material-icons-outlined'})
        this.element.textContent = name;
    }

}