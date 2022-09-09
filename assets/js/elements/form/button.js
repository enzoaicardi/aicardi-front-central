import { Element } from "../element.js";
import { ElementAi } from "../elementai.js";
import { Icon } from "../icon.js";

export class Button extends ElementAi{

    constructor(options){
        super(['button', 'load-after'], null, options)

        new Element('p').content(this.options.content || '').childOf(this.element)
        if(this.options.icon) new Icon(this.options.icon).childOf(this.element)
    }

}