import { AiElement, Element } from "./elements.js";
import { IconElement } from "./icons.js";

export class LabelElement extends AiElement{
    constructor(inputName){
        super('label', {for: inputName || ''})
    }
}

export class InputElement extends Element{

    /**
     * Input element
     * @param {string} name 
     * @param {string} [type] 
     * @param {object} [options]
     */

    constructor(name, type, options){

        options = options || {};

        // input container
        super('div', {class: 'input'});

        // input element
        this.inputElement = new Element('input', {
            type: type || 'text',
            name: name
        })

        this.inputElement.asChild(this.element);

        // input icon
        if(options.icon){
            this.icon = new IconElement(options.icon);
            this.icon.asChild(this.element);
        }

        // placeholder
        this.placeholders = {
            email: 'adresse@email.com',
            password: '**************',
            search: 'Recherchez...',
            tel: '06 05 04 03 02'
        };

        let ph = options.placeholder || this.placeholders[type] || '';
        if(ph) this.input().setAttribute('placeholder', ph);

    }

    input(){
        return this.inputElement.get();
    }

}