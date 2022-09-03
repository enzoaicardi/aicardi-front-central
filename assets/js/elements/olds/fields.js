import { Rule } from "../lib/rules.js";
import { AiElement, GroupElement } from "./elements.js";
import { InputElement, LabelElement } from "./inputs.js";
import { PopsGroupElement } from "./pops.js";
import { RequirementsGroupElement } from "./requirements.js";


export class FieldsGroupElement extends GroupElement{

    constructor(subname){
        let name = subname ? ['fields', subname] : 'fields';
        super(name);
        this.fields = {};
    }

    build(obj){
        for(let key in obj){
            this.fields[key] = new FieldElement(key, obj[key].type || null, obj[key]);
            this.add(this.fields[key]);
        }
        return this;
    }

    field(name){
        return this.fields[name];
    }

}

export class FieldElement extends AiElement{

    constructor(name, type, options){
        options = options || {};
        
        super('field');

        this.inputElement = new InputElement(name, type, options);
        this.requirements = new RequirementsGroupElement();
        this.pops = new PopsGroupElement();
        
        if(options.label) {

            this.labelElement = new LabelElement(name, options.label)
            let input = this.input();

            if(!input.getAttribute('placeholder')){
                input.setAttribute('placeholder', options.label)
            }
            
        }
        
        if(options.required) this.addStatus('required');
        if(options.value) this.addStatus('completed');

        this.describe([
            this.labelElement,
            this.inputElement,
            this.requirements,
            this.pops
        ]);

        // rule
        this.rule = options.rule || Rule.std;

        // event listener
        this.inputElement.listen('input', ()=>{

            let input = this.inputElement.input();
            if(this.rule(input.value)) this.addStatus('completed');
            else this.removeStatus('completed');

        }, {passive:true});

    }

    input(){
        return this.inputElement.input();
    }

    clear(){
        this.input().value = '';
    }

    value(value){
        if(value) this.input().value = value.toString();
        return this.input().value;
    }

    addValue(value){
        this.input().value += value.toString();
    }

    static sameValue(items, code){
        items[0].watch(items, 'input', compare);

        function compare(){
            const cond = items.some((item) => { return item.value() !== items[0].value(); });

            items.forEach(item => { item.toggleStatus(cond, 'failed'); }); 
            items[items.length-1].pops.toggle(cond, code);
        }
    }

    static areValid(items){
        return items.every((item)=>{
            return !item.isRequired() || item.isCompleted()
        });
    }

}

export class FieldSet{

    static password = {
        type: 'password',
        icon: 'lock',
        label: 'Mot de passe',
        rule: Rule.password
    }

    static repeat = {
        type: 'password',
        icon: 'lock',
        label: 'Répéter mot de passe',
        rule: Rule.password
    }

    static email = {
        type: 'email',
        icon: 'email',
        label: 'Adresse Email',
        rule: Rule.email
    }

    static tel = {
        type: 'tel',
        icon: 'phone',
        label: 'Téléphone',
        rule: Rule.tel
    }

    static siret = {
        label: 'Siret',
        placeholder: '784 671 695 00103',
        rule: Rule.siret
    }

    static iban = {
        label: 'IBAN',
        placeholder: 'FR14 2001 0101 1505 0001 3M02 606',
        rule: Rule.iban
    }

    static label(label, name){
        return {...FieldSet[name], label: label}
    }

    static required(name){
        return {...FieldSet[name], required: true}
    }

}
