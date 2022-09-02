import { AiElement, Element, GroupElement } from "./elements.js";
import { IconElement } from "./icons.js";


const popMessages = {
    NO_MATCH_REPEAT_PASS: 'Les mots de passe doivent correspondre'
};

export class PopsGroupElement extends GroupElement{

    constructor(){
        super('pops');
        this.pops = {};
    }

    new(code, icon){
        if(!this.pops[code]) this.pops[code] = new PopElement(code, icon);
        this.pops[code].asChild(this.element);
        return this.pops[code];
    }

    delete(code){
        if(this.pops[code]) this.pops[code].get().remove()
    }

    toggle(condition, code, icon){
        if(condition) this.new(code, icon);
        else this.delete(code);
    }

}

export class PopElement extends AiElement{

    constructor(code, icon){

        super('pop');
        this.code = code;

        this.iconElement = new IconElement(icon);
        this.contentElement = new GroupElement('content');
        this.codeElement = new Element('p', {class: 'code'}).content(code);
        this.messageElement = new Element('p', {class: 'message'}).content(popMessages[code]);

        this.describe([
            this.iconElement,
            this.contentElement, [
                this.codeElement,
                this.messageElement,
            ],
            icon ? new IconElement('close') : null
        ]);
        
    }

    code(){
        return this.code;
    }

    error(){
        this.element.setAttribute('data-type', 'error');
        return this;
    }

    warn(){
        this.element.setAttribute('data-type', 'warn');
        return this;
    }

    success(){
        this.element.setAttribute('data-type', 'success');
        return this;
    }

    info(){
        this.element.setAttribute('data-type', 'info');
        return this;
    }

}