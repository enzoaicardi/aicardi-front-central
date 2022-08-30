import { Media } from "../lib/urls.js";
import { AiElement, Element } from "./elements.js";
import { SvgElement } from "./svg.js";


export class HeaderLogoElement extends AiElement{

    constructor(){
        super('header-logo');
        this.imageElement = new SvgElement(Media.logo('transparency'));
        this.imageElement.asChild(this.element);
    }

    image() {
        return this.imageElement;
    }

}