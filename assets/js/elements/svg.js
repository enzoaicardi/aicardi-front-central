import { Element } from "./element.js";

export class Svg extends Element{

    constructor(src){
        super('object', {data: src})

        this.element.onload = () => {
            const svg = this.element.contentDocument.querySelector('svg')
            this.element.replaceWith(svg);
        }
    }

}