import { Element } from "../element.js";

export class Valuable extends Element{

    constructor(tag, attributes, options){
        super(tag, attributes, options)

        if(/^(input|textarea)$/.test(tag)) this.input = true
        else this.input = false
    }

    value(value){
        if(typeof value !== 'undefined') this.input ? this.element.value = value : this.element.setAttribute('data-value', value)
        else return this.input ? this.element.value : this.element.getAttribute('data-value')
        return this
    }

    addValue(value){
        this.value(this.value() + value || '')
        return this
    }

    name(name){
        if(name) this.input ? this.element.name = name : this.element.setAttribute('data-name', name)
        else return this.input ? this.element.name : this.element.getAttribute('data-name')
        return this
    }

    // static method

    static areSame(array){
        const cond = array.some(valuable => array[0].value() !== valuable.value())
        array.forEach(valuable => valuable.toggle(cond, 'failed'));
    }

    static areValid(array){
        let cond = true;
        array.some(valuable => {
            if(!valuable.isValid()){
                cond = false
                valuable.toggle(!valuable.is('required') && !valuable.isValid(), 'careful')
            }
        })
        return cond
    }

}