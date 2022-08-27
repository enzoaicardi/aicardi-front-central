import { Media } from "../lib/urls.js";
import { AiElement, Element } from "./elements.js";


export class HeaderLogoElement extends AiElement{

    constructor(){
        super('header-logo')
        this.imageElement = new Element('img', {src: Media.logo('transparency')})
        this.imageElement.asChild(this.element)
    }

    image() {
        return this.imageElement;
    }

}