import { Element } from "./element.js";

export class Valuable extends Element{

    constructor(tag, attributes, options){
        super(tag, attributes, options)

        if(/^(input|textarea)$/.test(tag)) this.input = true
        else this.input = false
    }

    value(value){
        if(!typeof value === 'undefined') this.input ? this.element.value = value : this.element.setAttribute('data-value', value)
        else return this.input ? this.element.value : this.element.getAttribute('data-value')
        return this
    }

    addValue(value){
        this.value(this.value() + value || '')
        return this
    }

    // static method

    static same(array){
        const cond = array.some(valuable => array[0].value() !== valuable.value())
        array.forEach(valuable => valuable.toggle(cond, 'failed'));
    }

}