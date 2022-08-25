import { Rule } from "../lib/rules.js";
import { AiElement, Element, GroupElement } from "./elements.js";
import { IconElement } from "./icons.js";


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

        // rule
        this.rule = options.rule || Rule.std;

        // placeholder
        this.placeholders = {
            email: 'adresse@email.com',
            password: '**************',
            search: 'Recherchez...',
            tel: '06 05 04 03 02'
        };

        let ph = options.placeholder || this.placeholders[type] || '';
        if(ph) this.input().setAttribute('placeholder', ph);

        // event listener
        this.input().addEventListener('keyup', ()=>{

            let input = this.input();

            if(this.rule(input.value)) {
                this.addStatus('completed');
            }
        
            else {
                this.removeStatus('completed');
            }

        }, {passive:true});

    }

    input(){
        return this.inputElement.get();
    }

    clear(){
        this.input().value = '';
    }

    set(value){
        this.input().value = value.toString();
    }

    add(value){
        this.input().value += value.toString();
    }

}

export class FieldElement extends AiElement{

    constructor(name, type, options){
        options = options || {};

        super('field');

        if(options.required) this.required();

        this.inputElement = new InputElement(name, type, options);
        this.requirementsGroup = new GroupElement('requirements');
        this.errorsGroup = new GroupElement('errors');

        if(options.label) {

            this.labelElement = new Element('label', {for: name})
            this.labelElement.get().textContent = options.label;

            let input = this.input().input();

            if(!input.getAttribute('placeholder')){
                input.setAttribute('placeholder', options.label)
            }

        }

        this.describe([
            this.labelElement,
            this.inputElement,
            this.requirementsGroup,
            this.errorsGroup
        ]);

    }

    required(){
        if(!this.labelElement) return;
        this.labelElement.get().classList.add('required');
    }

    input(){
        return this.inputElement;
    }

    requirements(){
        return this.requirementsElement;
    }

    errors(){
        return this.errorsElement;
    }

}

export class FieldsGroupElement extends AiElement{

    constructor(){
        super(['group', 'fields'])
        this.fields = {};
    }

    build(obj){

        for(let key in obj){
            this.fields[key] = new FieldElement(key, obj[key].type || null, obj[key]);
            this.add(this.fields[key].get());
        }
    }

    field(name){
        return this.fields[name];
    }

}