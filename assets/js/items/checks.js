import { Element, AiElement } from "./elements.js";
import { LabelElement } from "./inputs.js";


export class CheckBox extends AiElement{

    constructor(label, size, check){
        super('check')

        this.add(new Element('div', {class: 'box'}))
        this.add(new LabelElement(label, label))

        if(size) this.element.classList.add(size)
        if(check) this.check()
        else this.uncheck()
    }

    value(){
        return Number(this.element.getAttribute('data-value'));
    }

    uncheck(){
        this.element.setAttribute('data-value', 0);
    }

    toggle(condition){
        if(typeof condition === 'undefined') condition = this.value()
        if(condition) this.uncheck()
        else this.check()
        return this.value()
    }

    check(){
        this.element.setAttribute('data-value', 1);
    }

}