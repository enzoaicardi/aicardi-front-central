import { Element } from "./element.js";
import { ElementAi } from "./elementai.js";
import { Svg } from "./svg.js";

export class Title extends ElementAi{

    constructor(title, image){
        super('title')

        this.describe([
            image ? new Svg(image) : null,
            new Element('h3').content(title)
        ])
    }

}