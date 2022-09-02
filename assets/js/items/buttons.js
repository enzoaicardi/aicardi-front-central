import { AiElement, Element } from "./elements.js";
import { IconElement } from "./icons.js";


export class ButtonElement extends AiElement{

    constructor(name, options){
        options = options || {};

        super('button', {tag: options.link ? 'a' : 'button'});

        this.textElement = new Element('p');
        this.textElement.asChild(this.element);
        this.textElement.get().textContent = name;

        if(options.icon){
            this.icon = new IconElement(options.icon);
            this.icon.asChild(this.element);
            this.element.classList.add('icon');
        }

        if(options.link) this.element.href = options.link;
        if(options.size) this.element.classList.add(options.size);

        this.element.classList.add('after');

    }

}