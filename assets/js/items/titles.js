import { AiElement, Element } from "./elements.js";
import { SvgElement } from "./svg.js";


export class TitleElement extends AiElement{

    constructor(title, src){
        super('title')

        this.imgElement = new SvgElement(src),
        this.titleElement = new Element('h3')
        
        this.describe([
            this.imgElement,
            this.titleElement.content(title)
        ])
    }

}