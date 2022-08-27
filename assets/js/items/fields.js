import { Rule } from "../lib/rules.js";
import { AiElement, Element, GroupElement } from "./elements.js";
import { InputElement } from "./inputs.js";
import { PopsGroupElement } from "./pops.js";
import { RequirementsGroupElement } from "./requirements.js";


export class FieldsGroupElement extends GroupElement{

    constructor(){
        super('fields')
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

    getFields(){
        return Object.values(this.fields);
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

            this.labelElement = new Element('label', {for: name})
            this.labelElement.get().textContent = options.label;

            let input = this.input();

            if(!input.getAttribute('placeholder')){
                input.setAttribute('placeholder', options.label)
            }
            
        }
        
        if(options.required) this.addStatus('required');

        this.describe([
            this.labelElement,
            this.inputElement,
            this.requirements,
            this.pops
        ]);

        // rule
        this.rule = options.rule || Rule.std;

        // event listener
        this.inputElement.listen('keyup', ()=>{

            let input = this.inputElement.input();

            if(this.rule(input.value)) {
                this.addStatus('completed');
            } else {
                this.removeStatus('completed');
            }

        }, {passive:true});

    }

    input(){
        return this.inputElement.input();
    }

    static sameValue(items, code){

        items[0].watchKeys(items, compare);

        function compare(items){

            const condition = items.some((item)=>{
                return item.input().value !== items[0].input().value
            });
            
            items.forEach(item => {
                item.toggleStatus('failed', condition);
            }); 

            items[items.length-1].pops.toggle(code, null, condition);

        }
    }

    static areValid(items){

        return items.every((item)=>{
            return !item.isRequired() || item.isCompleted()
        });

    }

}