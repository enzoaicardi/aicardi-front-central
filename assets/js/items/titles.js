import { AiElement } from "./elements.js";


export class TitleElement extends AiElement{

    constructor(title){
        super('title')
        this.element.textContent = title;
    }

}