import { AiElement, GroupElement } from "./elements.js";

const requirementsMessages = {
    password: 'Au moins 6 caratères dont 1 majuscule, 1 minuscule et un chiffre'
};

export class RequirementsGroupElement extends GroupElement{

    constructor(){
        super('requirements');
        this.requirements = {};
    }
    
    new(name){
        if(!this.requirements[name]) this.requirements[name] = new AiElement('requirement', {}, 'p');
        this.requirements[name].content(requirementsMessages[name]).asChild(this.element);
        return this.requirements[name];
    }

}